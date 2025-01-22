import '../styles/progressCircle.scss';

export class ProgressCircle extends HTMLElement {
    static get observedAttributes() {
        return ['min', 'max', 'value', 'width', 'stroke-width', 'color-start', 'color-end'];
    }

    constructor(min, max, value, width, strokeWidth, colorStart, colorEnd) {
        super();
        this.min = min ?? 0;
        this.max = max ?? 100;
        this.value = value ?? 0;

        this.width = width ?? 200;
        this.strokeWidth = strokeWidth ?? 20;
        this.colorStart = colorStart ?? "#0a74ff";
        this.colorEnd = colorEnd ?? "#1100ff";

        const progressTextDiv = null;
    }

    connectedCallback() {
        this.min = this.getAttribute('min') ?? this.min;
        this.max = this.getAttribute('max') ?? this.max;
        this.value = this.getAttribute('value') ?? this.value;
        this.width = this.getAttribute('width') ?? this.width;
        this.strokeWidth = this.getAttribute('stroke-width') ?? this.strokeWidth;
        this.colorStart = this.getAttribute('color-start') ?? this.colorStart;
        this.colorEnd = this.getAttribute('color-end') ?? this.colorEnd;

        this.render();

        this.progressTextDiv = this.querySelector('div');

        this.updateValue();
    }

    render() {
        this.innerHTML = `
            <svg class="progress-circle__svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="0%" stop-color="${this.colorStart}"/>
                        <stop offset="100%" stop-color="${this.colorEnd}"/>
                    </linearGradient>
                </defs>
                <circle cx="50%" cy="50%" stroke-linecap="round"></circle>
            </svg>
            <div class="progress-circle__percentage" id="progress__percentage">0%</div>
        `
    }

    updateValue() {
        this.setAttribute('value', `${this.value}`);
        this.style.setProperty('--width', `${this.width}px`);
        this.style.setProperty('--stroke-width', `${this.strokeWidth}px`);
        this.style.setProperty('--percentage', `${this.value / this.max * 100}`);
        this.querySelectorAll('*').forEach((element) => {
            element.style.setProperty('--width', `${this.width}px`);
            element.style.setProperty('--stroke-width', `${this.strokeWidth}px`);
            element.style.setProperty('--percentage', `${this.value / this.max * 100}`);
        })

        if (this.progressTextDiv) {
            this.progressTextDiv.innerText = `${this.value}%`;
        }
    }

    set value(value) {
        this._value = value;
        this.updateValue();
    }

    get value() {
        return this._value;
    }
}

if (!customElements.get('progress-circle')) {
    customElements.define('progress-circle', ProgressCircle);
}