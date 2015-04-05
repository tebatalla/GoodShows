# Phase 4: Rate and Review TV Shows

## Rails
### Models
* Review
* Comment

### Controllers
* Api::ReviewsController (create, update, destroy, show, index)
* Api::CommentsController (create, update, destroy, show)

### Views
* reviews/index.json.jbuilder
* reviews/show.json.jbuilder
* comments/show.json.jbuilder

## Backbone
### Models
* Review
* Comment

### Collections
* Reviews
* Comments

### Views
* ReviewsIndex
* ReviewsIndexItem
* ReviewsShow (composite view, holds commentsshow)
* CommentsShow

## Gems/Libraries
* Markdown-js
* Bootstrap Markdown