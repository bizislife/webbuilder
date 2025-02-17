export interface MetaDataInterface {
   tag?: string;
   observedAttributes?: Array<string>;
}

export enum InputType {
   Text = 'Text',
   Email = 'Email',
   Password = 'Password',
}
