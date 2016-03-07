import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import image_226x150_in_base64 from 'dummy/tests/base64-img';

moduleForComponent('image-magnifier', 'Integration | Component | image magnifier', {
  integration: true,

  beforeEach() {
    this.set('image_226x150_in_base64', image_226x150_in_base64);
  },

  afterEach() {
    this.set('image_226x150_in_base64', null);
  }
});

test('component renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.render(hbs`
    {{image-magnifier
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  assert.equal(this.$().text().trim(), '');
  assert.equal(this.$('img').attr('src'), image_226x150_in_base64);
});

test('magnifier component preserves the image aspect ratio, when dimensions are specified', function(assert) {
  this.render(hbs`
    {{image-magnifier
      width=200
      src=image_226x150_in_base64
      previewSrc=image_226x150_in_base64}}
  `);

  assert.equal(this.$('img').width(), 200, 'Image rendered with specified width');
  assert.equal(Math.round(this.$('img').height()), 132, 'Height scaled down preserving the aspect ratio');
});
