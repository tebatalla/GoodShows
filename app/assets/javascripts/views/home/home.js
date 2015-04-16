GoodShows.Views.Home = Backbone.CompositeView.extend({
  template: JST['home/home'],
  render: function () {
    var content = this.template({});
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },
  initialize: function (options) {
    if (options) {
      this.users = options.users;
      this.showShelves = options.showShelves;
      this.feed = options.feed;
    }
    this.feed.fetch();
    var shows = new GoodShows.Collections.ShowsAiringToday();
    shows.fetch();
    this.users.fetch();

    this.listenTo(shows, 'sync', this.syncShows);
    this.listenTo(this.users, 'add', this.addUsers);
  },

  addUsers: function(user) {
    var userView = new GoodShows.Views.UsersIndexItem({
      model: user
    });

    this.addSubview('.users-list', userView);
  },

  syncShows: function (shows) {
    shows.each(this.addShowToView.bind(this));
  },

  addShowToView: function (show) {
    var showView = new GoodShows.Views.OnTheAirViewItem({
      model: show
    });

    this.addSubview('.airing-tv-show', showView);
  }

});