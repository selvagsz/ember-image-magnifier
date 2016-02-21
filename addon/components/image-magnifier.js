import Ember from 'ember';
import layout from '../templates/components/image-magnifier';
import computedStyle from 'ember-computed-style';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['image-magnifier'],
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

  showImagePreview() {
    this.set('showPreview', true);
  },

  hideImagePreview() {
    this.set('showPreview', false);
  },

  setMouseCoordinates(event) {
    let target = event.currentTarget;
    let clientX, clientY;

    if (event.type === 'touchmove') {
      clientX = event.originalEvent.touches[0].clientX;
      clientY = event.originalEvent.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    let mouseX = clientX - target.offsetLeft;
    let mouseY = clientY - target.offsetTop;
    this.setProperties({
      mouseX,
      mouseY
    });
  },

  mouseMove(event) {
    this.setMouseCoordinates(event);
  },

  touchMove(event) {
    this.setMouseCoordinates(event);
  },

  mouseEnter() {
    this.showImagePreview();
  },

  mouseLeave() {
    this.hideImagePreview();
  },

  touchStart() {
    this.showImagePreview();
  },

  touchEnd() {
    this.hideImagePreview();
  }
});
