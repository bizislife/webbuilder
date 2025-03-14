export enum InputType {
   Text = 'Text',
   Email = 'Email',
   Password = 'Password',
}

export interface MetaDataInterface {
   tag?: string;
   observedAttributes?: Array<string>;
   events?: EventProperty;
}

/**
 * For EventInit:
 *    without specific reason, make bubbles=false always.'
 *    without specific reason, make cancelable=true always, so the user can disable default function by 'event.preventDefault()'
 */
export interface BizEventInit extends EventInit {
   eventType: string;
}

export interface BizCustomEvent {
   customeEventName: string;
   eventType: string;
   functionName?: string;
}

export type EventProperty = Record<string, BizEventInit>;
