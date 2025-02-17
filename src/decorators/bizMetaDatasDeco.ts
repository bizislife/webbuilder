import { MetaDataInterface } from '../models/basic.model';

export const bizMetaDatasDeco = (
   metaData: MetaDataInterface,
): ClassDecorator => {
   // eslint-disable-next-line
   return (target: any) => {
      if (!Object.prototype.hasOwnProperty.call(target, 'metaData')) {
         target.metaData = {};
      }

      if (metaData.tag) {
         target.metaData.tag = metaData.tag;
      }

      if (metaData.observedAttributes) {
         target.metaData.observedAttributes = [...metaData.observedAttributes];
      }
   };
};
