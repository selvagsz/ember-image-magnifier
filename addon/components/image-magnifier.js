import Ember from 'ember';
import layout from '../templates/components/image-magnifier';
import computedStyle from 'ember-computed-style';

const { Component, computed, run } = Ember;

export default Component.extend({
  layout,
  classNames: ['image-magnifier'],
  attributeBindings: ['style'],
  style: computedStyle('magnifierDimensions'),
  zoom: 5,
  previewerAttachment: 'top left',
  previewerTargetAttachment: 'top right',
  previewerTargetOffset: '0 0',
  attachToLens: false,
  _previewerTarget: computed('attachToLens', 'lensId', {
    get() {
      if (this.get('attachToLens')) {
        return `${this.get('lensId')}`;
      }

      return this.get('previewerTarget') || `#${this.elementId}`;
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    let $image, isCached;

    this.set('imageLoaded', false);
    run.schedule('afterRender', () => {
      $image = this.$('img');

      if ($image) {
        isCached = $image[0].complete;

        if (!isCached) {
          $image.on('load', () => {
            this._imageLoaded();
          });
        } else {
          this._imageLoaded();
        }
      }
    });
  },

  magnifierDimensions: computed('max-width', 'max-height', {
    get() {
      let maxWidth = this.getWithDefault('max-width', 200);
      let maxHeight = this.getWithDefault('max-height', 200);

      return {
        width: maxWidth,
        height: maxHeight
      };
    }
  }),

  _imageLoaded() {
    run.next(() => {
      this.set('imageLoaded', true);
    });
  },

  onLensInsert(lensId, lensDimensions) {
    this.setProperties({
      lensId: `#${lensId}`,
      lensDimensions
    });
    this.showImagePreview();
  },

  showMagnifierLens() {
    this.set('showLens', true);
  },

  hideMagnifierLens() {
    this.set('showLens', false);
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
    event.preventDefault(); // prevents scrolling during the touch action
  },

  mouseEnter() {
    this.showMagnifierLens();
  },

  mouseLeave() {
    this.hideMagnifierLens();
    this.hideImagePreview();
  },

  touchStart() {
    this.showMagnifierLens();
  },

  touchEnd() {
    this.hideMagnifierLens();
    this.hideImagePreview();
  }
});
