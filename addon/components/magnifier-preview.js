import Ember from 'ember';
import TetherComponent from 'ember-tether/components/ember-tether';
import layout from '../templates/components/magnifier-preview';

export default TetherComponent.extend({
  layout,
  classNames: ['magnifier-preview'],

  imageDimensions: Ember.computed('mouseX', 'mouseY', {
    get() {
      return `
        left: -${this.get('mouseX')}px;
        top: -${this.get('mouseY')}px;
      `;
    }
  })
});
