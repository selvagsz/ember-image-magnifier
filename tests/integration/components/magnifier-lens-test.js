import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('magnifier-lens', 'Integration | Component | magnifier lens', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{magnifier-lens}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#magnifier-lens}}
      template block text
    {{/magnifier-lens}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
