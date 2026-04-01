# Style Guide

## Formatting

All formatting is handled by [Prettier](https://prettier.io/). Do not manually adjust whitespace, indentation, or quote style — run the formatter before committing instead.

```bash
npm run format   # format index.html in place
npm run check    # verify formatting without writing changes
```

Configuration lives in `.prettierrc`. Editor integration is defined in `.editorconfig`.

---

## CSS conventions

### Custom properties

- Named in `--kebab-case`
- Declared on `:root` so they are globally available
- Grouped by category in this order: colors, borders/radii, transitions, typography, layout

Example from the current `:root` block:

```css
:root {
  /* Colors */
  --bg-base: #0d0d0d;
  --accent: #3dd68c;

  /* Borders & radii */
  --radius-sm: 6px;

  /* Transitions */
  --transition: 150ms ease;

  /* Typography */
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  /* Layout */
  --max-width: 860px;
}
```

---

## Section comments

CSS sections are delimited by banner comments. Use this exact pattern — do not abbreviate or alter the character count:

```css
/* =====================================================
   SECTION NAME
===================================================== */
```

The existing sections in order are: `RESET & BASE`, `LAYOUT UTILITIES`, `HERO SECTION`, `NAV`, etc. Add new sections in the same style and place them in a logical reading order.

---

## HTML structure

This is a single-file static site. All markup, styles, and scripts live in `index.html`:

- **CSS** — inline in a `<style>` block inside `<head>`
- **JavaScript** — inline in a `<script>` block placed immediately before `</body>`
- **Analytics** — a separate `<script>` tag for GoatCounter follows the main script, also before `</body>`

Do not introduce external `.css` or `.js` files unless there is a clear performance or maintenance reason and the change is discussed first.

---

## How to run the formatter

1. Install dependencies once: `npm install`
2. Format: `npm run format`
3. Verify CI will pass: `npm run check`
