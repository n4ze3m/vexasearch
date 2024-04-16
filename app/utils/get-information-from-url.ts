import { Fireworks } from "@langchain/community/llms/fireworks";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createChatWithWebsiteChain } from "~/chain/chat-with-website";
import { DialoqbaseWebLoader } from "~/chain/loader";
const DEFAULT_RAG_QUESTION_PROMPT =
  "Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.   Chat History: {chat_history} Follow Up Input: {question} Standalone question:";

const DEFAUTL_RAG_SYSTEM_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say you don't know. DO NOT try to make up an answer. If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.  {context}  Question: {question} Helpful answer in markdown:`;

const embeddingModel = new OpenAIEmbeddings({
  modelName: "nomic-ai/nomic-embed-text-v1.5",
  openAIApiKey: process.env.FIREWORKS_API_KEY!,
  configuration: {
    baseURL: "https://api.fireworks.ai/inference/v1",
    apiKey: process.env.FIREWORKS_API_KEY!,
  },
});
const mistralModel = new Fireworks({
  modelName: "accounts/fireworks/models/mixtral-8x7b-instruct",
  streaming: false,
  maxTokens: 4096,
});

export const get_information_from_url = async ({
  url,
  query,
}: {
  url: string;
  query: string;
}) => {
  const loader = new DialoqbaseWebLoader({
    url,
  });
  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await textSplitter.splitDocuments(docs);

  const store = new MemoryVectorStore(embeddingModel);

  await store.addDocuments(chunks);

  const chain = createChatWithWebsiteChain({
    llm: mistralModel,
    question_llm: mistralModel,
    question_template: DEFAULT_RAG_QUESTION_PROMPT,
    response_template: DEFAUTL_RAG_SYSTEM_PROMPT,
    retriever: store.asRetriever(),
  });

  const response = await chain.invoke({
    question: query,
    chat_history: [],
  });

  return {
    response,
    links: [url],
  };
};
