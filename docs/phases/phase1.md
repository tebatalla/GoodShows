# Phase 1: User Authentication, TV Show Shelves

## Rails
### Models
* User
* ShowShelf

### Controllers
* UsersController (create, new, show)
* SessionsController (create, new, destroy)
* Api::ShelvesController (create, show, destroy, update)

### Views
* users/new.html.erb
* users/show.json.jbuilder
* session/new.html.erb
* show_shelves/show.json.jbuilder

## Backbone
### Models
* User
* ShowShelf

### Collections
* ShowShelves
* Users

### Views
* ShowShelfShow
* ShowShelfForm
* ShowShelfIndexItem
* UserShow

## Gems/Libraries
