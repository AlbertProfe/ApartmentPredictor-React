# Lab#03: Think in React, eCommerce

## Summary

Here are **3 new variants** inspired by patterns that appear very frequently in large e-commerce / marketplace / classifieds / delivery / gig-economy apps (Amazon, eBay, Etsy, Mercado Libre, DoorDash, Uber Eats, Wallapop, Facebook Marketplace, etc.).

All of them follow the same<mark> fundamental React pattern</mark> :

- one focused “row / card / entry / tile” component: <mark>the painting component</mark>
- usually 2–4 interactive elements (buttons, toggles, counters…) per instance: **triggers**
- incremental phases: pseudocode → static (hardcoded) → props → events → named handlers → local state → composition with multiple hard-coded siblings

**References**

- [React Principles](/reactjs/reactjs-what-principles.qmd)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [Managing state](https://react.dev/learn/managing-state)

## Practice variants

### Variant 6 – “Order History Item” (inspired by Amazon / eBay / Shopify “Your Orders”)

**Visual goal per row:**

```
┌───────────────────────────────────────────────────────────────┐
│ Order #37492        Mar 12, 2025   Delivered                  │
│ Wireless Earbuds    $39.99                                    │
│ 1 item • Total: $44.98                                        │
│ [View order details]  [Buy again]  [Return / Replace]         │
└───────────────────────────────────────────────────────────────┘
```

**Phases to implement step-by-step:**

1. Static JSX — one hard-coded order row with all texts and three buttons.

2. Props: orderId, date, status, productName, price, itemCount, totalPrice.

3. Three onClick → three different alerts showing orderId + action type (“Viewing details of #37492”, “Re-adding to cart…”, “Starting return process…”).

4. Move the three handlers to named functions.

5. Add local `useState` boolean `archived`  
   → clicking a fourth button “Archive” toggles it  
   → when archived = true → row gets different background + “Archived” badge appears + the three action buttons become disabled / hidden

6. Composition: Create `OrderHistory` parent component that renders **four** different `<OrderHistoryItem />` entries.

### Variant 7 – “Gig / Service Listing Card” (inspired by Fiverr / Upwork / TaskRabbit / local services marketplaces)

**Visual goal per card:**

```
┌───────────────────────────────────────────────────────────────┐
│ Logo / Avatar      Logo Design – Professional & Fast          │
│ ★★★★☆  4.8  (231)    $45 – $180                               │
│ Delivery: 3 days     [View profile]  [Contact]  [Add to fav]  │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static version — one hardcoded gig card (title, rating, reviews count, price range, delivery time, four action elements).

2. Props: title, rating, reviewCount, priceMin, priceMax, deliveryDays, sellerName.

3. Four actions → four different alerts including title or sellerName (“Opening seller profile…”, “Starting message to seller…”, “Added Logo Design to favorites”).

4. Extract named handler functions.

5. Add `useState` boolean `favorited`  
   → toggle on “Add to fav” / heart click  
   → heart becomes filled + color changes when true  
   → optional: show small “Saved” toast-like text for 2 seconds (can be just another state string shown conditionally)

6. Composition: `RecommendedGigs` or `MyFavorites` parent that renders **five** different gig/service cards.

### Variant 8 – “Food / Meal Item in Restaurant Menu or Cart Preview” (DoorDash, Uber Eats, Glovo, iFood, Rappi style)

**Visual goal per row:**

```
┌───────────────────────────────────────────────────────────────┐
│ [photo]   Margherita Pizza                                    │
│ $12.90   × 2        $25.80                                    │
│ No onions, extra cheese                                       │
│ [−]  2  [+]    [Edit]    [Remove]                             │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static JSX — one hardcoded menu/cart item row with photo placeholder, name, price, quantity, custom note, quantity controls and two action buttons.

2. Props: name, unitPrice, quantity, notes, imageUrl.

3. onClick for: − / + / Edit / Remove  
   → four different alerts showing name + action (“Decreasing quantity…”, “Editing Margherita Pizza”, “Removed from cart”).

4. Named handler functions for all four actions.

5. Two pieces of local state:  
   
   - `localQuantity` number (starts from prop quantity, min 1)  
   - `beingEdited` boolean  
     → − / + buttons change localQuantity (update display)  
     → Edit button toggles beingEdited → when true, show `<input type="text" />` instead of the notes text so user can change it (fake edit, no real save needed)

6. Composition: `CartPreview` or `MenuSection` parent that renders **three to five** different food items.
