import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import image_226x150_in_base64 from 'dummy/tests/base64-img';

moduleForComponent('magnifier-lens', 'Integration | Component | magnifier lens', {
  integration: true,

  beforeEach() {
    this.set('image_226x150_in_base64', image_226x150_in_base64);
  },

  afterEach() {
    this.set('image_226x150_in_base64', null);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{magnifier-lens}}`);

  assert.equal(this.$().text().trim(), '');
});

test('lens is attached on mouseEnter and removed on mouseLeave', function(assert) {
  this.render(hbs`
    {{image-magnifier
      src=image_226x150_in_base64
      preview-src=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.ok(this.$('.magnifier-lens').length, 'Lens is attached on mouse enter');

  this.$('.image-magnifier').trigger('mouseleave');
  assert.ok(!this.$('.magnifier-lens').length, 'Lens is removed on mouse leave');
});

test('Lens dimensions are calculated based on thumbnail dimensions', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      src=image_226x150_in_base64
      preview-src=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.equal(this.$('.magnifier-lens').css('width'), '50px', 'Lens width is 0.25 times of thumbnail width');
  assert.equal(this.$('.magnifier-lens').css('height'), '40px', 'Lens width is 0.3 times of thumbnail height');
});
