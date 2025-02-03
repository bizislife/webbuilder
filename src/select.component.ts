type SelectOption = { value: string; label: string; };

export class PureSelect extends HTMLElement {
  private shadow: ShadowRoot;
  private selectElement: HTMLSelectElement;

  static get observedAttributes() {
    return ['value', 'label', 'options'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.selectElement = document.createElement('select');
    this.render();
  }

  get value(): string {
    return this.selectElement.value;
  }

  set value(val: string) {
    this.selectElement.value = val;
  }

  get options(): SelectOption[] {
    return JSON.parse(this.getAttribute('options') || '[]');
  }

  set options(val: SelectOption[]) {
    this.setAttribute('options', JSON.stringify(val));
  }

  private render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        margin: 1rem 0;
      }
      .label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        background: white;
      }
    `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(this.selectElement);

    this.selectElement.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('valueChange', {
        detail: this.value,
        bubbles: true,
        composed: true
      }));
    });
  }

  attributeChangedCallback(name: string) {
    if (name === 'options') {
      this.selectElement.innerHTML = this.options
        .map(opt => `<option value="${opt.value}">${opt.label}</option>`)
        .join('');
    }
  }
}

customElements.define('pure-select', PureSelect);