# CEO360 Interactive Prototype

This is the **original CEO360 interactive prototype**, separated into three linked source files for use in Visual Studio Code. The application content, behavior, demo data, and styling have **not** been redesigned or modified; only the original embedded CSS and JavaScript have been extracted.

## Project structure

```text
CEO360_VSCode_Project/
├── index.html       # Original HTML, linking the CSS and JavaScript
├── styles.css       # Original CSS extracted from the HTML <style> tag
├── script.js        # Original JavaScript extracted from the HTML <script> tag
└── README.md        # Setup and project notes
```

## Open in VS Code

1. Extract the ZIP file (if using the ZIP download).
2. In VS Code, select **File > Open Folder** and choose `CEO360_VSCode_Project`.
3. Open `index.html` in a browser. You can also use the VS Code **Live Server** extension and select **Open with Live Server**.
4. Keep `index.html`, `styles.css`, and `script.js` in the same folder so their relative links resolve.

No build process, npm packages, API keys, or server-side setup are required for this standalone prototype.

## File links

The HTML head includes:

```html
<link rel="stylesheet" href="styles.css">
```

The HTML body loads the JavaScript using:

```html
<script src="script.js"></script>
```

## Features preserved

The original navigation, sample tenants, reporting-period selector, dashboard views, interactive sample decision and task controls, scenario functionality, and scripted AI demo are retained. All data is fictional and held in the browser for demonstration; this is not a production SaaS application or a backend-integrated system.

## Editing

- Change page markup in `index.html`.
- Change presentation rules in `styles.css`.
- Change application behavior and demo data in `script.js`.

**Important:** This split intentionally does not refactor, rename, format, or change the underlying application code. It is a file-organization change only.

## Troubleshooting

If the page appears unstyled or interactions do not work, check that the three files are in the same directory and inspect the browser Developer Tools console for missing-file errors. If opening directly as a `file://` page causes browser-specific issues, serve the folder with VS Code Live Server.

## Readable source layout

All files have been expanded into indented, line-oriented source code for easier review in VS Code.

- `index.html`: HTML elements and sections appear on separate indented lines.
- `styles.css`: CSS rules and declarations are separated and indented.
- `script.js`: JavaScript blocks and statements are separated, while the original template literals and demonstration logic are retained.

This is still the original front-end-only demonstration. Open `index.html` directly or with the VS Code Live Server extension.
