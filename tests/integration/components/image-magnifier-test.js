import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('image-magnifier', 'Integration | Component | image magnifier', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{image-magnifier}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#image-magnifier}}
      template block text
    {{/image-magnifier}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
