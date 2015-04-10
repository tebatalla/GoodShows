GoodShows.Models.Show = Backbone.Model.extend({
  urlRoot: '/api/shows/',

  removeFromShelf: function(options) {
    return $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: 'api/show_shelvings/' + this.get('shelving_id'),
        success: options.success
    });
  },

  removeFromAllShelves: function (options) {
    return $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: 'api/remove_show_from_all_shelves',
        data: {
          "show_id": this.id
        },
        success: options.success
    });
  }
});