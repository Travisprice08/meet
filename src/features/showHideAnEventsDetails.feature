Feature: Show/Hide event details

Scenario: Event element is collapsed by default
Given user hasn’t expanded event for details
When the user opens the app
Then the user should see the list of all events without details

Scenario: User can expand event to see details
Given the main page is open
When the user clicked on a expand details button for a specific event
Then the user should see details for this event

Scenario: User can collapse element to hide event details
Given the details for the event was expanded
When the user clicks on the collapse button
Then the event details should be hidden
