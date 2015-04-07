window.GoodShows = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl) {
    new GoodShows.Routers.Router({
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  GoodShows.initialize($('#goodshows'));
});
