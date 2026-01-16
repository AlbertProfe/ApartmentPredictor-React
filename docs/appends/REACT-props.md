# Props types

| #   | Prop Type                  | Example from Gallery to Profile                           | Notes / Common Use Case                                   |
| --- | -------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| 1   | String                     | `name="Katie"`                                            | Names, titles, labels, classes                            |
| 2   | Number                     | `age={56}`   or   `priority={3}`                          | Ages, counts, sizes, ratings, quantities                  |
| 3   | Boolean                    | `isVip={true}`   or   `highlighted` (shorthand)           | Flags, toggles, states (true/false)                       |
| 4   | Object                     | `person={{ name: "Katie", age: 56, city: "Girona" }}`     | Complex data, configuration objects                       |
| 5   | Array                      | `awards={["Nobel", "Medal", "Honorary doctorate"]}`       | Lists, tags, multiple values                              |
| 6   | Function (callback)        | `onClick={handleClick}`   or   `updateScore={addPoint}`   | Event handlers, callbacks, setters                        |
| 7   | React Element / JSX        | `icon={<StarIcon />}`   or   `extra={<Badge>New</Badge>}` | Icons, badges, custom labels, slots-like content          |
| 8   | Component / Component Type | `Renderer={FancyProfile}`                                 | Render props pattern, dynamic component injection         |
| 9   | null / undefined           | `photo={null}`                                            | Optional values, intentional "no value"                   |
| 10  | React Node                 | `children={<p>Bio text here</p>}` (via children prop)     | Very common — content passed between opening/closing tags |

## Example

```jsx
<Profile 
 name="Katie" // string
 age={56} // number
 isVip={true} // boolean
 role="Mathematician" // string
 awards={["Presidential Medal", "Brilliant physicist"]} // array
 details={{ city: "Girona", active: true }} // object
 onSelect={handleProfileClick} // function
 icon={<Star className="text-gold" />} // JSX element
>

<p>Contributor to Apollo program</p>   {/* children */}
</Profile>
```

### Why do we write strings **without** quotes in some places in JSX?

```jsx
<Profile name="Katie" age={56} isVip={true} />
```

```jsx
// These two lines mean **exactly the same thing** in JSX:
name="Katie"          ← string literal → uses double quotes
name={'Katie'}        ← JavaScript expression → also correct (but almost nobody writes it this way)
```

The short & practical rule (2025–2026 style)

| Situation                                  | Syntax you should use                                                           | Why?                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Normal static string                       | `name="Katie"`                                                                  | Most common, cleanest, what everyone expects                                                                        |
| You need a **JavaScript value/expression** | `age={56}`<br>`role={"Admin"}`<br>`className={condition ? "active" : "hidden"}` | Anything inside `{}` is **pure JavaScript** → numbers, booleans, variables, calculations, ternary, objects, arrays… |
| You want to be super explicit (rare)       | `name={'Katie'}`                                                                | Technically correct, but ugly and unnecessary for simple strings                                                    |

### Quick cheat sheet – what really happens in JSX

```jsx
<Profile
  name="Katie"                    // → string "Katie"
  name={'Katie'}                  // → also string "Katie" (JS expression)
  age={56}                        // → number 56
  isVip={true}                    // → boolean true
  isVip                           // → boolean true (shorthand – very common!)
  maxCapacity={1200}              // → number
  tags={["VIP", "Staff"]}         // → array
  config={{ theme: "dark" }}      // → object
  onClick={handleClick}           // → function reference
  photo={null}                    // → null (no photo)
  extra={<StarIcon />}            // → JSX element (very powerful!)
/>
```

### Summary

- Use **double quotes** `"..."` → for **normal strings** (99% of cases)  
- Use **curly braces** `{...}` → when the value is **not** a plain string  
  (numbers, booleans, variables, calculations, objects, arrays, functions, JSX, `null`, etc.)

So when you see:

```jsx
name="Katie"     ← correct & beautiful
age={56}         ← correct & necessary
```
