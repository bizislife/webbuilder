import { bizMetaDatasDeco } from '../../decorators/bizMetaDatasDeco';
import { InputType } from '../../models/basic.model';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type'],
})
export class Input extends BizBaseElement {
   constructor() {
      super();
   }

   #theType: `${InputType}` = 'Text';
   #theValue = '';
   #thePlaceholder = 'input value';

   get type() {
      return this.#theType;
   }

   set type(theType: `${InputType}`) {
      this.#theType = theType;
   }

   get value() {
      return this.#theValue;
   }

   set value(theValue: string) {
      this.#theValue = theValue;
   }

   get placeholder() {
      return this.#thePlaceholder;
   }

   set placeholder(thePlaceholder: string) {
      this.#thePlaceholder = thePlaceholder;
   }

   render() {
      super.shadow.innerHTML = `
         <input value="${this.value}" type="${this.type}" placeholder="${this.placeholder}"/>
      `;
   }
}

Input.define();
