GoodShows.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['user/user_profile'],

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.removeClass('loader');
  
    this.$el.html(content);
    this.attachSubviews();
    this.delegateSubviewEvents();
  
    return this;
  },

  events: {
    'click .edit-name': 'editNameForm',
    'submit .edit-name-form': 'editUser',
    'click .user-picture-edit': 'uploadPicture'
  },

  initialize: function (options) {
    if(options) {
      this.shelves = options.shelves;
    }
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), 'add', this.addReviewItem);
    this.addFriendsList();
    this.addShelvesList();
    this.addProfileOption();
    this.addFriendRequestsList();
  },

  addProfileOption: function () {
    var view = new GoodShows.Views.ProfileOptionView({
      model: this.model
    });
    this.addSubview('.user-profile-option', view);
  },

  editNameForm: function () {
    event.preventDefault();
    this.$name = $('.name');
    this.$edit = $('<form class="edit-name-form form-inline h1">')
      .append('<input class="form-control name-input" name="user[name]" value="'+this.model.get('name')+'">')
      .append('<button type="submit" class="btn btn-primary">Edit</button>');
    this.$name.replaceWith(this.$edit);
    this.$('.name-input').focus();
  },

  dismissEdit: function () {
    this.$edit.replaceWith(this.$name);
  },

  uploadPicture: function () {
    event.preventDefault();
    filepicker.setKey('ATkVBrDeT9Cx6oytknKgHz');
    filepicker.pick({ mimetype: 'image/*', maxSize: 1024*1024*10 }, function(Blob){ 
      filepicker.convert(
        Blob,
        {
          height: 180,
          width: 180,
          align: 'faces',
        },
        {},
        function (newBlob) {
          this.model.save({
            file_url: newBlob.url
          }, {
            url: '/api/users/' + this.model.id,
            patch: true
          });
        }.bind(this));
    }.bind(this));
  },

  editUser: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    this.model.save(data, {
      url: '/api/users/' + this.model.id,
      patch: true,
      success: function () {
        this.$edit.replaceWith(this.$name);
      }.bind(this)
    });
  },

  addFriendsList: function () {
    var friendsListView = new GoodShows.Views.FriendsList({
      collection: this.model.friends()
    });

    this.addSubview('.friends-list-wrapper', friendsListView);
  },

  addFriendRequestsList: function () {
    var friendsListView = new GoodShows.Views.FriendRequestsList({
      collection: this.model.friendRequests(),
      user: this.model
    });

    this.addSubview('.friend-requests-list-wrapper', friendsListView);
  },

  addShelvesList: function () {
    var showsListView = new GoodShows.Views.ShelfList({
      collection: this.model.showShelves(),
      user: this.model
    });

    this.addSubview('.shelves-list', showsListView);
  },

  addReviewItem: function (review) {
    var view = new GoodShows.Views.UserReviewIndexItem({
      model: review,
      shelves: this.shelves
    });
    if (review.get('rating') || review.get('review')) {
      this.addSubview('.reviews-list', view);
    }
  }
});