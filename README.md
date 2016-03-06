# image-magnifier

An ember add for image magnification

[DEMO](http://selvagsz.github.io/#/demos/magnifier)

## Usage

```handlebars

  {{image-magnifier
    src="http://lorempixel.com/image_output/nightlife-q-c-200-200-8.jpg"
    preview-src="http://lorempixel.com/image_output/nightlife-q-c-500-500-8.jpg"
    zoom=4
    attachToLens=true
    previewerAttachment="top left"
    previewerTargetAttachment="top right"
    previewerTargetOffset="0 20"}}

```


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
