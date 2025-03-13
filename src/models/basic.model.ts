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

export interface BizEventInit extends EventInit{
   eventType: string;
}

export interface BizCustomEvent {
   customeEventName: string;
   eventType: string;
   functionName?: string;
}

export type EventProperty = Record<string, BizEventInit>;
