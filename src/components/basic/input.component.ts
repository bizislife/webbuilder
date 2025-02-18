import { bizMetaDatasDeco } from '../../decorators/bizMetaDatasDeco';
import { InputType } from '../../models/basic.model';
import { HTMLCharConvet } from '../../utils/basic-utils';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type', 'pattern', 'required'],
})
export class Input extends BizBaseElement {
   constructor() {
      super();
   }

   #theType: `${InputType}` = 'Text';
   #theValue = '';
   #thePlaceholder = '';
   #thePattern = ''; // pattern="\w{3,16}"
   #theRequired = false;

   get type(): `${InputType}` {
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

   get pattern() {
      return this.#thePattern;
   }

   set pattern(thePattern: string) {
      this.#thePattern = thePattern;
   }

   get required() {
      return this.#theRequired;
   }

   set required(theRequired: boolean) {
      this.#theRequired = theRequired;
   }

   render() {
      super.shadow.innerHTML = `
         <style>
            input:invalid {
               background-color: lightpink;
            }
         </style>
         <input value="${this.value}" 
               type="${this.type}" 
               ${this.placeholder.length > 0 ? 'placeholder=' + HTMLCharConvet(this.placeholder) : ''} 
               ${this.required ? 'required' : ''} 
               ${this.pattern.length > 0 ? 'pattern=' + this.pattern : ''}
         />
      `;
   }

}


Input.define();
