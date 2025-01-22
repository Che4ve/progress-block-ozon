import '../styles/customCheckbox.scss';

export class CustomCheckbox extends HTMLElement {
    static get observedAttributes() {
        return ['checked'];
    }

    constructor(checked = false) {
        super();
        this.checked = checked;
        this.changeCallback = () => {};
        this.innerElement = null;
    }

    connectedCallback() {
        const attributeValue = this.getAttribute('checked');
        this.checked = attributeValue !== null;

        this.render();

        this.innerElement = this.querySelector('input');
        this.innerElement.checked = this.checked;

        this.innerElement.addEventListener('change', (e) => {
            this.checked = e.target.checked;
            this.changeCallback(this.checked);
        });
    }

    render() {
        this.innerHTML = `
            <input type="checkbox" ${this.checked ? 'checked' : ''}>
        `;
    }

    updateValue() {
        if (this.checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
        if (this.innerElement) {
            this.innerElement.checked = this.checked;
        }
    }

    set checked(value) {
        this._checked = Boolean(value);
        this.updateValue();
    }

    get checked() {
        return this._checked;
    }

    onChange(callback) {
        this.changeCallback = callback;
    }
}

if (!customElements.get('custom-checkbox')) {
    customElements.define('custom-checkbox', CustomCheckbox);
}
