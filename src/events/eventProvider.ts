export class EventProvider<EventParam, EventReturn> {
   #eventRegistries: Map<string, Array<(param: EventParam) => EventReturn>>;

   constructor() {
      this.#eventRegistries = new Map();
   }

   attachEvent(
      eventName: string,
      fnc: (param: EventParam) => EventReturn,
   ): void {
      const eventFunctions = this.#eventRegistries.get(eventName);
      if (!Array.isArray(eventFunctions)) {
         this.#eventRegistries.set(eventName, [fnc]);
      }

      if (!eventFunctions!.includes(fnc)) {
         eventFunctions!.push(fnc);
      }
   }

   detachEvent(
      eventName: string,
      fnc: (param: EventParam) => EventReturn,
   ): void {
      const eventFunctions = this.#eventRegistries.get(eventName);
      if (eventFunctions) {
         const idx = eventFunctions.indexOf(fnc);

         if (idx != -1) {
            eventFunctions.splice(idx, 1);
         }

         if (eventFunctions.length === 0) {
            this.#eventRegistries.delete(eventName);
         }
      }
   }

   fireEvent(eventName: string, data: EventParam) {
      const eventFunctions = this.#eventRegistries.get(eventName);
      if (!eventFunctions) {
         return [];
      }

      return eventFunctions.map((fn) => {
         return fn.call(this, data);
      });
   }

   /**
    * return a promise that will resolve once all event functions have been resolved.
    * @param eventName
    * @param data
    * @returns
    */
   fireEventAsync(eventName: string, data: EventParam) {
      return Promise.all(this.fireEvent(eventName, data));
   }
}
