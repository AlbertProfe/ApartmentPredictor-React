# Lab#02: Think in React Part, Amazon

## Summary

> Here are **5 different variants** of small React mini-practices inspired by common Amazon UI patterns.  

Each one is structured as a basic `React component pattern`:  

- One focused <mark>renderable</mark> "row / card / item" component  
- Several <mark>buttons</mark> / actions per item  
- Incremental phases (static → props → events → handlers → state)  
- Later composition with multiple instances  

References

- [React Principles](/reactjs/reactjs-what-principles.qmd)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [Managing state](https://react.dev/learn/managing-state)

## Practice variants

### Variant 1 – Product Preview Card (like Amazon product grid / recommendation tiles)

**Visual goal per item:**

```
┌───────────────────────────────────────┐
│            [product image]            │
│  Wireless Headphones                  │
│           $49.99                      │
│   [Add to Cart]  ♡  [View details]    │
└───────────────────────────────────────┘
```

**Phases:**

1. Static JSX only — hardcode one product (name, price, fake image placeholder) + the three actions as `<button>` or icon buttons.

2. Make name, price and imageSrc come from props.

3. Add onClick to each of the three buttons — each shows a different alert with the product name (e.g. “Added Wireless Headphones to cart”, “Added to wishlist”, “Going to detail page…”).

4. Move the three handlers into named functions inside the component.

5. Add `useState` boolean `wishlisted`.  
   
   - Link it to the heart ♡ button (toggle + visual change: filled heart / red color when true).  
   - The other two buttons stay simple alerts for now.

6. Composition: Create `ProductRecommendations` parent that renders 4 hard-coded `<ProductPreviewCard />` with different products.

### Variant 2 – Cart Line Item (like Amazon shopping cart row)

**Visual goal per item:**

```
┌────────────────────────────────────────────────────────────────────┐
│ ☐   [small image]   Bose Speaker   $89.00   Qty: [ 1 ▼ ]           │
│                                     [Save for later]  [Delete]     │
└────────────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static version — one hardcoded item with checkbox, image placeholder, name, price, quantity text (fake), two buttons.

2. Props: name, price, initialQty (number).

3. onClick on both buttons → alerts including the item name (“Saved Bose Speaker for later”, “Deleted Bose Speaker”).

4. Extract named handler functions.

5. Add `useState` for two things:  
   
   - `selected` boolean → controls the checkbox  
   - `quantity` number → show current value + two tiny +/- buttons beside it that increment/decrement (min 1)

6. Composition: `ShoppingCart` parent renders 3 different cart items.

### Variant 3 – Customer Review Row (like Amazon per-review block)

**Visual goal per item:**

```
┌───────────────────────────────────────────────────────────────┐
│ ★★★★☆   John D.   2 days ago                                  │
│ Great sound quality!                                          │
│ Was this review helpful?   Yes (12)   No (3)    [Report]      │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static JSX — one hardcoded review (stars as text, name, date, text, helpful count, report link/button).

2. Props: rating (number), reviewerName, date, reviewText, helpfulYesCount, helpfulNoCount.

3. Click “Yes” / “No” / “Report” → three different alerts showing reviewer name + action (“Marked helpful by John D.” etc.).

4. Named handler functions for the three actions.

5. Add `useState` for `userVoted`:  
   
   - null | "yes" | "no"  
   - Clicking Yes/No changes it and increases the corresponding displayed count by 1 (local only)

6. Composition: `RecentReviews` parent shows 3–4 review rows.

### Variant 4 – Wish List Item (Amazon-style wishlist row)

**Visual goal per item:**

```
┌───────────────────────────────────────────────────────────────┐
│ [image]   Echo Dot   $34.99                                   │
│ Added on Mar 12, 2025                                         │
│ [Add to Cart]   [Delete]   [Move to another list ▼]           │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static — one item with image, name, price, added date, three actions.

2. Props: name, price, addedDate, imageSrc.

3. Three onClick alerts with item name.

4. Named handlers.

5. `useState` boolean `inCart` —  
   
   - “Add to Cart” button toggles it + changes button text to “Added ✓” temporarily or permanently  
   - Visual change when true (e.g. green button)

6. Composition: `MyWishlist` parent renders 3–5 items.

### Variant 5 – Address Book Entry (like Amazon address list row)

**Visual goal per item:**

```
┌───────────────────────────────────────────────────────────────┐
│ John Doe                                                      │
│ 123 Main St, Apt 4B                                           │
│ Prague, 110 00   Czech Republic                               │
│ Phone: +420 777 123 456                                       │
│ [Edit]  [Delete]  [Use this address]                          │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static version — one hardcoded address + three buttons.

2. Props: fullName, street, city, zip, country, phone.

3. Three buttons → alerts (“Editing John Doe”, “Deleting…”, “Selected this address for delivery”).

4. Named handler functions.

5. `useState` boolean `isDefault` —  
   
   - Clicking “Use this address” sets it to true  
   - Show “Default” badge / different style when true  
   - (only one can be default per list — but for now just local state per row)

6. Composition: `AddressBook` parent renders 3 different addresses.
