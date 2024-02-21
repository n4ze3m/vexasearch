export const bingSearch = async (query: string) => {
  const response = await fetch(
    `${process.env.BING_END_POINT}/v7.0/search?q=${query}&mtk=en-US`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.BING_API_KEY!,
      },
    }
  );

  if (!response.ok) {
    return {
      webPages: {
        webSearchUrl: `https://www.bing.com/search?q=${query}`,
        value: [],
      },
    };
  }

  const data = (await response.json()) as {
    webPages?: {
      webSearchUrl?: string;
      value?: {
        name?: string;
        url?: string;
        snippet?: string;
      }[];
    };
  };

  return data;
};
