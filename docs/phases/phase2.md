# Phase 2: Viewing TV Shows and Adding them to shelves

## Rails
### Models
* Show

### Controllers
* Api::ShowsController (show, search) *Use api call to third party to create show resources*

### Views
* shows/show.json.jbuilder

## Backbone
### Models
* Show

### Collections
* Shows

### Views
* ShowShow
* ShowSearchResults (composite view, contains ShowSearchResultsItem)

## Gems/Libraries
* Restclient?
* Paperclip or Filepicker