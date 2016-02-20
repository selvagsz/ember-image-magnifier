import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('magnifier-preview', 'Integration | Component | magnifier preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{magnifier-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#magnifier-preview}}
      template block text
    {{/magnifier-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
