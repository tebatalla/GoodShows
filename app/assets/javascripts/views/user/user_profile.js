GoodShows.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['user/user_profile'],

  render: function () {
    var content = this.template({
      user: this.model
    });
  
    this.$el.html(content);
    this.attachSubviews();
  
    return this;
  },

  events: {
    'click .edit-name': 'editNameForm',
    'submit .edit-name-form': 'editUser',
    'click .user-picture-edit': 'uploadPicture'
  },

  initialize: function (options) {
    if(options) {

    }
    this.listenTo(this.model, "sync change:name", this.render);
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
    this.delegateEvents();
  },

  dismissEdit: function () {
    this.$edit.replaceWith(this.$name);
    this.delegateEvents();
  },

  uploadPicture: function () {
    event.preventDefault();
    filepicker.setKey('ATkVBrDeT9Cx6oytknKgHz');
    filepicker.pick({ mimetype: 'image/*', maxSize: 1024*1024*10 }, function(Blob){
      this.model.save({
        file_url: Blob.url
      }, {
        url: '/api/users/' + this.model.id,
        patch: true
      });
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
        this.delegateEvents();
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
  }
});