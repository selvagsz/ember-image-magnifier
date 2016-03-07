import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import image_226x150_in_base64 from 'dummy/tests/base64-img';

moduleForComponent('magnifier-preview', 'Integration | Component | magnifier preview', {
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

  this.render(hbs`{{magnifier-preview}}`);

  assert.equal(this.$().text().trim(), '');
});

test('Magnifier preview is attached when hovered and removed on mouse leave', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.ok($('.magnifier-preview').length, 'Magnifier preview is rendered on mouse hover');

  this.$('.image-magnifier').trigger('mouseleave');
  assert.ok(!$('.magnifier-preview').length, 'Magnifier preview is removed on mouse leave');
});

test('Preview is attached to lens, when `attachToLens` option is set to `true`', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.ok(!this.$('.magnifier-lens').hasClass('ember-tether-target'), 'Preview is not attached to the lens');
  this.$('.image-magnifier').trigger('mouseleave');

  this.render(hbs`
    {{image-magnifier
      width=200
      attachToLens=true
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);
  this.$('.image-magnifier').trigger('mouseenter');
  assert.ok(this.$('.magnifier-lens').hasClass('ember-tether-target'), 'Preview is attached to the lens');
});

test('Previewer default width is twice the thumbnail width', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.equal($('.magnifier-preview').css('width'), '400px', 'Preview width is twice the thumbnail width by default');
  assert.equal($('.magnifier-preview').css('height'), '265px', 'Preview height is twice the thumbnail height by default');
});

test('Previewer Image width is based on the provided zoom level', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      zoom=4
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  this.$('.image-magnifier').trigger('mouseenter');
  assert.equal($('.magnifier-preview img').css('width'), '800px', 'Preview Image width is based on the zoom level');
  assert.equal($('.magnifier-preview img').css('height'), '531px', 'Preview Image height is based on the zoom level');
});
