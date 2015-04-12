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
    'click .upload-picture': 'uploadPicture'
  },

  initialize: function (options) {
    if(options) {

    }
    this.listenTo(this.model, "sync change:name", this.render);
    this.addFriendsList();
    this.addShelvesList();
  },

  editNameForm: function () {
    event.preventDefault();
    this.$name = $('.name');
    this.$edit = $('<form class="edit-name-form form-inline h1">')
      .append('<input class="form-control" name="user[name]" value="'+this.model.get('name')+'">');
    this.$edit.append('<button type="submit" class="btn btn-primary">Edit</button>')
    this.$name.replaceWith(this.$edit);
  },

  uploadPicture: function () {

    filepicker.setKey('ATkVBrDeT9Cx6oytknKgHz');
    filepicker.pick(
      function(Blob){
        console.log(Blob.url);
      }
    );
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

  addShelvesList: function () {
    var showsListView = new GoodShows.Views.ShelfList({
      collection: this.model.showShelves(),
      user: this.model
    });

    this.addSubview('.shelves-list', showsListView);
  }
});