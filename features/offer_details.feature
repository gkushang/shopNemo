Feature: Offers Details

  As a merchant
  I want to create affiliate and CLO offers
  So that I can see them in PayPal Shop


  @affiliate_details_tile
  Scenario: Offer Details on tile should match with Affiliate Offer

    Given an Affiliate Offer is in Shop
    When I ask to see Affiliate Offer tile
    Then I see Affiliate offer information on tile