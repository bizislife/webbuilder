import { bizMetaDatasDeco } from '../../decorators';
import {
   BizCustomEvent,
   EventProperty,
   InputType,
} from '../../models/basic.model';
import { HTMLCharConvet } from '../../utils/basic-utils';
import { BizBaseElement } from '../BizBaseElement';

// enum BIZ_INPUT_EVENT {
//    CHANGE = 'change',
//    BIZINPUTCHANGE = 'bizInputChange',
//    BIZINPUTFOCUS = 'bizInputFocus',
// }

// type BIZ_INPUT_EVENT = 'CHANGE' | 'BIZINPUTCHANGE' | 'BIZINPUTFOCUS';

const BIZ_INPUT_EVENT: Record<string, BizCustomEvent> = {
   // INPUT : {customeEventName: 'input', eventName: 'input'},
   BizInputChange: {
      customeEventName: 'BizInputChange',
      eventType: 'change',
      functionName: '_bizInputChange',
   },
   BizInputFocus: {
      customeEventName: 'BizInputFocus',
      eventType: 'focus',
      functionName: '_bizInputFocus',
   },
};

@bizMetaDatasDeco({
   tag: 'biz-input',
   observedAttributes: ['value', 'placeholder', 'type', 'pattern', 'required'],
   events: {
      [BIZ_INPUT_EVENT.BizInputChange.customeEventName]: {
         eventType: BIZ_INPUT_EVENT.BizInputChange.eventType,
         bubbles: false,
         cancelable: true,
      },
      [BIZ_INPUT_EVENT.BizInputFocus.customeEventName]: {
         eventType: BIZ_INPUT_EVENT.BizInputFocus.eventType,
         bubbles: false,
         cancelable: true,
      },
   },
})
// @bizEventDeco(BIZ_INPUT_EVENT.BizInputChange.customeEventName, { eventType: BIZ_INPUT_EVENT.BizInputChange.eventName, bubbles: false })
// @bizEventDeco(BIZ_INPUT_EVENT.BizInputFocus.customeEventName, { eventType: BIZ_INPUT_EVENT.BizInputFocus.eventName, bubbles: true, cancelable: true })
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

   _bizInputChange(e: Event) {
      const eventType: string = e.type || '';
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const theVal: string = target.value;
      console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      const cancelled: boolean = !this.fireEvent(
         BIZ_INPUT_EVENT.BizInputChange.customeEventName,
         theVal,
      );
      console.log(
         BIZ_INPUT_EVENT.BizInputChange.customeEventName +
            (cancelled
               ? ' default function is cancelled'
               : ' default function is not cancelled'),
      );

      if (!cancelled) {
         console.log('working on the default function ..');
      }
   }
   _bizInputFocus(e: FocusEvent) {
      const eventType: string = e.type || '';
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const theVal: string = target?.value;
      console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      const cancelled: boolean = !this.fireEvent(
         BIZ_INPUT_EVENT.BizInputFocus.customeEventName,
         theVal,
      );
      console.log(
         BIZ_INPUT_EVENT.BizInputFocus.customeEventName +
            (cancelled
               ? ' default function is cancelled'
               : ' default function is not cancelled'),
      );

      if (!cancelled) {
         console.log('working on the default function ..');
      }
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

      const eventProperty: EventProperty =
         (this.constructor as typeof Input).getEvents() ?? {};
      if (eventProperty) {
         Object.entries(eventProperty).forEach(([key, data]) => {
            const funcName = BIZ_INPUT_EVENT[key].functionName ?? '';
            if (funcName) {
               const theFunc = (this as Record<string, unknown>)[funcName];
               // const func = eval('this.' + key);
               const func = (0, eval)(theFunc as string);
               // const func = new Function(`this.${key}()`);
               theInput?.addEventListener(data.eventType, func.bind(this));
            }
         });
      }

      theInput?.addEventListener('input', this._handleInput.bind(this));
   }

   clean() {
      const theInput = super.shadow.querySelector('input');

      const eventProperty: EventProperty =
         (this.constructor as typeof Input).getEvents() ?? {};
      if (eventProperty) {
         Object.entries(eventProperty).forEach(([key, data]) => {
            const funcName = BIZ_INPUT_EVENT[key].functionName ?? '';
            if (funcName) {
               const theFunc = (this as Record<string, unknown>)[funcName];
               // const func = eval('this.' + key);
               const func = (0, eval)(theFunc as string);
               // const func = new Function(`this.${key}()`);
               theInput?.removeEventListener(data.eventType, func.bind(this));
            }
         });
      }

      theInput?.removeEventListener('input', this._handleInput.bind(this));
   }
}

Input.define();
