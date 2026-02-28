# Lab#04: Think in React, Real-state

## Summary

Real Estate Listing Row Variants

References

- [React Principles](/reactjs/reactjs-what-principles.qmd)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [Managing state](https://react.dev/learn/managing-state)

## Practice variants

### Variant 9 – Property Listing Card (classic grid/card view)

**Visual goal per card:**

```
┌───────────────────────────────────────────────────────────────┐
│ [main photo]                                                  │
│ 3 Bed • 2 Bath • 1,450 sqft                                   │
│ Modern Apartment - Downtown Prague                            │
│ €385,000 • For Sale                                           │
│ ★★★★☆ (42)   [Favorite ♥]  [Contact agent]  [Schedule tour]   │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static JSX — one hardcoded property card.

2. Props: beds, baths, sqft, title, price, status (Sale/Rent), rating, ratingCount, imageUrl.

3. Three actions (Favorite / Contact / Schedule) → three alerts with title + action.

4. Named handlers.

5. `useState` boolean `favorited` — toggle heart, change icon/style when true; optional small “Saved” indicator.

6. Composition: `FeaturedProperties` parent renders 4–5 different listings.

### Variant 10 – Rental Listing Row (list view, more compact)

**Visual goal per row:**

```
┌───────────────────────────────────────────────────────────────────────┐
│ [photo]  Cozy Studio near Charles Bridge   €1,290/mo   Available Now  │
│ 1 Bed • 1 Bath • 520 sqft • Pets: No   8 min walk to metro            │
│ [Quick apply]  [Save]  [Message landlord]  [View map]                 │
└───────────────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static — one row.

2. Props: title, pricePerMonth, availability, beds, baths, sqft, petsAllowed (yes/no), distanceToTransit.

3. Four actions → four alerts including title.

4. Named functions.

5. `useState` boolean `saved` + string `applicationStatus` ("none" | "applied" | "pending")  
   → "Quick apply" changes status to "applied" and disables button / shows "Applied ✓"

6. Composition: `ApartmentsForRent` parent with 5 rows.

### Variant 11 – Open House / Viewing Event Card

**Visual goal per card:**

```
┌───────────────────────────────────────────────────────────────┐
│ Open House This Saturday                                      │
│ Luxury Villa with Pool – Prague 6                             │
│ 5 Beds • 4 Baths • 3,200 sqft   €890,000                      │
│ Date: Mar 15, 2026  14:00–16:00                               │
│ [RSVP]  [Add to calendar]  [Save listing]  [Contact agent]    │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static version.

2. Props: eventDateTime, title, beds, baths, sqft, price, addressArea.

3. Four actions → alerts with title + event info.

4. Named handlers.

5. `useState` boolean `rsvpConfirmed`  
   → "RSVP" button toggles → changes to "RSVP’d ✓" + different style

6. Composition: `UpcomingViewings` parent with 3–4 events.
