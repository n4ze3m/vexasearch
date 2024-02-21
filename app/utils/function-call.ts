import { generateImage } from "./generate-image";
import { get_information_about_url } from "./get_information_about_url";
import { search_internet } from "./search-internet";

export interface FunctionCall {
  search_internet: ({
    query,
    noSearch,
  }: {
    query: string;
    noSearch?: boolean;
  }) => any;
  get_information_about_url: ({ url }: { url: string }) => any;
  generate_image: ({ prompt }: { prompt: string }) => any;
}

export const functionCall: FunctionCall = {
  generate_image: generateImage,
  get_information_about_url: get_information_about_url,
  search_internet: search_internet,
};
