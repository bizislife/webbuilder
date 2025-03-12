import { bizEventDeco, bizMetaDatasDeco } from '../../decorators';
import { InputType } from '../../models/basic.model';
import { HTMLCharConvet } from '../../utils/basic-utils';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type', 'pattern', 'required'],
})
@bizEventDeco('selectionChanged', { bubbles: false })
// @bizEventDeco('focus', { bubbles: false })
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

      // this.addEventListener('change', evt => this._handleChange(evt));
      // this.addEventListener('focusout', evt => this._onFocusOut(evt));
      // this.addEventListener('input', evt => this._handleInput(evt));

      const theInput = super.shadow.querySelector('input');
      theInput?.addEventListener('input', this._handleInput.bind(this));
      theInput?.addEventListener('change', this._handleChange.bind(this));



   }

   // eventBind(): void {
   //    const bizInput = super.shadow.querySelector('input');
   //    bizInput?.addEventListener('change', this._handleChange);
       
   // }
}

Input.define();
