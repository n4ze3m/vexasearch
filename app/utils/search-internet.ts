import { Fireworks } from "@langchain/community/llms/fireworks";
import { bingSearch } from "./bing-search";
import { googleSearch } from "./google-serach";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const bingo = async (query: string) => {
  const bingResponse = await bingSearch(query);
  const bingItems = bingResponse?.webPages?.value || [];
  return {
    items: bingItems.map((item) => {
      return item.snippet;
    }),
    links: bingItems.map((item) => item.url),
  };
};

const google = async (query: string) => {
  const googleResponse = await googleSearch(query);
  const googleItems = googleResponse?.items || [];
  return {
    items: googleItems.map((item) => {
      return item.snippet;
    }),
    links: googleItems.map((item) => item.link),
  };
};

const tool = async (query: string) => {
  const mode = process.env.INTERNET_SEARCH || "none";

  switch (mode) {
    case "bing":
      return await bingo(query);
    case "google":
      return await google(query);
    case "auto":
      if (Math.random() > 0.5) {
        return await bingo(query);
      } else {
        return await google(query);
      }
    default:
      return {
        items: [],
        links: [],
      };
  }
};

const outputParser = new StringOutputParser();

const mistralModel = new Fireworks({
  modelName: "accounts/fireworks/models/mixtral-8x7b-instruct",
  streaming: false,
  maxTokens: 4096,
});

const defaultResponse = async (query: string) => {
  const prompt = PromptTemplate.fromTemplate(
    "You are a helpful assistant. Who knows lots of things. Current year is 2024. Can you help me find information about {query}?"
  );
  const chain = prompt.pipe(mistralModel).pipe(outputParser);

  const response = await chain.invoke({
    query: query,
  });

  return {
    response: response,
    links: [] as string[],
  };
};

export const search_internet = async ({
  query,
  noSearch,
}: {
  query: string;
  noSearch?: boolean;
}) => {
  if (noSearch) {
    const response = await defaultResponse(query);
    return response;
  }

  const { items, links } = await tool(query);

  if (items.length === 0) {
    const response = await defaultResponse(query);
    return response;
  }

  const prompt =
    PromptTemplate.fromTemplate(`You are a helpful assistant. Use the following information from the internet to answer the user's question in a helpful way.
  
  --------
  {items}
  ---------

  Question: {query}

  Response:`);

  const chain = prompt.pipe(mistralModel).pipe(outputParser);

  const response = await chain.invoke({
    items: items.join("\n"),
    query: query,
  });

  return {
    response: response,
    links: links,
  };
};
