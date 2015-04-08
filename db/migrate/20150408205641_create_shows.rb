class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :name, null: false
      t.text :overview
      t.string :poster_path
      t.string :genres
      t.string :episode_run_time
      t.string :homepage
      t.integer :number_of_episodes
      t.integer :number_of_seasons
      t.string :networks
      t.date :last_air_date
      t.boolean :in_production
      t.date :first_air_date
      t.string :created_by
      
      t.timestamps null: false
    end
  end
end
