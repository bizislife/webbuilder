import { bizMetaDatasDeco } from '../../decorators';
import { EventProperty, InputType } from '../../models/basic.model';
import { HTMLCharConvet } from '../../utils/basic-utils';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type', 'pattern', 'required'],
   events: {
      'selectionChanged': { eventType: 'change', bubbles: false },
      'testfocus': { eventType: 'focus', bubbles: true, cancelable: true }
   }
})
// @bizEventDeco('selectionChanged', { bubbles: false })
// @bizEventDeco('testfocus', { bubbles: true, cancelable: true })
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
   
   _handleChange(e: Event) {

      const eventType: string = e.type || '';
      console.log(eventType);
      const theVal: string = (e.target as HTMLInputElement)?.value;
      console.log('handleChange, value is: ' + theVal);

      this.fireEvent('selectionChanged');
      // const customEvent = new CustomEvent('selectionChanged', {detail: theVal} as CustomEventInit);
      // this.dispatchEvent(customEvent);

   }

   selectionChanged(e: Event) {
      const eventType: string = e.type || '';
      console.log(eventType);
      const theVal: string = (e.target as HTMLInputElement)?.value;
      console.log('handleChange, value is: ' + theVal);

      this.fireEvent('selectionChanged');
   }
   testfocus(e: Event) {

      const eventType: string = e.type || '';
      console.log(eventType);
      const theVal: string = (e.target as HTMLInputElement)?.value;
      console.log('_handleFocus, value is: ' + theVal);

      this.fireEvent('testfocus');
      // const customEvent = new CustomEvent('selectionChanged', {detail: theVal} as CustomEventInit);
      // this.dispatchEvent(customEvent);
   }

   _handleFocus(e: Event) {

      const eventType: string = e.type || '';
      console.log(eventType);
      const theVal: string = (e.target as HTMLInputElement)?.value;
      console.log('_handleFocus, value is: ' + theVal);

      this.fireEvent('testfocus');
      // const customEvent = new CustomEvent('selectionChanged', {detail: theVal} as CustomEventInit);
      // this.dispatchEvent(customEvent);

   }

   _handleInput(e: Event) {
      const eventType: string = e.type || '';
      const inputType: string = (e as InputEvent).inputType || '';
      console.log(eventType + ' | ' + inputType);
      const theVal: string = this.shadow.querySelector('input')?.value??'';

      this.setAttribute('value', theVal);

   }

   _onFocusOut(e: FocusEvent) {
      const toBeFocused = e?.relatedTarget as HTMLElement;
      const theVal: string = this.shadow.querySelector('input')?.value??'';

      console.log("... focus out value: " + theVal);

      this.setAttribute('value', theVal);
   }

   // _onKeyUp(e: KeyboardEvent) {
   //    this.value = (e.target as HTMLInputElement).value;
   // }

   _runEventListenerByEventName(name: string, e: Event) {
      switch(name) {
         case 'selectionChanged':
            this._handleChange(e);
            break;
         case 'testfocus':
            this._handleFocus(e);
            break;
         default:
            console.log('sory, the event name is not in the list');
      }
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
            // const func = new Function(`const ${key} = `+ key);
            theInput?.addEventListener(data.eventType, func.bind(this));
            // theInput?.addEventListener(data.eventType, this._handleChange.bind(this));
         })
      }

      theInput?.addEventListener('input', this._handleInput.bind(this));

   }
}

Input.define();
