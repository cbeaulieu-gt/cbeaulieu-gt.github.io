# Christopher Beaulieu — Personal Portfolio

Personal portfolio site for Christopher Beaulieu, Senior Software Engineer. Single-page static site hosted on GitHub Pages.

**Live site:** https://christopherbeaulieu.net

---

## Built with

- HTML5
- CSS3 — custom properties, Flexbox, Grid
- Vanilla JavaScript
- GitHub Pages

---

## Running locally

No build step required. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Development

**Prerequisites:** [Node.js](https://nodejs.org/) (any LTS version)

Install dev tools once after cloning:

```bash
npm install
```

Format `index.html` before committing:

```bash
npm run format
```

Verify formatting without writing changes (useful in CI):

```bash
npm run check
```

---

## Customizing

If you want to use this as a template, search `index.html` for `<!-- CUSTOMIZE -->` comments. Each one marks a section with values you should replace — name, title, description, links, project entries, and so on.

---

## Analytics

GoatCounter is integrated for cookie-free, privacy-respecting page view tracking. The dashboard is at [cmbdev.goatcounter.com](https://cmbdev.goatcounter.com). No consent banner is required — GoatCounter does not use cookies or collect personal data.

---

## License

MIT — see [LICENSE](LICENSE).
