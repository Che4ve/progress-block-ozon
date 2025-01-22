import '../styles/progressBlock.scss'

export class ProgressBlock extends HTMLElement {
    static get observedAttributes() {
        return ['min', 'max', 'value'];
    }

    constructor(min, max, value) {
        super();
        this.min = min ?? 0;
        this.max = max ?? 100;
        this.value = value ?? 0;

        this.state = 'normal'; // 'normal' | 'animated' | 'hidden'

        this.progressCircle = null;
        this.slider = null;
        this.checkboxAnimate = null;
        this.checkboxHide = null;
    }

    connectedCallback() {
        this.min = this.getAttribute('min') ?? this.min;
        this.max = this.getAttribute('max') ?? this.max;
        this.value = this.getAttribute('value') ?? this.value;

        this.render();

        this.progressCircle = this.querySelector('progress-circle');

        this.slider = this.querySelector('custom-range-slider');
        this.slider.onChange((newValue) => {
            this.value = newValue;
        })

        this.checkboxAnimate = this.querySelector('#custom-checkbox-animate');
        this.checkboxAnimate.onChange((checked) => {
            this.state = checked ? 'animated' : null;
        })

        this.checkboxHide = this.querySelector('#custom-checkbox-hide');
        this.checkboxHide.onChange((checked) => {
            this.state = checked ? 'hidden' : null;
        })

        this.updateProgress();
    }

    render() {
        this.innerHTML = `
            <div class="progress-container" id="progress-container">
                <progress-circle 
                    min="0" max="100" value="${this.value}" 
                    width="200px" 
                    stroke-width="20px"
                ></progress-circle>
                <div class="controls">
                    <div class="controls__element" id="controls__element-value">
                        <p>Value</p>
                        <custom-range-slider id="range-slider" min="0" max="100" value="${this.value}"/>
                    </div>
                    <div class="controls__element" id="controls__element-animate">
                        <p>Animate</p>
                        <custom-checkbox id="custom-checkbox-animate"/>
                    </div>
                    <div class="controls__element" id="controls__element-hide">
                        <p>Hide</p>
                        <custom-checkbox id="custom-checkbox-hide"/>
                    </div>
                </div>
            </div>
        `
    }

    updateProgress() {
        this.setAttribute('value', `${this.value}`);

        if (this.progressCircle) {
            this.progressCircle.value = this.value;
        }

        if (this.slider) {
            this.slider.value = this.value;
        }

        this.isCompleted = this.value === this.max;
        this.toggleCompleted();

        if (this.isCompleted && this.callbackComplete) {
            this.callbackComplete();
        }
    }

    updateState(prevState) {
        this.toggleAnimation(prevState);
        this.toggleVisibility(prevState);
    }

    set value(value) {
        this._value = Math.min(Math.max(value, 0), 100);
        this.updateProgress();
    }

    get value() {
        return this._value;
    }

    set state(state) {
        const prevState = this._state;

        this._state = state ?? 'normal';
        this.updateState(prevState);
    }

    get state() {
        return this._state;
    }

    toggleAnimation(prevState) {
        this.classList.toggle('animated', this.state === 'animated');
        if (this.state === 'animated' && this.callbackAnimationStart) {
            this.callbackAnimationStart();
        }
        if (prevState === 'animated' && this.callbackAnimationEnd) {
            this.callbackAnimationEnd();
        }
    }

    toggleVisibility(prevState) {
        this.classList.toggle('hidden', this.state === 'hidden');
        if (this.state === 'hidden' && this.callbackCollapse) {
            this.callbackCollapse();
        }
        if (prevState === 'hidden' && this.callbackExpand) {
            this.callbackExpand();
        }
    }

    toggleCompleted() {
        this.classList.toggle('completed', this.isCompleted);
        if (this.isCompleted && this.callbackCollapse) {
            this.callbackComplete();
        }
    }

    // Функции для обработки событий с аргументами-коллбеками
    onAnimationStart(callback) {
        this.callbackAnimationStart = callback;
    }

    onAnimationEnd(callback) {
        this.callbackAnimationEnd = callback;
    }

    onComplete(callback) {
        this.callbackComplete = callback;
    }

    onCollapse(callback) {
        this.callbackCollapse = callback;
    }

    onExpand(callback) {
        this.callbackExpand = callback;
    }

}

if (!customElements.get('progress-block')) {
    customElements.define('progress-block', ProgressBlock);
}