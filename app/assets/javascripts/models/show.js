GoodShows.Models.Show = Backbone.Model.extend({
  urlRoot: '/shows/',

  removeFromShelf: function(options) {
    return $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: 'show_shelvings/' + this.get('shelving_id'),
        success: options.success
    });
  },

  removeFromAllShelves: function (options) {
    debugger
    return $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: 'remove_show_from_all_shelves',
        data: {
          "show_id": this.id
        },
        success: options.success
    });
  }
});