# Aniket Verma Portfolio UI

This is the frontend for Aniket Verma's portfolio, built with **React** and **Vite**.

## Features
- **Fast Performance**: Optimized client-side rendering with Vite.
- **Client-Side Routing**: Handled by `react-router-dom`.
- **Styling**: Tailwind CSS for a modern, professional look.
- **AI Agent Integration**: A professional AI Intelligence Layer for interactive queries.

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

The output will be in the `/dist` directory, which is served by the Django backend.

## Environment Variables
The following environment variables are required:
- `VITE_API_BASE_URL`: The URL of the Django API.
- `VITE_WS_URL`: The WebSocket URL for the AI Assistant.

## Backend Integration
This UI is designed to be served by a Django backend. Ensure the backend's `STATICFILES_DIRS` and `TEMPLATES` point to the `ui/dist` folder.
