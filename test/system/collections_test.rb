require "application_system_test_case"

class CollectionsTest < ApplicationSystemTestCase
  setup do
    @collection = collections(:one)
  end

  test "visiting the index" do
    visit collections_url
    assert_selector "h1", text: "Collections"
  end

  test "creating a Collection" do
    visit collections_url
    click_on "New Collection"

    fill_in "Brand", with: @collection.brand
    fill_in "Category", with: @collection.category
    fill_in "Item", with: @collection.item_id
    fill_in "Name", with: @collection.name
    fill_in "Total", with: @collection.total
    fill_in "User", with: @collection.user_id
    click_on "Create Collection"

    assert_text "Collection was successfully created"
    click_on "Back"
  end

  test "updating a Collection" do
    visit collections_url
    click_on "Edit", match: :first

    fill_in "Brand", with: @collection.brand
    fill_in "Category", with: @collection.category
    fill_in "Item", with: @collection.item_id
    fill_in "Name", with: @collection.name
    fill_in "Total", with: @collection.total
    fill_in "User", with: @collection.user_id
    click_on "Update Collection"

    assert_text "Collection was successfully updated"
    click_on "Back"
  end

  test "destroying a Collection" do
    visit collections_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Collection was successfully destroyed"
  end
end
