GoodShows.Collections.Users = Backbone.Collection.extend({
  url: function (){
    return 'api/' + this.master.id + '/friends';
  },

  initialize: function (models, options) {
    if (options) {
      this.master = options.master;
    }
  },
  model: function (attrs, options) {
    if(this.master) {
      return new GoodShows.Models.User(attrs, {
        master: this.master
      });
    } else {
      return new GoodShows.Models.User(attrs,{});
    }
  }
});