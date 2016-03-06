import Ember from 'ember';
import TetherComponent from 'ember-tether/components/ember-tether';
import layout from '../templates/components/magnifier-preview';

export default TetherComponent.extend({
  layout,
  classNames: ['magnifier-preview'],

  imageDimensions: Ember.computed('mouseX', 'mouseY', 'zoom', 'magnifierDimensions.{width,height}', 'lensDimensions.{width,height}', {
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
