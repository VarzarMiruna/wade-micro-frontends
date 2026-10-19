# Feed me: a micro frontends demo

One food delivery website, built from four independent apps, as if by four teams.
Inspired by the example in [“Micro Frontends”](https://martinfowler.com/articles/micro-frontends.html) by Cam Jackson.

| App | Folder | Tech | What it does |
|---|---|---|---|
| Container | `container/` | HTML + JS | Header, cart, loads the other apps, demo controls |
| Browse | `browse/` | React | List of restaurants, filter by cuisine |
| Restaurant | `restaurant/` | Vue | Menu of the selected restaurant, “Add to cart” |
| Profile | `profile/` | Web Component + Shadow DOM | User card, delivery address, cart summary |
