export class WCImage extends HTMLElement {
   private shadow: ShadowRoot;
 
   static get observedAttributes() { return ['src', 'alt']; }
 
   constructor() {
     super();
     this.shadow = this.attachShadow({ mode: 'open' });
     this.render();
   }
 
   private render() {
     this.shadow.innerHTML = `
       <style>
         :host { display: block; }
         img { max-width: 100%; height: auto; }
       </style>
       <img part="image" 
         src="${this.getAttribute('src') || ''}"
         alt="${this.getAttribute('alt') || ''}">
     `;
   }
 
   attributeChangedCallback(name: string) {
     const img = this.shadow.querySelector('img')!;
     if (name === 'src') img.src = this.getAttribute('src') || '';
     if (name === 'alt') img.alt = this.getAttribute('alt') || '';
   }
 }
 
 customElements.define('wc-image', WCImage);