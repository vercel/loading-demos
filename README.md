# Loading.js demos

This project illustrates some of the different behaviors of the `loading.js` file in a Next.js project, especially with respect to Link prefetching. For more info on what the `loading.js` file does, see [the docs](https://nextjs.org/docs/app/api-reference/file-conventions/loading).

## Instructions

To reproduce the behaviors illustrated here, install dependencies, run a build with `npm run build` and then start the production server with `npm start`. Or you can view a live demo [here](https://loading-demos.vercel.app).

### Viewing the homepage

Once the app is running, go to `localhost:3000` and open the network tab in the browser devtools. Hard reload the page if no requests are visible when you open the dev tools.

Here you'll see the results of two out of three prefetch types.

#### Default behavior (null)

One of the prefetch requests will look like `/prefetch-default?_rsc=[some-hash]`. Note the load time here - it should be about 10-15ms because it's only preloading up to that page's route segment (meaning its `layout.tsx` and `loading.tsx` but not its `page.tsx`). This means when you click the "Default" link, the loading page will be immediately available, and will be displayed while the page content is fetched in the background.

#### Prefetch = true

The second prefetch request will be something like `/prefetch-default?_rsc=[another-hash]`. The load time here will be significantly longer, around 2s. In this case, I've applied an artificial delay (in the `getPosts` function called in the page component) to simulate network latency. In practice, the page component will generally be much larger than the loading component, so a similar difference in load time can be observed.

### Slow loading behavior

The third prefetch type is `prefetch={false}` which can be seen on the homepage as well (or rather, not seen, because no request is made). This is generally where edge cases happen, and where it becomes non-obvious what's happening.

When you click the "default" and "true" links, you'll notice that the page navigation happens immediately (to the spinner and to the page content, respectively). However, this is not the case for the "false" link. I've applied a delay to the loading of the spinner in `loading.tsx` to illustrate this: when not prefetching, the initial navigation must also request the `loading.tsx` file in addition to the page content.

In this specific case, note that the spinner never actually shows up. This is because both the spinner and the page load are inflated to 2s. By the time the spinner is loaded and ready to display in `loading.tsx` the rest of the page has already been generated and is shown to the user. As a result, the presence of a `loading.tsx` file actually increased the bandwidth usage (and potentially the total request time). Much of the time these differences will be negligible, but in the case of very complex `loading.tsx` pages or very simple `page.tsx` files, it's actually better *not to include* a loading file.

Instead of immediately navigating to the new page or the loading page, navigation is delayed until a response is received from the server. This means that in order to provide visual feedback that a new page is loading, the developer must trigger some kind of indicator on the *current* page.
