import '../styles/customSlider.scss';

export class CustomRangeSlider extends HTMLElement {
    static get observedAttributes() {
        return ['min', 'max', 'value'];
    }

    constructor(min, max, value) {
        super();
        this.min = min ?? 0;
        this.max = max ?? 100;
        this.value = value ?? 0;

        this.isCompleted = false;

        this.changeCallback = () => {};

        this.innerElement = null;
    }

    connectedCallback() {
        this.min = this.getAttribute('min') ?? this.min;
        this.max = this.getAttribute('max') ?? this.max;
        this.value = this.getAttribute('value') ?? this.value;

        this.render();

        this.innerElement = this.querySelector('input[type="range"]');
        this.innerElement.addEventListener('input', (e) => {
            this.value = Number(e.target.value);
            this.changeCallback(this.value);
        });
    }

    render() {
        this.innerHTML = `
            <input type="range" id="value-input" min="${this.min}" max="${this.max}" value="${this.value}">
        `
    }

    updateValue() {
        this.setAttribute('value', `${this.value}`);
        const percentage =this.value / this.max * 100;
        if (this.innerElement) {
            this.innerElement.setAttribute('value', `${this.value}`);
            this.innerElement.style.setProperty('--offset', `${percentage}`);

        }
        this.isCompleted = this.value === this.max;
    }
    
    set value(value) {
        this._value = Math.min(Math.max(value, this.min), this.max);
        this.updateValue();
    }

    get value() {
        return this._value;
    }

    onChange(callback) {
        this.changeCallback = callback;
    }
}

if (!customElements.get('custom-range-slider')) {
    customElements.define('custom-range-slider', CustomRangeSlider);
}