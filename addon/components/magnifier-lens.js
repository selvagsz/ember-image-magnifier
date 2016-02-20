import Ember from 'ember';
import layout from '../templates/components/magnifier-lens';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['magnifier-lens'],
  attributeBindings: ['style'],

  calculateTopLeftPos() {
    let mouseX = this.getWithDefault('mouseX', 0);
    let mouseY = this.getWithDefault('mouseY', 0);
    let $element = this.element;
    let top = 0;
    let left = 0;

    if ($element) {
      let $width = $element.clientWidth;
      let $height = $element.clientHeight;

      top = (mouseY + $height) > this.get('srcImgHeight') ? (this.get('srcImgHeight') - $height) : mouseY;
      left = (mouseX + $width) > this.get('srcImgWidth') ? (this.get('srcImgWidth') - $width) : mouseX;
    }

    return {
      top,
      left
    };
  },

  style: computed('mouseX', 'mouseY', 'srcImgWidth', 'srcImgHeight', {
    get() {
      let { top, left } = this.calculateTopLeftPos();
      return `
        top: ${top}px;
        left: ${left}px;
        background: url(${this.get('src')}) -${left}px -${top}px no-repeat;
      `;
    }
  })
});
