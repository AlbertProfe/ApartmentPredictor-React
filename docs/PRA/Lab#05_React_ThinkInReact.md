# Lab#05: Think in React, Forum Thread

## Summary

Forum Thread / Discussion Preview Row Variants


References

- [React Principles](/reactjs/reactjs-what-principles.qmd)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Adding Interactivity](https://react.dev/learn/adding-interactivity)
- [Managing state](https://react.dev/learn/managing-state)

## Practice variants

### Variant 12 – Reddit-style Thread Preview Row

**Visual goal per row:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ 187   ▲   r/czech                                                   │
│ Best hidden bars in Prague right now?                               │
│ u/travelbug2025 • 4h ago • 42 comments • [Save] [Hide] [Report]     │
└─────────────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static JSX.

2. Props: upvotes, subreddit, title, author, timeAgo, commentCount.

3. Three actions (Save / Hide / Report) → three alerts with title.

4. Named handlers.

5. `useState` for: `saved` boolean + `hidden` boolean  
   → Save toggles heart/filled, Hide makes row semi-transparent + shows "Hidden – Unhide?" button

6. Composition: `SubredditFeed` parent with 5 threads.



### Variant 13 – Stack Overflow / Dev Forum Question Row

**Visual goal per row:**

```
┌───────────────────────────────────────────────────────────────┐
│ [15]  [React] useState not updating on second render?         │
│ asked by dev_guru • 2 days ago • 3 answers • 1.2k views       │
│ tags: react hooks debugging                                   │
│ [Follow]  [Save]  [Share]                                     │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static.

2. Props: voteCount, title, author, timeAgo, answerCount, viewCount, tags (array).

3. Three actions → alerts with title.

4. Named functions.

5. `useState` boolean `following`  
   → "Follow" toggles → changes button to "Following ✓" + green style

6. Composition: `ReactQuestions` parent with 4–6 rows.



### Variant 14 – Indie Hacker / Product Hunt Launch Thread Preview

**Visual goal per row:**

```
┌───────────────────────────────────────────────────────────────┐
│ 🚀  Notion Template Marketplace – launched today!            │
│ +89 upvotes   12 comments   by @sideprojectguy               │
│ "Sell & discover beautiful Notion templates"                  │
│ [Upvote ▲]  [Comment]  [Save]  [Visit product]               │
└───────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static.

2. Props: title, upvotes, commentsCount, author, tagline, productUrl.

3. Four actions → alerts.

4. Named handlers.

5. `useState` number `localUpvotes` (starts from prop)  
   → "Upvote" button increases by 1 (local only) + disables after one click

6. Composition: `TodayLaunches` parent with 5 entries.



### Variant 15 – Classic Forum Thread Row (phpBB / vBulletin style)

**Visual goal per row:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ [NEW]  Where to buy good second-hand vinyl in Prague?               │
│ Last post by vinylhunter • Today 11:42   18 replies   1.1k views    │
│ Started by jazzfan88 • Feb 20, 2026                                 │
│ [Watch thread]  [Bookmark]                                          │
└─────────────────────────────────────────────────────────────────────┘
```

**Phases:**

1. Static.

2. Props: title, lastPoster, lastPostTime, replyCount, viewCount, starter, startDate, hasNew (boolean).

3. Two actions → alerts with title.

4. Named functions.

5. `useState` boolean `watched`  
   → "Watch thread" toggles → shows eye icon filled + "Watching" text

6. Composition: `MusicForum` or `CityDiscussions` parent with 4–6 threads.
