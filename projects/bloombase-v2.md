# Bloombase — Project Copy (v2)

## Summary

**Bloombase** is a web app for exploring iNaturalist plant observations on an interactive map. Users rate bloom density, leave field notes others can see, and filter the map by species interests.

## Motivation

We wanted one place to interact with iNaturalist data—not just view it, but add ratings, persistent field notes, and species-based filters. That meant bridging iNaturalist’s API with a custom app that stores user-generated content and keeps the map fast at scale.

## Contributions

Team project (BloomBase183). I worked on backend and data: Py4Web app structure, database design (observations, field notes, interests, density ratings), iNaturalist API integration for fetching and syncing, bounds-based map queries, and wiring the Vue frontend to the backend APIs.

## Stack

- **Backend:** Py4Web, MySQL  
- **Frontend:** Vue.js, Bulma CSS, custom CSS  
- **APIs:** iNaturalist (observations), Google Maps (map + markers)  
- **Other:** Marker clusterer, email-only auth (demo: link in console)

## Challenge & approach

**Problem:** The main map had to show many observations without loading everything or slowing the UI.  
**Approach:** Query the backend only for observations inside the current map bounds (using Google Maps resize/bounds events). Use a marker clusterer so zoomed-out views show clusters instead of thousands of markers. That kept load and render time manageable.

## Highlights

- **Bounds-based map** — Load only observations in view; cluster markers when zoomed out.  
- **Bloom density & field notes** — Users rate observations (stored and averaged) and attach field notes visible to others.  
- **Species interests** — Add species to interests; filter the map by them. Search by common or scientific name against the current DB.  
- **Multiple map views** — Main map, profile field-notes map, and smaller maps in observation/species modals, each tuned (e.g., no clustering on the profile map).

---

*V2 project copy. Original: [bloombase.md](bloombase.md).*
