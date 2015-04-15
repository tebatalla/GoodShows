GoodShows.Views.OnTheAirViewItem = Backbone.View.extend({
  template: JST['home/on_the_air_item'],
  render: function () {
    var content = this.template({
      show: this.model
    });
  
    this.$el.html(content);
  
    return this;
  },
  className:'col-sm-2 home-show-box'
});