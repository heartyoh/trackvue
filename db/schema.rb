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

ActiveRecord::Schema.define(version: 20141224041250) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.integer  "driver_id"
    t.datetime "alert_time"
    t.string   "alert_type"
    t.string   "severity"
    t.string   "value"
    t.float    "lat"
    t.float    "lng"
    t.string   "front_img_url"
    t.string   "rear_img_url"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "alerts", ["driver_id", "alert_time"], name: "idx_alerts_0", unique: true, using: :btree
  add_index "alerts", ["driver_id"], name: "index_alerts_on_driver_id", using: :btree

  create_table "attachments", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "description"
    t.string   "mimetype"
    t.integer  "file_size"
    t.string   "path"
    t.integer  "on_id"
    t.string   "on_type"
    t.string   "tag"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "attachments", ["on_type", "on_id", "tag", "name"], name: "idx_attach_0", unique: true, using: :btree

  create_table "drivers", force: :cascade do |t|
    t.string   "lastname"
    t.string   "firstname"
    t.string   "email"
    t.string   "home"
    t.integer  "group_id"
    t.string   "vehicle_name"
    t.string   "car_model"
    t.float    "speed_slow"
    t.float    "speed_normal"
    t.float    "speed_fast"
    t.string   "vehicle_img_url"
    t.string   "driver_img_url"
    t.float    "lat"
    t.float    "lng"
    t.text     "address"
    t.string   "status"
    t.integer  "speed"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.text     "address"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tracks", force: :cascade do |t|
    t.integer  "driver_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "elapsed"
    t.integer  "speed"
    t.integer  "speed_max"
    t.integer  "speed_avg"
    t.float    "from_lat"
    t.float    "from_lng"
    t.float    "to_lat"
    t.float    "to_lng"
    t.string   "distance"
    t.string   "status"
    t.integer  "count_off"
    t.integer  "count_idle"
    t.integer  "count_slow"
    t.integer  "count_normal"
    t.integer  "count_fast"
    t.integer  "count_speeding"
    t.string   "front_img_url"
    t.string   "rear_img_url"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["driver_id", "start_time", "end_time"], name: "idx_tracks_0", unique: true, using: :btree

  create_table "trips", force: :cascade do |t|
    t.integer  "driver_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "elapsed"
    t.integer  "speed_max"
    t.integer  "speed_avg"
    t.float    "from_lat"
    t.float    "from_lng"
    t.float    "to_lat"
    t.float    "to_lng"
    t.string   "distance"
    t.string   "status"
    t.integer  "count_off"
    t.integer  "count_idle"
    t.integer  "count_slow"
    t.integer  "count_normal"
    t.integer  "count_fast"
    t.integer  "count_speeding"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "trips", ["driver_id", "start_time"], name: "idx_trips_0", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "creator_id"
    t.integer  "updater_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
