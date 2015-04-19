GoodShows.Views.Home = Backbone.CompositeView.extend({
  template: JST['home/home'],
  render: function () {
    var content = this.template({});
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },

  events: {
    'click button.fetch-more-updates': 'fetchMoreUpdates'
  },

  initialize: function (options) {
    if (options) {
      this.users = options.users;
      this.showShelves = options.showShelves;
      this.feed = options.feed;

    }
    var shows = new GoodShows.Collections.ShowsAiringToday();
    shows.fetch();
    this.users.fetch();
    this.feed.fetch({
      success: function () {
        this.$('.loader').removeClass('loader');
      }.bind(this)
    });

    this.listenTo(shows, 'sync', this.syncShows);
    this.listenTo(this.users, 'add', this.addUsers);
    this.listenTo(this.feed, 'add', this.addFeedItem);
  },

  fetchMoreUpdates: function(event) {
    event.preventDefault();
    $(event.currentTarget).addClass('active');
    this.page = this.page || 0;
    this.page++;
    this.feed.fetch({
      data: $.param({ page: this.page}),
      success: function (collection, response) {
        if(response.length < 10) {
          $(event.currentTarget).remove();
        }
      }
    })
    .then(function () {
      $(event.currentTarget).removeClass('active');
    });
  },

  addUsers: function(user) {
    var userView = new GoodShows.Views.UsersIndexItem({
      model: user
    });

    this.addSubview('.users-list', userView);
  },

  addFeedItem: function(feedEvent) {
    var itemView;

    if(feedEvent.get('type') === "Review") {
      itemView = new GoodShows.Views.ReviewEventItem({
        model: feedEvent,
        shelves: this.showShelves
      });
    } else if (feedEvent.get('type') === "Comment") {
      itemView = new GoodShows.Views.CommentEventItem({
        model: feedEvent,
        shelves: this.showShelves
      });
    } else if (feedEvent.get('type') === "Shelving") {
      itemView = new GoodShows.Views.ShelvingEventItem({
        model: feedEvent,
        shelves: this.showShelves
      });
    }

    this.addSubview('.home-feed', itemView);
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