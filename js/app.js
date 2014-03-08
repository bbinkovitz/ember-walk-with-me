App = Ember.Application.create();

App.Router.map(function() {
  // View an individual drawing.
  App.Router.map(function() {
    this.resource("drawings", { path: "/drawings/:image_id" });
  });
  App.Router.map(function() {
    this.resource("add", { path: "/add" });
  });
});

App.AddRoute = Ember.Route.extend({
    model: function(params) {
    if(window.FileReader) {
      params['msg'] = 'Drag image files here.';
    }
    else {
      params['msg'] = 'Your browser does not support the HTML5 FileReader.';
    }
    return(params);
  }
});

/**
 * View an individual drawing.
 **/
App.DrawingsRoute = Ember.Route.extend({
  model: function(params) {
    // Get the image ID.
    var image_id = params.image_id;
    // Figure out which item we're on and how many we have.
    var position = names.indexOf(image_id);

    var next = createNext(position);
    var prev = createPrev(position);

    // Put it all on a slide.
    var slide = {};
    slide['thislink'] = link(image_id);
    slide['thisname'] = image_id;
    slide['nextlink'] = link(next);
    slide['nextname'] = next;
    slide['prevlink'] = link(prev);
    slide['prevname'] = prev;
    return slide;
  }
});

/**
 * Things in the drop box area.
 **/
App.AddView = Ember.View.extend({
  classNameBindings: ['enter:enter:leave', 'dropped:dropped:leave'],
  enter: false,
  dropped: false,
  text: 'Drag image files here.',
  drop: function(event) {
    this.set('text', 'Thanks!');
    this.set('enter', false);
    this.set('dropped', true);
    setTimeout(function() {
      $('.dropped').removeClass('dropped');
      $('#drop').text('Drag image files here.');
    }, 3500);
    event.preventDefault();
    event.stopPropagation();
  },
  dragOver: function(event) {
    event.preventDefault();
    event.stopPropagation();
  },
  dragEnter: function(event) {
    this.set('enter', true);
    this.set('text', 'Drop it like it\'s hot.');
  },
  dragLeave: function(event) {
    this.set('enter', false);
    this.set('text', 'Drag image files here.');
  }
});

/**
 * View the main index.
 **/
App.IndexRoute = Ember.Route.extend({
  model: function() {
    var pictures = [];
    names.forEach(function(name){
      picture = {};
      picture['name'] = name;
      picture['link'] = link(name);
      pictures.push(picture);
    });
    return pictures;
  }
});

/**
* This is the list that everything else comes from.
* To add another thing to the slideshow:
* 1. Make sure it's in the images/ folder
* 2. Make sure the path is in format "pen-drawing-[name].jpg"
* 3. Add the name to this array.
* */
var names = ['eyerise', 'human', 'yolo', 'skeumorph', 'ghosts', 'dgaf', 'lightbulb', 'lips', 'nvmbrmndy'];

/**
 * Create path from name.
 **/
function link(name) {
  return 'drawings/pen-drawing-' + name + '.jpg';
}

/*
 * Creates a previous item object
 */
 function createPrev(position) {
    if (position > 0) {
      return names[(position - 1)];
    }
    else {
      return names[names.length - 1];
    }
}

/**
 * Creates a next item object
 */
function createNext(position) {
    if (position < names.length - 1) {
      return names[(position + 1)];
    }
    else {
      return names[(0)];
    }
}


