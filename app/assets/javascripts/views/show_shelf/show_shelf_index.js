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
  
    return this;
  },

  initialize: function (options) {
    this.listenTo(this.collection, "sync add", this.render);
  }
});