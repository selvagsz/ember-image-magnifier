import Ember from 'ember';
import layout from '../templates/components/magnifier-lens';
import computedStyle from 'ember-computed-style';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['magnifier-lens'],
  attributeBindings: ['style'],
  style: computedStyle('lensDimensions', 'lensPos'),

  lensDimensions: computed('lensWidth', 'lensHeight', {
    get() {
      return {
        width: this.get('lensWidth'),
        height: this.get('lensHeight')
      };
    }
  }),

  lensPos: computed('mouseX', 'mouseY', 'magnifierDimensions.{width,height}', {
    get() {
      let mouseX = this.getWithDefault('mouseX', 0);
      let mouseY = this.getWithDefault('mouseY', 0);
      let $element = this.element;
      let top = 0;
      let left = 0;

      if ($element) {
        let $width = $element.clientWidth;
        let $height = $element.clientHeight;
        // $element has inline style values alone, hence used `this.$().css()` to get borderWidth
        let $borderWidth = parseInt(this.$().css('border-width'), 10);

        if ((mouseX + $width/2) > this.get('magnifierDimensions.width')) {
          // leftBorder + rightBorder width = 2 * borderWidth
          left = this.get('magnifierDimensions.width') - $width - (2 * $borderWidth);
        } else {
          left = ((mouseX - $width/2) < 0) ? 0 : (mouseX - $width/2);
        }

        if ((mouseY + $height/2) > this.get('magnifierDimensions.height')) {
          // topBorder + bottomBorder width = 2 * borderWidth
          top = this.get('magnifierDimensions.height') - $height - (2 * $borderWidth);
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
