export class MyCustomElement extends HTMLElement {
   private shadow: ShadowRoot;
   private _title: string;
   private theCount: number;

   constructor() {
      super();
      this.theCount = 0;
      this._title = 'Default Title';
      this.shadow = this.attachShadow({ mode: 'open' });
      this.render();
      this.shadow
         .querySelector('#increment-btn')
         ?.addEventListener('click', () => this.incrementcount());
   }

   render() {
      this.shadow.innerHTML = `
         <style>
            p {
               font-size: 20px;
            }
            button {
               padding: 5px 10px;
               font-size: 16px;
            }
         </style>
         <p>${this.title}</p>
         <p id="countEle">count: ${this.theCount}</p>
         <button id="increment-btn">Increment</button>
      `;
   }

   set title(val: string) {
      this._title = val;
      this.render();
   }

   get title() {
      return this._title;
   }

   incrementcount() {
      this.theCount += 1;
      const p_elem = this.shadow.querySelector('#countEle');
      if (p_elem) {
         p_elem.textContent = `count: ${this.theCount}`;
      }
   }

   connectedCallback() {
      console.log('component connected to the DOM');
   }

   disconnectedCallback() {
      console.log('component disconnected from the DOM');
   }

   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
   }

   adoptedCallback() {
      console.log('Custom element moved to new page.');
   }
}

customElements.define('my-custom-element', MyCustomElement);
