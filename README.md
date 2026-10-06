# Calculator

A small, responsive calculator built with React and Vite. It runs entirely in the browser and supports mouse, touch, and keyboard input.

## Features

- Addition, subtraction, multiplication, and division
- Decimal number entry
- Clear and backspace controls
- Keyboard support for digits, operators, Enter, Backspace, and Escape
- Error handling for division by zero and invalid results
- GitHub Pages deployment with `gh-pages`

## Technologies

- React
- JavaScript
- CSS
- Vite

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

Install dependencies:

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Build

```bash
npm run build
```

The production files are generated in `dist/`. To preview that build locally, run:

```bash
npm run preview
```

## Deploy to GitHub Pages

Create a GitHub repository and push this project to its `main` branch. Then run:

```bash
npm run deploy
```

This builds the app and publishes `dist/` to the `gh-pages` branch. In the repository on GitHub, open **Settings > Pages** and select **Deploy from a branch**, then choose the `gh-pages` branch and `/ (root)` folder.

The website will be available at `https://<github-username>.github.io/<repository-name>/`. For a repository named `<github-username>.github.io`, the site is instead available at `https://<github-username>.github.io/`.
