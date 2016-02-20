import Ember from 'ember';
import layout from '../templates/components/image-magnifier';
import computedStyle from 'ember-computed-style';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['image-magnifier'],
  magnifierLensComponent: 'magnifier-lens',
  attributeBindings: ['style'],
  style: computedStyle('magnifierDimensions'),
  zoom: 5,

  magnifierDimensions: computed('width', 'height', {
    get() {
      return {
        width: this.getWithDefault('width', 200),
        height: this.getWithDefault('height', 250)
      };
    }
  }),

  onImgLoad() {
    Ember.run.next(() => {
      this.setProperties({
        srcImgWidth: this.element.clientWidth,
        srcImgHeight: this.element.clientHeight,
        imageLoaded: true
      });
    });
  },

  mouseMove(event) {
    let target = event.currentTarget;
    let mouseX = event.clientX - target.offsetLeft;
    let mouseY = event.clientY - target.offsetTop;
    this.setProperties({
      mouseX,
      mouseY
    });
  },

  mouseEnter() {
    this.set('showPreview', true);
  },

  mouseLeave() {
    // this.set('showPreview', false);
  }
});
