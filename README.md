# DrawIt - Sketch to AI-Generated Image

![DrawIt App Screenshot Banner](https://www.drawit.art/opengraph-image.jpg)

DrawIt is a state-of-the-art web application that empowers users to transform simple sketches into AI-generated images, leveraging the power of the latest Next.js 13, Chakra UI, and Leap Remix API.

## Live Demo

Explore the live demo of DrawIt at [drawit.art](https://drawit.art/).

## Leap API

Leap is a sophisticated AI platform offering a comprehensive suite of AI APIs, including the Remix API utilized in the DrawIt application. To begin using Leap, sign up for an API key at [Leap.ai](https://leap.ai/). Upon registering, access the Leap Dashboard and retrieve your API key.

For further information regarding the Leap Remix API, which underpins the DrawIt app, consult the [Leap Remix API reference](https://docs.tryleap.ai/reference/controlcontroller_create).

## Getting Started

Follow the step-by-step instructions below to set up the DrawIt app in your local development environment:

1. Clone the repository using the following command:

```
git clone https://github.com/leap-api/draw-it.git
```

2. Navigate to the `draw-it` directory:

```
cd draw-it
```

3. Install the necessary dependencies:

   For npm:

   ```
   npm install
   ```

   For yarn:

   ```
   yarn
   ```

4. Create a `.env` file at the root of the directory and replace `your_api_key` with your actual Leap API key:

```
LEAP_API_KEY=your_api_key
```

5. Launch the development server:

   For npm:

   ```
   npm run dev
   ```

   For yarn:

   ```
   yarn dev
   ```

6. Open your browser and visit `http://localhost:3000` to view the running app.

For a comprehensive guide and additional instructions, consult [the full guide](#).

## Contributing

We welcome pull requests and contributions. For major changes, kindly open an issue first to discuss your proposed modifications.

## License

The DrawIt app is licensed under [MIT](https://choosealicense.com/licenses/mit/).
