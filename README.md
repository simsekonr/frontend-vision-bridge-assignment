# VisionBridge Frontend

## Overview

This is a JavaScript library that dynamically applies DOM changes based on configuration data fetched from the backend.

## Setup

1. Include the compiled JavaScript (bundled with your app or embedded via module scripts).
2. Set `data-page="somePageId"` on your `<body>` tag to help backend filter specific configs.

```html
<body data-page="list">
  ...
  <script type="module" src="/path/to/index.js"></script>
</body>
```
## Run

cd frontend
npx http-server .



## Dependencies

- Modern browser (ES Modules supported)
- Works best with a backend that supports `/api/configuration` and `/api/specific`

## How It Works

- On page load, `index.js`:
  - Detects page, url, and host.
  - Calls `/api/specific` to get applicable config IDs.
  - Fetches each configuration and applies them using defined actions.

## Supported Actions

- `remove`: Remove elements by selector
- `replace`: Replace elements with new HTML
- `insert`: Insert elements at specific positions
- `alter`: Replace text content within DOM