# Datanaut Frontend

A modern web application built with:

- React 18
- Remix 2
- Vite 6
- TypeScript
- Sass

## Development Setup

1. Install dependencies:

```sh
npm install
```

2. Start development server:

```sh
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `dev`: Starts development server with hot reload
- `build`: Creates production build
- `start`: Runs production server
- `lint`: Runs ESLint for code quality checks
- `typecheck`: Runs TypeScript compiler

## Project Structure

Key directories:

- `app/`: Remix route components and core application logic
- `public/`: Static assets
- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration

## Deployment

1. Create production build:

```sh
npm run build
```

2. Start production server:

```sh
npm start
```

3. Deploy the following directories:

- `build/server`
- `build/client`

## Contributing

1. Follow existing code style and patterns
2. Run linter before committing:

```sh
npm run lint
```

3. Ensure TypeScript checks pass:

```sh
npm run typecheck
```

4. Write clear commit messages

## Documentation

- [Remix Docs](https://remix.run/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
