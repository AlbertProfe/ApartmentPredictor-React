# Reload Button + Hook: New Refresh Feature

# 

## Summary

> Clicking "Reload" fetches fresh apartment data from the API without page refresh.
> 
> The view shouldn't know *how* to fetch data - it just triggers refresh. The hook handles the complexity.

## **How it works**

**1. Hook manages reload counter**

```jsx
const [reload, setReload] = useState(0);  // Counter: 0 → 1 → 2...

useEffect(..., [reload]);  // Refires when reload changes
```

**2. Button triggers counter bump**

```jsx
const handlereload = () => setReload(prev => prev + 1);  // 0→1
// useEffect sees [^1], refetches data
```

**3. Props flow: Container → View**

```
Hook: {reload: 1, setReload: fn} 
  ↓ passes to
View: receives setReload, calls on button click
```

### **Key insight**

- **View stays dumb**: Only calls `setReload()`, doesn't fetch
- **Hook stays smart**: Listens to `reload` changes, refetches
- **`prev + 1`**: Functional update ensures latest value
- **No infinite loop**: `useEffect` only runs when `reload` changes

**Result**: Clean separation - button says "refresh me", hook figures out how. Reusable anywhere.
