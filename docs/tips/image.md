# FastImage

Always use [FastImage](https://github.com/DylanVann/react-native-fast-image) for remote images,
it has much better caching and performance.

But always use `react-native/Image` for local images, because `FastImage` will load sequentially
which means that a remote image might block a local image display.

# Use svg for vector images

Preferably, we should always use `svg` for local assets.

In booster, we integrated with svg out of the box

- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)

So you can easily import svg files as components

```typescript
import SearchIcon from "./asset/searchIcon.svg";
```

There are certain limits on what kind of svg properties react-native support,
but it our usages, it was more than good.

Also, you should use tools like [OMGSVG](https://jakearchibald.github.io/svgomg/) to slim down svg
files exported from Sketch. It can usually reduce the svg size by more than 50%

# Image resize

Booster integrates with `react-native-image-resizer`, so you can resize you image before upload.

This is useful when you want to cap user upload image to a certain size.

# Image thumbnails

Its always a good idea to load small thumbnails over origin image.

- It's faster to download
- It consumes less message in the app

Booster comes with a image flexible thumbnail service out of the box, in the form of a firebase cloud function.

It will be a API like this

`https://us-central1-mercy-dev.cloudfunctions.net/image-resize?url=${encodeURIComponent(imageURL)}&width=300&height=300`

This will download your image, resize it and then cache it in firebase storage,
and then later on serves from storage directly if the url, width and height is the same.
