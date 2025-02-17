export class LabeledCheckbox extends HTMLElement {
   private _boundOnClick;
   private _internals;
   constructor() {
      super();
      this._boundOnClick = this._onClick.bind(this);
      this.addEventListener('click', this._boundOnClick);

      // Attach an ElementInternals to get states property
      this._internals = this.attachInternals();
   }

   connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
         <style>
            :host {
            display: block;
            }
            :host::before {
            content: "[ ]";
            white-space: pre;
            font-family: monospace;
            }
            :host(:state(checked))::before {
            content: "[x]";
            }
         </style>
         <slot>Label</slot>
         `;
   }

   get checked() {
      console.log('.... get checked');
      return this._internals.states.has('checked');
   }

   set checked(flag) {
      console.log('.... set check: ' + flag);
      if (flag) {
         this._internals.states.add('checked');
      } else {
         this._internals.states.delete('checked');
      }
   }

   _onClick() {
      console.log('.... _onclick');
      // Toggle the 'checked' property when the element is clicked
      this.checked = !this.checked;
   }

   static isStateSyntaxSupported() {
      return CSS.supports('selector(:state(checked))');
   }
}

// customElements.define('labeled-checkbox', LabeledCheckbox);

// Display a warning to unsupported browsers
document.addEventListener('DOMContentLoaded', () => {
   if (!LabeledCheckbox.isStateSyntaxSupported()) {
      if (!document.getElementById('state-warning')) {
         const warning = document.createElement('div');
         warning.id = 'state-warning';
         warning.style.color = 'red';
         warning.textContent = 'This feature is not supported by your browser.';
         document.body.insertBefore(warning, document.body.firstChild);
      }
   }
});

customElements.define('labeled-checkbox', LabeledCheckbox);

export class QuestionBox extends HTMLElement {
   constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
         <div><slot>Question</slot></div>
         <labeled-checkbox part="checkbox">Yes</labeled-checkbox>
      `;
   }
}

customElements.define('question-box', QuestionBox);
