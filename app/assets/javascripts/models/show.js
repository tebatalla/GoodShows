GoodShows.Models.Show = Backbone.Model.extend({
  urlRoot: '/shows/',
  removeFromShelf: function(options) {
    return $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: 'show_shelvings/' + this.get('shelving_id'),
        success: options.success
    });
  }
});