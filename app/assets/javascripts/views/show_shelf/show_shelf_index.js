GoodShows.Views.ShowShelvesIndex = Backbone.CompositeView.extend({
  template: JST['show_shelf/index'],

  events: {
    'mouseenter .add-shelf': 'displayTextInButton',
    'mouseleave .add-shelf': 'removeTextInButton',
    'submit .add-shelf-form': 'addShelf'
  },

  render: function () {
    var content = this.template();
  
    this.$el.html(content);

    var ownerId = this.collection.models[0] && this.collection.models[0].get('owner_id');

    var allItemIndex = new GoodShows.Views.ShowShelvesIndexItem({
      model: new GoodShows.Models.ShowShelf({
        title: 'All',
        owner_id: ownerId
      })
    });

    this.addSubview('.shelf-sidebar', allItemIndex);

    this.collection.each( function (shelf) {
      var indexItemView = new GoodShows.Views.ShowShelvesIndexItem({
        model: shelf
      });
      this.addSubview('.shelf-sidebar', indexItemView);
    }.bind(this));

    var showShelfShowView = new GoodShows.Views.ShowShelfShow({
      model: this.model,
      collection: this.collection
    });

    this.addSubview('.shelf-show', showShelfShowView);
  
    return this;
  },

  displayTextInButton: function (event) {

  },

  removeTextInButton: function (event) {

  },

  addShelf: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var newShelf = new GoodShows.Models.ShowShelf(data);
    newShelf.save({}, {
      success: function () {
        this.collection.add(newShelf);
        Backbone.history.navigate('users/' + newShelf.get('owner_id') + '/show-shelves/' + newShelf.id, { trigger: true });
      }.bind(this)
    });
  },

  initialize: function (options) {
    if(options.userId) {
      this.userId = options.userId;
    }
    if(options.shelfId){
      this.shelfId = options.shelfId;
    }
    this.listenTo(this.collection, "sync", this.render);
  }
});