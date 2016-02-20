import Ember from 'ember';
import layout from '../templates/components/image-magnifier';

export default Ember.Component.extend({
  layout,
  classNames: ['image-magnifier'],
  magnifierLensComponent: 'magnifier-lens',

  onImgLoad() {
    Ember.run.later(() => {
      this.setProperties({
        srcImgWidth: this.$('img')[0].width,
        srcImgHeight: this.$('img')[0].height,
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
    this.set('showPreview', false);
  }
});
