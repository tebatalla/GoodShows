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
    this.attachSubviews();  
    return this;
  },

  displayTextInButton: function (event) {
    //TODO
  },

  removeTextInButton: function (event) {
    //TODO
  },

  addShelf: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var newShelf = new GoodShows.Models.ShowShelf(data);
    // $('#add-shelf-modal').modal('hide');
    newShelf.save({}, {
      success: function () {
        $('#add-shelf-modal').modal('hide');
        $('#add-shelf-modal').on('hidden.bs.modal', function () {
          this.collection.add(newShelf);
          Backbone.history.navigate('users/' + newShelf.get('owner_id') + '/show-shelves/' + newShelf.id, { trigger: true });
        }.bind(this));
      }.bind(this)
    });
  },

  initialize: function (options) {
    if(options) {
      this.userId = options.userId;
      this.shelfId = options.shelfId;
      this.allShelf = options.allShelf;
    }

    this.shelfView = true;

    this.listenToOnce(this.allShelf, "sync", this.addAllShowShelvesIndexItem);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addShowShelvesIndexItem);
    this.listenTo(this.model, "sync destroy", this.swapShowShelfView);
    this.listenTo(this.collection, "remove", this.removeShowShelf);
    this.collection.each(this.addShowShelvesIndexItem.bind(this));

    if(this.model.id === 0) {
      this.swapShowShelfView();
    }
  },

  removeShowShelf: function (shelf) {
    _(this.subviews('.shelf-sidebar')).each(function (subview) {
      if(subview.model == shelf) {
        this.removeSubview('.shelf-sidebar', subview);
      }
    }.bind(this));
  },

  addAllShowShelvesIndexItem: function () {

    var ownerId = this.collection.first() && this.collection.first().get('owner_id');

    var allItemIndex = new GoodShows.Views.ShowShelvesIndexItem({
      model: this.allShelf.set({
        owner_id: ownerId
      })
    });

    this.unshiftSubview('.shelf-sidebar', allItemIndex);
  },

  addShowShelvesIndexItem: function (shelf) {
    var indexItemView = new GoodShows.Views.ShowShelvesIndexItem({
      model: shelf
    });
    this.addSubview('.shelf-sidebar', indexItemView);
  },

  swapShowShelfView: function (model) {
    if (!model) {
      model = this.model;
    }
    var showShelfShowView = new GoodShows.Views.ShowShelfShow({
      model: model,
      shows: model.shows(),
      collection: this.collection
    });
    this._currentShelf && this.removeSubview('.shelf-show',this._currentShelf);
    this._currentShelf = showShelfShowView;
    this.addSubview('.shelf-show', this._currentShelf);
  }
});