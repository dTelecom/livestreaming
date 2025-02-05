# Livestream with dTelecom


Today most livestreams experience a 5–30 second lag, which is evident in the delay it takes for streamers to respond to chats. Those streams use HLS, which leverages existing CDNs by uploading 5–30 second video chunks, which clients download one chunk at a time. HLS is hugely scalable, but it comes with latency.

dTelecom is a sort of WebRTC CDN, achieving sub-100ms latency for audiences of 1000 or 100,000 by streaming video over backbone Internet connections and only going over the public Internet for the last mile (that is, delivery to connected clients). This enables true real-time, large-scale events, where anyone and everyone can participate.

## Getting Started

Clone the repo and install dependencies:

```
cd livestreaming
yarn install
```

Create a new dTelecom project at [https://cloud.dtelecom.org/](). Then create a new key in your [project settings](). With the provided credentials, create a new .env file and fill out the values below:

```
API_KEY=<api key>
API_SECRET=<api secret>
```

Then run the development server:

```bash
yarn dev
```

You can test it by opening [http://localhost:3000](http://localhost:3000) in a browser.

## Deploy on Vercel

This demo is a Next.js app. You can deploy to your Vercel account with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdtelecom%2Flivestreaming&env=API_KEY,sAPI_SECRET)

Refer to the [the Next.js deployment documentation](https://nextjs.org/docs/deployment) for more about deploying to a production environment.
