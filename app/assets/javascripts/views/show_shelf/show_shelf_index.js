GoodShows.Views.ShowShelvesIndex = Backbone.CompositeView.extend({
  template: JST['show_shelf/index'],
  render: function () {
    var content = this.template();
  
    this.$el.html(content);

    // var allItemIndex = new GoodShows.Views.ShowShelvesIndexItem({
    //   all: true
    // });

    // this.addSubview('.shelf-sidebar', allItemIndex);

    this.collection.each( function (shelf) {
      var indexItemView = new GoodShows.Views.ShowShelvesIndexItem({
        model: shelf
      });
      this.addSubview('.shelf-sidebar', indexItemView);
    }.bind(this));

    var showShelfShowView = new GoodShows.Views.ShowShelfShow({
      model: this.model
    });

    this.addSubview('.shelf-show', showShelfShowView);
  
    return this;
  },

  initialize: function (options) {
    if(options.userId) {
      this.userId = options.userId;
    }
    if(options.shelfId){
      this.shelfId = options.shelfId;
    }
    this.listenTo(this.collection, "sync add", this.render);
  }
});