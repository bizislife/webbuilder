/**
 * this will set evnet with data to the target.metaData.events, where target is typeof BizBaseelement
 * @param name
 * @param data
 * @returns
 */
export const bizEventDeco = (
   name: string,
   data: EventInit = {},
): ClassDecorator => {
   // eslint-disable-next-line
   return (target: any) => {
      if (!Object.prototype.hasOwnProperty.call(target, 'metaData')) {
         target.metaData = {};
      }

      if (!target.metaData.events) {
         target.metaData.events = {};
      }

      target.metaData.events[name] = data;
   };
};
