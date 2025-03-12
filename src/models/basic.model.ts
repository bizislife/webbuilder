export interface MetaDataInterface {
   tag?: string;
   observedAttributes?: Array<string>;
   events?: EventProperty;
}

export enum InputType {
   Text = 'Text',
   Email = 'Email',
   Password = 'Password',
}

export interface BizEventInit extends EventInit{
   eventType: string;
}

export type EventProperty = Record<string, BizEventInit>;
