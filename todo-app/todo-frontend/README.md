# React application

This application is created with [Vite](https://vitest.dev/).

## Run outside Docker

Start the backend outside Docker, then run the frontend from a separate terminal:

```sh
npm ci
VITE_BACKEND_URL=http://localhost:3000 npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173). The backend must be
available at http://localhost:3000.

## Run the containerized frontend

With the backend still running outside Docker, build and start the frontend:

```sh
docker build --build-arg VITE_BACKEND_URL=http://localhost:3000 -t todo-frontend .
docker run --rm -p 4173:4173 todo-frontend
```

Open http://localhost:4173. The Dockerfile sets `VITE_BACKEND_URL` before
building because Vite embeds `VITE_` variables in the frontend at build time.
If the backend URL changes, rebuild the image with the new build argument.

## Environment variables

Use `VITE_BACKEND_URL` to set where the backend for this application is.
