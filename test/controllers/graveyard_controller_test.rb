require "test_helper"

class GraveyardControllerTest < ActionDispatch::IntegrationTest
  test "should get game" do
    get graveyard_game_url
    assert_response :success
  end
end
