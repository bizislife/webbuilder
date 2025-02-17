import { bizMetaDatasDeco } from '../../decorators/bizMetaDatasDeco';
import { BizBaseElement } from '../BizBaseElement';

@bizMetaDatasDeco({
   tag: 'biz-text',
})
export class Text extends BizBaseElement {
   constructor() {
      super();
      this.#render();
   }

   #render() {
      super.shadow.innerHTML = `
         <slot></slot>
      `;
   }
}

Text.define();
