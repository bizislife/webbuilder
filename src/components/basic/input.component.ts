import { bizMetaDatasDeco } from '../../decorators';
import { EventProperty, InputType } from '../../models/basic.model';
import { HTMLCharConvet } from '../../utils/basic-utils';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type', 'pattern', 'required'],
   events: {
      'bizInputChange': { eventType: 'change', bubbles: false },
      'bizInputFocus': { eventType: 'focus', bubbles: true, cancelable: true }
   }
})
// @bizEventDeco('bizInputChange', { bubbles: false })
// @bizEventDeco('bizInputFocus', { bubbles: true, cancelable: true })
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
   
   bizInputChange(e: Event) {
      const eventType: string = e.type || '';
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const theVal: string = target.value;
      console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      this.fireEvent('bizInputChange');
   }
   bizInputFocus(e: FocusEvent) {
      const eventType: string = e.type || '';
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const theVal: string = target?.value;
      console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      this.fireEvent('bizInputFocus');
   }

   _handleInput(e: Event) {
      const eventType: string = e.type || '';
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const theVal: string = target.value;
      // const theVal: string = this.shadow.querySelector('input')?.value??'';
      console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      this.setAttribute('value', theVal);

   }

   render() {
      super.shadow.innerHTML = `
         <style>
            input:invalid {
               background-color: lightpink;
            }
         </style>
         <input 
               value="${this.value}" 
               type="${this.type}" 
               ${this.placeholder.length > 0 ? 'placeholder=' + HTMLCharConvet(this.placeholder) : ''} 
               ${this.required ? 'required' : ''} 
               ${this.pattern.length > 0 ? 'pattern=' + this.pattern : ''}
         />
      `;

      const theInput = super.shadow.querySelector('input');

      const eventProperty: EventProperty = (this.constructor as typeof Input).getEvents()??{};
      if (eventProperty) {
         Object.entries(eventProperty).forEach(([key, data]) => {
            const theFunc = (this as Record<string, unknown>)[key];
            // const func = eval('this.' + key);
            const func = (0, eval)(theFunc as string);
            // const func = new Function(`this.${key}()`);
            theInput?.addEventListener(data.eventType, func.bind(this));
         })
      }

      theInput?.addEventListener('input', this._handleInput.bind(this));

   }
}

Input.define();
