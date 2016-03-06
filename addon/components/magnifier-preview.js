import Ember from 'ember';
import layout from '../templates/components/magnifier-preview';
import TetherComponent from 'ember-tether/components/ember-tether';
import computedStyle from 'ember-computed-style';

const { computed } = Ember;

export default TetherComponent.extend({
  layout,
  classNames: ['magnifier-preview'],
  attributeBindings: ['style'],
  style: computedStyle('previewerDimensions'),

  previewerDimensions: computed('previewerWidth', 'previewerHeight', 'magnifierDimensions.{width,height}', {
    get() {
      return {
        width: this.getWithDefault('previewerWidth', this.get('magnifierDimensions.width') * 2),
        height: this.getWithDefault('previewerHeight', this.get('magnifierDimensions.height') * 2)
      };
    }
  }),

  imageDimensions: computed('mouseX', 'mouseY', 'zoom', 'magnifierDimensions.{width,height}', 'lensDimensions.{width,height}', {
    get() {
      let zoomLevel = this.get('zoom');
      let zoomedWidth = zoomLevel * this.get('magnifierDimensions.width');
      let zoomedHeight = zoomLevel * this.get('magnifierDimensions.height');
      let leftPos = - zoomLevel * (this.get('mouseX') - this.get('lensDimensions.width')/2);
      let topPos = - zoomLevel * (this.get('mouseY') - this.get('lensDimensions.height')/2);

      return Ember.String.htmlSafe(`
        width: ${zoomedWidth}px;
        height: ${zoomedHeight}px;
        left: ${leftPos}px;
        top: ${topPos}px;
      `);
    }
  })
});
