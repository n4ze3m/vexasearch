import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { ChatFireworks } from "langchain/chat_models/fireworks";
import { HumanMessage } from "langchain/schema";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "langchain/schema/output_parser";
import { Fireworks } from "langchain/llms/fireworks";

const PROMPT = `You are a helpful assistant who give accurate information of image that user send to you. You must be able to answer what is in the image . Do not make up informatiom. If you do not know what is in the image, you can say "I'm not sure what is in the image". You need to explain the image in detail if you know name of the image then you can say "This is a {name of the image}". Be sure to answer the question in a way that is helpful to the user. You must give name of the image if you know.`;
const GOOGLE_SERACH_PROMPT = `You are a google search query generator from a given text. You must need to generate a google search query from givien context. Just return the query Donot add anything extra
-----
{context}
-----

Query:
`;
const geminiVisionModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro-vision",
  maxOutputTokens: 2048,
});

const llavaVisionModel = new ChatFireworks({
  modelName: "accounts/fireworks/models/llava-v15-13b-fireworks",
  streaming: false,
});

const mistralModel = new Fireworks({
  modelName: "accounts/fireworks/models/mixtral-8x7b-instruct",
  streaming: false,
});

const outputParser = new StringOutputParser();

export const generateGuess = async (image_base64: string) => {
  try {
    const geminiHuman = new HumanMessage({
      content: [
        {
          text: PROMPT,
          type: "text",
        },
        {
          image_url: image_base64,
          type: "image_url",
        },
      ],
    });

    let imageBase64WithHeader = `data:image/jpeg;base64,${
      image_base64.split(",")[1]
    }`;

    const llavaHuman = new HumanMessage({
      content: [
        {
          text: PROMPT,
          type: "text",
        },
        {
          image_url: {
            url: imageBase64WithHeader,
          },
          type: "image_url",
        },
      ],
    });

    const geminiPrompt = ChatPromptTemplate.fromMessages([geminiHuman]);

    const llavaPrompt = ChatPromptTemplate.fromMessages([llavaHuman]);

    const geminiChain = geminiPrompt.pipe(geminiVisionModel).pipe(outputParser);

    // llava will be a fallback in case gemini fails
    const llavaChain = llavaPrompt.pipe(llavaVisionModel).pipe(outputParser);

    const model = geminiChain.withFallbacks({
      fallbacks: [llavaChain],
    });

    const result = await model.invoke({});

    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const generateSearchQuery = async (context: string) => {
  try {
    const prompt = PromptTemplate.fromTemplate(GOOGLE_SERACH_PROMPT);

    const model = prompt.pipe(mistralModel).pipe(outputParser);

    const result = await model.invoke({ context });

    return result;
  } catch (error) {
    console.log(error);
    return "";
  }
};
