import { MetaDataInterface } from '../models/basic.model';

/**
 * this will set metaDatas to the target (typeof BizBaseElement)
 * @param metaData
 * @returns
 */
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

      if (metaData.events) {
         target.metaData.events = metaData.events;
      }
   };
};
