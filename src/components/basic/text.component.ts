import { bizMetaDatasDeco } from '../../decorators/bizMetaDatasDeco';
import { BizCustomEvent, EventProperty } from '../../models/basic.model';
import { BizBaseElement } from '../BizBaseElement';

const BIZ_TEXT_EVENT: Record<string, BizCustomEvent> = {
   // INPUT : {customeEventName: 'input', eventName: 'input'},
   BizClick: {
      customeEventName: 'BizClick',
      eventType: 'click',
      functionName: '_bizClick',
   },
};

@bizMetaDatasDeco({
   tag: 'biz-text',
   events: {
      [BIZ_TEXT_EVENT.BizClick.customeEventName]: {
         eventType: BIZ_TEXT_EVENT.BizClick.eventType,
         bubbles: false,
         cancelable: true,
      },
   },
})
export class Text extends BizBaseElement {
   constructor() {
      super();
   }

   _bizClick(e: PointerEvent) {
      const eventType: string = e.type || '';
      const target: HTMLSlotElement = e.target as HTMLSlotElement;
      // const theVal: string = target.value;
      // console.log(eventType + ' on ' + target?.tagName + ' value is ' + theVal);

      const cancelled: boolean = !this.fireEvent(
         BIZ_TEXT_EVENT.BizClick.customeEventName,
      );
      console.log(
         BIZ_TEXT_EVENT.BizClick.customeEventName +
            (cancelled
               ? ' default function is cancelled'
               : ' default function is not cancelled'),
      );

      if (!cancelled) {
         console.log('working on the default function ..');
      }
   }

   render(): void {
      super.shadow.innerHTML = `
         <span><slot></slot></span>
      `;

      const theText = super.shadow.querySelector('span');
      const eventProperty: EventProperty =
         (this.constructor as typeof Text).getEvents() ?? {};
      if (eventProperty) {
         Object.entries(eventProperty).forEach(([key, data]) => {
            const funcName = BIZ_TEXT_EVENT[key].functionName ?? '';
            if (funcName) {
               const theFunc = (this as Record<string, unknown>)[funcName];
               // const func = eval('this.' + key);
               const func = (0, eval)(theFunc as string);
               // const func = new Function(`this.${key}()`);
               theText?.addEventListener(data.eventType, func.bind(this));
            }
         });
      }
   }

   clean(): void {
      const theText = super.shadow.querySelector('span');
      const eventProperty: EventProperty =
         (this.constructor as typeof Text).getEvents() ?? {};
      if (eventProperty) {
         Object.entries(eventProperty).forEach(([key, data]) => {
            const funcName = BIZ_TEXT_EVENT[key].functionName ?? '';
            if (funcName) {
               const theFunc = (this as Record<string, unknown>)[funcName];
               // const func = eval('this.' + key);
               const func = (0, eval)(theFunc as string);
               // const func = new Function(`this.${key}()`);
               theText?.removeEventListener(data.eventType, func.bind(this));
            }
         });
      }
   }
}

Text.define();
