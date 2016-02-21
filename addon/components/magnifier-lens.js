import Ember from 'ember';
import layout from '../templates/components/magnifier-lens';
import computedStyle from 'ember-computed-style';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['magnifier-lens'],
  attributeBindings: ['style'],
  style: computedStyle('lensDimensions', 'lensPos'),

  lensDimensions: computed('srcImgWidth', 'srcImgHeight', {
    get() {
      return {
        width: 0.25 * this.get('srcImgWidth'),
        height: 0.3 * this.get('srcImgHeight')
      };
    }
  }),

  lensPos: computed('mouseX', 'mouseY', 'srcImgWidth', 'srcImgHeight', {
    get() {
      let mouseX = this.getWithDefault('mouseX', 0);
      let mouseY = this.getWithDefault('mouseY', 0);
      let $element = this.element;
      let top = 0;
      let left = 0;

      if ($element) {
        let $width = $element.clientWidth;
        let $height = $element.clientHeight;

        if ((mouseX + $width/2) > this.get('srcImgHeight')) {
          left = this.get('srcImgWidth') - $width;
        } else {
          left = ((mouseX - $width/2) < 0) ? 0 : (mouseX - $width/2);
        }

        if ((mouseY + $height/2) > this.get('srcImgHeight')) {
          top = this.get('srcImgHeight') - $height;
        } else {
          top = ((mouseY - $height/2) < 0) ? 0 : (mouseY - $height/2);
        }
      }

      return {
        top,
        left
      };
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.sendAction('on-lens-insert', this.elementId, this.get('lensDimensions'));
  }
});
