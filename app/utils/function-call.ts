import { generateImage } from "./generate-image";
import { get_information_from_url } from "./get-information-from-url";
import { search_internet } from "./search-internet";

export interface FunctionCall {
  search_internet: ({
    query,
    noSearch,
  }: {
    query: string;
    noSearch?: boolean;
  }) => any;
  get_information_from_url: ({
    url,
    query,
  }: {
    url: string;
    query: string;
  }) => any;
  generate_image: ({ prompt }: { prompt: string }) => any;
}

export const functionCall: FunctionCall = {
  generate_image: generateImage,
  search_internet: search_internet,
  get_information_from_url: get_information_from_url,
};
