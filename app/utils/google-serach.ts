export const googleSearch = async (query: string) => {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${query}&num=5`
  );

  if (!response.ok) {
    return {
      items: [],
    };
  }

  const data = (await response.json()) as {
    items?: {
      title?: string;
      link?: string;
      snippet?: string;
    }[];
  };

  return data;
};
