export class ManyStateElement extends HTMLElement {
   private _boundOnClick;
   private _internals;
   private _state: string;
   constructor() {
      super();
      this._boundOnClick = this._onClick.bind(this);
      this.addEventListener('click', this._boundOnClick);
      // Attach an ElementInternals to get states property
      this._internals = this.attachInternals();
      this._state = '';
   }

   connectedCallback() {
      this.state = 'loading';

      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
         <style>
            :host {
            display: block;
            font-family: monospace;
            }
            :host::before {
            content: "[ unknown ]";
            white-space: pre;
            }
            :host(:state(loading))::before {
            content: "[ loading ]";
            }
            :host(:state(interactive))::before {
            content: "[ interactive ]";
            }
            :host(:state(complete))::before {
            content: "[ complete ]";
            }
         </style>
         <slot>Click me</slot>
      `;
   }

   get state() {
      return this._state;
   }

   set state(stateName) {
      // Set internal state to passed value
      // Add identifier matching state and delete others
      if (stateName === 'loading') {
         this._state = 'loading';
         this._internals.states.add('loading');
         this._internals.states.delete('interactive');
         this._internals.states.delete('complete');
      } else if (stateName === 'interactive') {
         this._state = 'interactive';
         this._internals.states.delete('loading');
         this._internals.states.add('interactive');
         this._internals.states.delete('complete');
      } else if (stateName === 'complete') {
         this._state = 'complete';
         this._internals.states.delete('loading');
         this._internals.states.delete('interactive');
         this._internals.states.add('complete');
      }
   }

   _onClick() {
      // Cycle the state when element clicked
      if (this.state === 'loading') {
         this.state = 'interactive';
      } else if (this.state === 'interactive') {
         this.state = 'complete';
      } else if (this.state === 'complete') {
         this.state = 'loading';
      }
   }

   static isStateSyntaxSupported() {
      return CSS.supports('selector(:state(loading))');
   }
}

customElements.define('many-state-element', ManyStateElement);

document.addEventListener('DOMContentLoaded', () => {
   if (!ManyStateElement.isStateSyntaxSupported()) {
      if (!document.getElementById('state-warning')) {
         const warning = document.createElement('div');
         warning.id = 'state-warning';
         warning.style.color = 'red';
         warning.textContent = 'This feature is not supported by your browser.';
         document.body.insertBefore(warning, document.body.firstChild);
      }
   }
});
