# GoodShows

[Heroku link][heroku]

[heroku]: http://www.goodshows.io

## Minimum Viable Product
GoodShows is a clone of Goodreads, but for TV shows. It is built on Backbone and Ruby on Rails. Users can:


- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create TV Show shelves
- [ ] Add TV Shows to shelves
- [ ] Search for TV Shows by title
- [ ] View TV Show Information
- [ ] Add friends
- [ ] Rate and review TV shows
- [ ] Comment on reviews
- [ ] View a feed of activity from friends and of each friend specifically
- [ ] Update progress on TV show currently being watched

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, TV Show Shelves (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create shelves where they can add TV shows (e.g., want to watch, watched, favorites, etc.). The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing TV Shows and Adding them to shelves (~2 days)
I will add API routes to serve TV show data as JSON, then add Backbone
models and collections that fetch data from those routes. TV Show information
will be available via [themoviedb](http://docs.themoviedb.apiary.io/#). I will use `Paperclip` to store TV Show images. By the end of this
phase, users will be able to create shelves, search for TV shows and add them to their shelves, all
inside a single Backbone app.

[Details][phase-two]

### Phase 3: Add friends, Improve User Profile (~2 days)
I plan to add functionality so that users can add friends. In addition, the user profile page will be expanded so that you can view a user's friends, TV Show shelves and TV show reviews. I also plan to integrate Filepicker for file upload so users can add profile pictures to their profile pages.

[Details][phase-three]

### Phase 4: Rate and Review TV Shows (~1-2 days)
I will add a rating system for TV Shows, whereby users can rate and also review TV Shows.
Reviews will be able to be commented on by friends.

[Details][phase-four]

### Phase 5: User activity feed, home feed (~2 days)
I will add a feed to a user's profile page, indicating activity on the site (e.g. adding a show to a shelf, becoming friends with someone, rating a show). I will also add a feed from that user's friends as the home page item with infinite scrolling. I will use the Wisper gem to architect a Pub Sub design pattern for changes in the database.

[Details][phase-five]

### Phase 6: Update progress on currently watching TV Show (~1 day)
I will add form to a user's page where they can indicate a show they are currently watching and update the percentage watched.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Expanded TV show page, with extensive information on seasons, episodes and actors
- [ ] Progress update is checklist, user checks off which episodes they've seen to figure out percentage
- [ ] Search TV shows by genre, actor, etc.
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md

