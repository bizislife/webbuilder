import { MetaDataInterface } from '../models/basic.model';

export abstract class BizBaseElement extends HTMLElement {
   #shadow: ShadowRoot;
   // metaData: MetaDataInterface = {} as MetaDataInterface;
   static metaData: MetaDataInterface;

   constructor() {
      super();
      const defaultOption = { mode: 'open' } as ShadowRootInit;
      this.#shadow = this.attachShadow(defaultOption);
   }

   static getMetaDatas(): MetaDataInterface {
      if (Object.prototype.hasOwnProperty.call(this, 'metaData')) {
         return this.metaData;
      }
      return {} as MetaDataInterface;
   }

   static define(): typeof BizBaseElement {
      const tag = this.getMetaDatas()?.tag + '';
      customElements.define(tag, this as unknown as CustomElementConstructor);
      return this;
   }

   render(): void {}

   attributeChangedCallback(
      name: string,
      oldVal: string | null,
      newVal: string | null,
   ) {
      (this as Record<string, unknown>)[name] = newVal;
   }

   connectedCallback() {
      this.render();
   }

   static get observedAttributes(): Array<string> {
      return this.getMetaDatas()?.observedAttributes ?? [];
   }

   get shadow() {
      return this.#shadow;
   }
}
