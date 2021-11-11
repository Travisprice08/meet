# Meet-App

![meet](/Meet.png)

## Description

Meet App is a serverless, progressive web application that uses the [Google Calendar API](https://developers.google.com/calendar) to fetch upcoming events. The app is built with React using a test-driven development (TDD) approach. The serverless function is hosted by AWS.

The app alows user to search for a city and get a list of events hosted in that city. The user can view charts that display how many events will take place in that city on upcoming days as well as view the popularity of event genres in the form of a pie chart.

## Quick Start 🚀

The app can be viewed [here](https://paulinemarg.github.io/meet-app/).
To run it locally yourself, clone the repository, and complete the following steps:

### Install dependencies

```bash
npm install
```

### Start application with npm and run in browser

_By default the app will run a local server on port: 3000_

```bash
npm run start
```

### Running application tests

```bash
npm run test
```

---


a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

FEATURE 1: As a user, I should be able to filter events by city.
Scenario 1: When a user has not specified a location, show all upcoming events from all cities.
Given that the user has not specified a location
 	When the application has been opened
	Then a list of all events across all cities should be displayed
Scenario 2: The user should see a list of suggestions as they search for a city.
Given the Home page is open
 	When the user begins to type in the search box
	Then a list of cities should begin to appear based on what they have typed
Scenario 3: The user can select from the list given in the suggested list
Given that the user has began to type in the search box
 	When cities begin to display based on what the user is typing
	Then the user should be able to select from the list provided

FEATURE 2 : As a user, I should be able to SHOW/HIDE details of any event.
Scenario 1: The information container is collapsed by default
Given that the user is at the home page
 	When the user selects an event
	Then then the event information should default to collapsed
Scenario 2: The user should be able to open an expanded view of event details
Given there is a list of events displayed
 	When the user selects an event to view
	Then the expanded view of event details should be displayed
Scenario 3: The user should be able to collapse the expanded detail view
Given that the user is viewing the expanded detail view
 	When the user clicks on “show less” 
	Then the expanded view should minimize
FEATURE 3 : As a user, I should be able to choose how many events are displayed at a time.
Scenario 1: When the number of events displayed has not been displayed
Given that the application is open
 	When the user views upcoming events
	Then then the list of events should default to 12 per page
Scenario 2: The user should be able to change the max number of events displayed on a page
Given that the application is open
 	When the user changes max number of events listed
	Then the list of events displayed should change based on the  max number chosen

FEATURE 4 : As a user, I should be able to view previously viewed events while offline
Scenario 1: When using application while offline
Given there is no internet connection available
 	When the user wants to view information to events last viewed
	Then the user should be able to see information from data in the cache
Scenario 2: The user attempts to create new search criteria
Given that there is no internet connection available
 	When the user attempts to change search criteria
	Then the application should display a connection error message
FEATURE 5 : As a user, I should be able to see data on activities from a specific city
Scenario 1: Display a graph of upcoming events per city
Given that the user is searching for events
 	When the user wants to see how much activity a city see’s
	Then display a graph that indicates all upcoming events
