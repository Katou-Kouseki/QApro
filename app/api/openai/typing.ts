import type {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateImageRequest,
} from "openai";

export type ChatRequest = CreateChatCompletionRequest;
export type ChatReponse = CreateChatCompletionResponse;
export type ImageRequest = CreateImageRequest;
