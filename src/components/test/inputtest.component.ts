export class PureInput extends HTMLElement {
   private shadow: ShadowRoot;
   private inputElement: HTMLInputElement;

   static get observedAttributes() {
      return ['value', 'label', 'placeholder', 'type'];
   }

   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.inputElement = document.createElement('input');
      this.render();
   }

   get value(): string {
      return this.inputElement.value;
   }

   set value(val: string) {
      this.inputElement.value = val;
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
       input {
         width: 100%;
         padding: 0.75rem;
         border: 1px solid #e2e8f0;
         border-radius: 0.375rem;
         transition: border-color 0.2s;
       }
       input:focus {
         outline: none;
         border-color: #3b82f6;
         box-shadow: 0 0 0 1px #3b82f6;
       }
     `;

      this.shadow.appendChild(style);
      this.shadow.appendChild(this.inputElement);

      this.inputElement.addEventListener('input', () => {
         this.dispatchEvent(
            new CustomEvent('valueChange', {
               detail: this.value,
               bubbles: true,
               composed: true,
            }),
         );
      });
   }

   attributeChangedCallback(name: string, oldVal: string, newVal: string) {
      if (name === 'value') this.inputElement.value = newVal;
      if (name === 'placeholder') this.inputElement.placeholder = newVal;
      if (name === 'type') this.inputElement.type = newVal;
   }
}

customElements.define('pure-input', PureInput);
