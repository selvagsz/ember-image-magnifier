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
  
  lensWidth: computed('zoom', 'previewerWidth', function () {
    return this.get('previewerWidth') / this.get('zoom');
  }),
  
  lensHeight: computed('zoom', 'previewerHeight', function () {
    return  this.get('previewerHeight') / this.get('zoom');
  }),

  init() {
    this._super(...arguments);
    this.set('magnifierDimensions', {});
  },

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

  setMagnifierDimensions() {
    let $image = this.$('img');
    let imgWidth = $image.width();
    let imgHeight = $image.height();
    let maxWidth = this.getWithDefault('width', imgWidth);
    let maxHeight = this.getWithDefault('height', imgHeight);
    let width, height;

    let widthRatio = maxWidth / imgWidth;
    let heightRatio = maxHeight / imgHeight;

    if (heightRatio >= widthRatio) {
      width = maxWidth;
      height = imgHeight * widthRatio;
    } else {
      width = imgWidth * heightRatio;
      height = maxHeight;
    }

    // To set the default value for previewer
    let imgRatio = imgWidth / imgHeight;
    this.set('imgRatio', imgRatio);

    this.set('magnifierDimensions', {
      width,
      height
    });
  },
  
  setPreviewerDimensions() {
    // Sets default value for previewer width and height
    if(!this.get('previewerWidth')) {
      this.set('previewerWidth', this.get('magnifierDimensions.width'));
    }
    if(!this.get('previewerHeight')) {
      let previewerHeight = this.get('previewerWidth') / this.get('imgRatio');
      this.set('previewerHeight', previewerHeight);
    }

  },

  _imageLoaded() {
    this.set('imageLoaded', true);
    this.setMagnifierDimensions();
    this.setPreviewerDimensions();
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
    let targetBoundingRect = target.getBoundingClientRect();
    let mouseX = clientX - targetBoundingRect.left;
    let mouseY = clientY - targetBoundingRect.top;

    this.setProperties({
      mouseX,
      mouseY,
      lensOffsetLeft: event.target.offsetLeft,
      lensOffsetTop: event.target.offsetTop
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
