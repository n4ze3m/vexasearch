import axios from "axios";

export const searchResult = async (query: string) => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${query}&num=5`;
    const response = await axios.get(url);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};
