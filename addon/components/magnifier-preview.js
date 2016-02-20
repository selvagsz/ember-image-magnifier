import Ember from 'ember';
import TetherComponent from 'ember-tether/components/ember-tether';
import layout from '../templates/components/magnifier-preview';

export default TetherComponent.extend({
  layout,
  classNames: ['magnifier-preview'],

  imageDimensions: Ember.computed('mouseX', 'mouseY', 'srcImgWidth', 'srcImgHeight', 'zoom', {
    get() {
      return `
        width: ${this.get('zoom') * this.get('srcImgWidth')}px;
        height: ${this.get('zoom') * this.get('srcImgHeight')}px;
        left: ${- (this.get('zoom') * this.get('mouseX'))}px;
        top: ${- (this.get('zoom') * this.get('mouseY'))}px;
      `;
    }
  })
});
