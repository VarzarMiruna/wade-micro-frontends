# Feed me: a micro frontends demo

One food delivery website, built from four independent apps, as if by four teams.
Inspired by the example in [“Micro Frontends”](https://martinfowler.com/articles/micro-frontends.html) by Cam Jackson.

| App | Folder | Tech | What it does |
|---|---|---|---|
| Container | `container/` | HTML + JS | Header, cart, loads the other apps, demo controls |
| Browse | `browse/` | React | List of restaurants, filter by cuisine |
| Restaurant | `restaurant/` | Vue | Menu of the selected restaurant, “Add to cart” |
| Profile | `profile/` | Web Component + Shadow DOM | User card, delivery address, cart summary |

Each app has its own `package.json`, its own build and its own deployment.

## How the pieces fit together

**The contract.** Every micro frontend is built into one file, `main.js`, which defines two global functions:

```js
window.renderBrowse('browse-root');   // draw the app inside <div id="browse-root">
window.unmountBrowse('browse-root');  // remove it
```

The container adds a `<script>` tag for each app, waits for it to load, then calls `render<Name>`.
If a script fails to load, the container shows a fallback message and the rest of the page keeps working.

**Communication.**

- **URL:** Browse puts the selected restaurant in the URL (`?restaurant=pizza-copou`). Restaurant reads it.
- **Custom events:** Restaurant sends `cart:add`. The container and Profile both listen and update their own state.

**Styles.**

- Browse and Restaurant prefix their classes (`browse__card`, `restaurant__dish`), BEM style.
- Profile uses Shadow DOM, so no outside CSS can reach it.
- Both Browse and Restaurant also use a generic `.button` class. That is the conflict the demo shows.

## The demo controls

| Control | Key | What you see |
|---|---|---|
| Show boundaries | `B` | Each app is outlined, with its team, framework, version, build time and download size |
| v1 | `1` | Normal styles |
| v2 · global | `2` | Browse ships a global `.button` rule: Restaurant's buttons break, Profile does not |
| v2 · @scope | `3` | The same CSS inside `@scope (.browse)`: only Browse changes |
| Take an app down | | Adds `?down=Browse` to the URL. The script request really fails (404) and a fallback appears |
| Hide panel | `D` | |

## Run it locally

Requires Node.js 20.19 or newer.

```bash
cd demo
npm install
npm run install:all
npm start
```

Open http://localhost:4000. The other apps run on ports 4001 (Browse), 4002 (Restaurant) and 4003 (Profile).

To work on one app alone, run `npm run dev` inside its folder and open its port.
Each app has an `index.html` that renders it without the container.

## Deploy on Vercel

Create **four Vercel projects from this same repository**, one per folder:

1. *Add New → Project*, import this repository.
2. Set **Root Directory** to `demo/browse` (then `demo/restaurant`, `demo/profile`, `demo/container`).
3. Vercel detects Vite. Keep the defaults and deploy.
4. Put the three app URLs in `container/src/config.js` and push.

In each project's settings, turn on *Skip deployments when there are no changes to the root directory*.
Then a push only redeploys the apps whose folder changed, so the teams ship independently.
