require 'test_helper'

class TrackControllerTest < ActionController::TestCase
  test "should get driver:references" do
    get :driver:references
    assert_response :success
  end

  test "should get datetime:date" do
    get :datetime:date
    assert_response :success
  end

  test "should get speed:integer" do
    get :speed:integer
    assert_response :success
  end

  test "should get lng:float" do
    get :lng:float
    assert_response :success
  end

  test "should get lat:float" do
    get :lat:float
    assert_response :success
  end

  test "should get front_img_url:string" do
    get :front_img_url:string
    assert_response :success
  end

  test "should get rear_img_url:string" do
    get :rear_img_url:string
    assert_response :success
  end

  test "should get status:string" do
    get :status:string
    assert_response :success
  end

end
