import { EventProperty, MetaDataInterface } from '../models/basic.model';

export abstract class BizBaseElement extends HTMLElement {
   #shadow: ShadowRoot;
   // metaData: MetaDataInterface = {} as MetaDataInterface;
   static metaData: MetaDataInterface;

   constructor() {
      super();
      const defaultOption = { mode: 'open' } as ShadowRootInit;
      this.#shadow = this.attachShadow(defaultOption);
   }

   /**
    * get metaData from typeof BizBaseElement
    * @returns
    */
   static getMetaDatas(): MetaDataInterface {
      if (Object.prototype.hasOwnProperty.call(this, 'metaData')) {
         return this.metaData;
      }
      return {} as MetaDataInterface;
   }

   static getEvents(): EventProperty | undefined {
      return this.getMetaDatas()!.events;
   }

   static getEventInit(name: string): EventInit {
      const eventsMap: EventProperty | undefined = this.getEvents();
      return eventsMap?.[name] ?? {};
   }

   /**
    * define web component name as metaDatas.tag
    * @returns
    */
   static define(): typeof BizBaseElement {
      const tag = this.getMetaDatas()?.tag + '';
      customElements.define(tag, this as unknown as CustomElementConstructor);
      return this;
   }

   render(): void {}
   clean(): void {}

   eventBind(): void {}

   /**
    * set newVal to observedAttribute
    * @param name
    * @param oldVal
    * @param newVal
    */
   attributeChangedCallback(
      name: string,
      oldVal: string | null,
      newVal: string | null,
   ) {
      // this will call instance's set method
      (this as Record<string, unknown>)[name] = newVal;
   }

   connectedCallback() {
      this.render();
      // this.eventBind();
   }

   disconnectedCallback() {
      this.clean();
   }

   /**
    * fire named customized event
    * @param name
    * @param data
    * @returns
    */
   fireEvent<T>(name: string, data?: T): boolean {
      // console.log('test');
      const ctor = this.constructor as typeof BizBaseElement;

      const eventInit = ctor.getEventInit(name);

      const customEvent = new CustomEvent(name, {
         detail: data,
         composed: false,
         bubbles: eventInit.bubbles ?? true,
         cancelable: eventInit.cancelable ?? false,
      });

      // will return false if 'cancelable = true'
      return this.dispatchEvent(customEvent);
   }

   /**
    * A static property named observedAttributes.
    * This must be an array containing the names of all attributes for which the element needs change notifications.
    * An implementation of the attributeChangedCallback() lifecycle callback.
    */
   static get observedAttributes(): Array<string> {
      return this.getMetaDatas()?.observedAttributes ?? [];
   }

   get shadow() {
      return this.#shadow;
   }
}
