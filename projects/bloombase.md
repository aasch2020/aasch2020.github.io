# Bloombase Project

**Mar 2023 — June 2023** | University of California Santa Cruz

## Overview

Built a web app integrating the iNaturalist API, Py4Web backend, and Google Maps front-end.

GENERATED: The goal of this project is to create a way for users to interact with and leave notes on observations grabbed from the iNaturalist database of plant observations. The available user features include being able to rate observations based on bloom density, to leave field notes on blooms which can be viewed by other users, and add interests which allow users to filter which points are displayed on the map at that time.

## Technologies

- Py4Web framework
- iNaturalist API
- Google Maps API
- Web development (frontend and backend)
- Database design
GENERATED: - MySQL database and Py4Web backend; Vue.js front end with Bulma CSS and custom CSS styling
GENERATED: - Google Maps API for dynamic maps with points; iNaturalist API to fetch observations

## Key Accomplishments

- Integrated third-party iNaturalist API for biodiversity data
- Developed Py4Web backend for data processing and storage
- Built Google Maps-based frontend for geospatial visualization
GENERATED: - User rating of observations by bloom density; field notes viewable by other users; interest-based filtering of map points

## Database Layout

GENERATED: The project consists of six tables: **Observations** (information about observations), **Field notes** (notes related to observations), **Users** (user data), **Liked** (user likes on observations), **Interests** (user interests), **Observation densities** (observation density ratings). All tables except Users are associated with observations. Likes and observation densities are removed when old observations are dropped; interests and field notes persist when observations are deleted, as they contain user-specific data.

## Maps API Usage

GENERATED: The project uses four map instances: **(1) Main Observation Map**—displays all observations, marker clusterer for performance, resize listener to query points within bounds, interest-based filters, user location prompted on init for initial bounds. **(2) Field Notes Map**—displays a user’s field notes, loads all points on init (smaller set), no marker clusterer. **(3) Observations Modal Map**—in modal for a single observation, zoomed-out view, no user location prompt, no resize re-query. **(4) Species Modal Map**—in modal for species info, small subset of observations, no user location or resize re-query.

## Authentication

GENERATED: Authentication associates accounts solely with email. Users sign in by providing a valid email; a link is generated and (in production) would be sent to that email; in the demo the link is printed to the console. Following the link signs the user in without a password.

## iNaturalist API

GENERATED: Observations are pulled from the iNaturalist API.

## UI and Pages

GENERATED: **Main page (index):** Primary map with all observations, user interests list, and species search for adding interests; layout via index.js/index.html with Bulma and custom CSS for map resizing. **Observation popup modal:** Shows image, location, and density; users can add or review field notes (stored in DB), review and contribute density ratings (mean of all ratings shown), and see a map of the observation location. **Interest search field:** Queries the DB for species names in current observations (common and scientific name), shows deduplicated list with images from observations; add-interests dialog adds a species to user interests. **Interest search popup modal:** Aggregated view of all observations for a species, smaller map of that species’ observations (clickable to open observation modal); read-only. **Observation Map:** On init prompts for user location and zooms to load observations in view; resize listener queries DB for points in current bounds; marker clusterer groups observations. **Profile page:** User username and their field notes. **Profile page map:** All field notes by that user, all points loaded on init. **Username change:** Users can change display names on the profile page. **Admin page:** Lets admins update observation tables from the API (manual until an async job is set up).

## Current Issues

GENERATED: There is currently not an asynchronous job set up to pull observations from the API every day, so that task must be performed manually by admin users. There is currently not a paid mail service set up with the login; the login link must be accessed from the command line.

## Repository

[BloomBase183/BloomBase](https://github.com/BloomBase183/BloomBase)
