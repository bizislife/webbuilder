export class LazyComponent extends HTMLElement {
   private shadow: ShadowRoot;
   private observer: IntersectionObserver;

   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            this.loadComponent();
         }
      });
   }

   connectedCallback() {
      console.log('lazy component connected to the DOM');
      this.observer.observe(this);
   }

   loadComponent() {
      this.shadow.innerHTML = `<p>Lazy loaded content!</p>`;
      this.observer.disconnect();
   }
}

customElements.define('lazy-component', LazyComponent);
