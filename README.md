# DrawIt - Sketch to AI-Generated Image

![DrawIt App Banner](https://www.drawit.art/opengraph-image.jpg)
![DrawIt App Interface](https://www.drawit.art/demo-screenshot.jpg)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/leap-api/draw-it.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![ESLint](https://img.shields.io/badge/code_style-ESLint-5ed9c7.svg)
[![Next.js](https://img.shields.io/badge/built_with-Next.js-0070f3)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/)

DrawIt is a web application designed to convert user sketches into AI-generated images. It utilizes Next.js 13, Chakra UI, and the Leap Remix API to provide this functionality..

## Live Demo

You can try out DrawIt with the live demo at [drawit.art](https://drawit.art/).

## Leap API

Leap is an AI platform that offers a wide range of AI APIs, including the Remix API, which is used in the DrawIt app. To get started, sign up for an API key at [Leap](https://tryleap.ai/). After registering, access the Leap Dashboard and retrieve your API key.

To find out more about the Leap Remix API, check out the [Leap Remix API reference](https://docs.tryleap.ai/reference/controlcontroller_create).

## Getting Started

Follow these steps to set up DrawIt in your local development environment:

1. Clone the repository:

```
git clone https://github.com/leap-api/draw-it.git
```

2. Move into the `draw-it` directory:

```
cd draw-it
```

3. Install dependencies:

   For npm:

   ```
   npm install
   ```

   For yarn:

   ```
   yarn
   ```

4. Create a `.env` file in the root directory and replace `your_api_key` with your actual Leap API key:

```
LEAP_API_KEY=your_api_key
```

5. Run the development server:

   For npm:

   ```
   npm run dev
   ```

   For yarn:

   ```
   yarn dev
   ```

6. Open your browser and visit `http://localhost:3000` to see the running app.

For additional guidance and instructions, refer to [the full guide](https://www.tryleap.ai/docs/how-to-build-a-sketch-to-image-app-with-leap-remix).

## Note

DrawIt uses Next.js 13 for its app routing. If you would like to use a prior version of Next.js, please be aware that code modifications may be required.

## Contributing

We welcome contributions and pull requests. For major changes, please open an issue first to discuss the proposed updates.

## Resources

- Discord Community: [Leap Discord](https://discord.gg/NCAKTUayPK)
- Help Email: help@tryleap.ai

## License

The DrawIt app is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
