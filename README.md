# Animated Halftone Rendering

This project is a React application built with Vite and ThreeJS, featuring 3D rendering on halftone image visualizations. Play with the site here: [Animated Halftone](https://nicholaslck.github.io/animated-halftone).

![demo](./doc/assets/animated-halftone-demo.gif)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **@react-three/fiber**: A React renderer for Three.js.
- **three**: A JavaScript 3D library.
- **floyd-steinberg**: A library for applying Floyd-Steinberg dithering to images.
- **daisyui**: A Tailwind CSS component library.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/nicholaslck/animated-halftone.git
cd animated-halftone
pnpm install
```

## Development

To run the project in development mode:

```bash
pnpm run dev
```

This will start the Vite development server, and you can view the application in your browser.

## Build

To build the project for production:

```bash
pnpm run build
```

This will compile the TypeScript code and bundle the assets into the `dist` directory.

## Linting

To run the linter:

```bash
pnpm run lint
```
