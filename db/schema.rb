# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150413161047) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friend_requests", force: :cascade do |t|
    t.integer  "requester_id", null: false
    t.integer  "target_id",    null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "friend_requests", ["requester_id", "target_id"], name: "index_friend_requests_on_requester_id_and_target_id", unique: true, using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "friendships", ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true, using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "show_id",    null: false
    t.integer  "rating",     null: false
    t.text     "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reviews", ["author_id", "show_id"], name: "index_reviews_on_author_id_and_show_id", unique: true, using: :btree
  add_index "reviews", ["author_id"], name: "index_reviews_on_author_id", using: :btree
  add_index "reviews", ["show_id"], name: "index_reviews_on_show_id", using: :btree

  create_table "show_shelves", force: :cascade do |t|
    t.integer  "owner_id",   null: false
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "show_shelves", ["owner_id"], name: "index_show_shelves_on_owner_id", using: :btree

  create_table "show_shelvings", force: :cascade do |t|
    t.integer  "shelf_id"
    t.integer  "show_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "show_shelvings", ["shelf_id", "show_id"], name: "index_show_shelvings_on_shelf_id_and_show_id", unique: true, using: :btree

  create_table "shows", force: :cascade do |t|
    t.string   "name",               null: false
    t.text     "overview"
    t.string   "poster_path"
    t.string   "genres"
    t.string   "episode_run_time"
    t.string   "homepage"
    t.integer  "number_of_episodes"
    t.integer  "number_of_seasons"
    t.string   "networks"
    t.date     "last_air_date"
    t.boolean  "in_production"
    t.date     "first_air_date"
    t.string   "created_by"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                                                                               null: false
    t.string   "password_digest",                                                                     null: false
    t.string   "session_token",                                                                       null: false
    t.datetime "created_at",                                                                          null: false
    t.datetime "updated_at",                                                                          null: false
    t.string   "name",            default: "User",                                                    null: false
    t.string   "file_url",        default: "https://www.filepicker.io/api/file/uI0gnDYKTO2cMbhpKjus", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
