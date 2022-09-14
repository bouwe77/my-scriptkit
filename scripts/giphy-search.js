import "@johnlindquist/kit";

// Menu: Giphy
// Description: Search giphy
// Shortcut: CMD 1

let download = await npm("image-downloader");
let queryString = await npm("query-string");

let GIPHY_API_KEY = await env("GIPHY_API_KEY", async () => {
  const giphyApiKeyToSave = await arg("Enter your API KEY for Giphy API");
  return giphyApiKeyToSave;
});

let search = (q) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${q}&limit=20&offset=0&rating=g&lang=en`;

// hier dus niet een arg gebruiken, maar HTML maken: https://youtu.be/zu_g17ePajA?t=4008
const stuff = await arg("Search giphy:", async (input) => {
  if (!input) return [];
  let query = search(input);
  let { data } = await get(query);

  await inspect(data);

  const floep = data.data.map((gif) => {
    return {
      name: gif.title.trim() || gif.slug,
      value: {
        input,
        url: gif.images.original.url,
      },
      preview: `<img src="${gif.images.downsized.url}" alt="">`,
    };
  });

  // await inspect(floep);

  // dev(1, floep.length);

  return floep;
});

// await inspect(stuff);
