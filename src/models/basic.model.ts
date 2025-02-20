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

export type EventProperty = Record<string, EventInit>;
