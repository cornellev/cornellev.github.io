# cornellev.github.io

This website is the home for CEV autonomy.

## Dependencies

```
npm install -g uglify-js
brew install lessc # for macOS, use equivalent for your platform
```

## Usage

1. Run `make` to start the web server.
2. Navigate to `localhost:8005` (preferably from a private window to avoid caching).
3. Terminate the server with CTRL-C.

## Development

First, clone the repository.
You should be developing locally only because of the static site generation.

To write a new page, create a Javascript file under [`src/js/page/`](src/js/page/).
You may use [`src/js/page/index.js`](src/js/page/index.js) as a reference.
HTML includes should be placed under [`src/html/`](src/html/).

Before you commit your changes, run `make src` to generate the static site, e.g., minified Javascript and CSS code.
