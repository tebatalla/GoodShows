# Schema Information

## show_shelves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null

## shows
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
in_production      | boolean   | not null
name               | string    | not null
number_of_episodes | integer   | not null
number_of_seasons  | integer   | not null
overview           | text      |
poster             | attachment|

## show_shelvings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
shelf_id    | integer   | not null, foreign key (references show_shelves)
show_id     | integer   | not null, foreign key (references shows)
watching    | boolean   | not null
progress    | integer   |

## friend_requests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
proposer_id | integer   | not null, foreign key (references users)
target_id   | integer   | not null, foreign key (references users)

## friendships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
friend_id   | integer   | not null, foreign key (references users)

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
show_id     | integer   | not null, foreign key (references shows)
rating      | integer   | not null
review      | text      |

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references users)
commentable_id  | integer   | not null
commentable_type| string    | not null
body            | text      | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

