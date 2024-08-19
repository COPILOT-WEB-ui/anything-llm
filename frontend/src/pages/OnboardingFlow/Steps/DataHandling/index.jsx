import React, { useState, useEffect } from "react";
import PreLoader from "@/components/Preloader";
import System from "@/models/system";

import AnythingLLMIcon from "@/assets/logo/anything-llm-icon.png";
import OpenAiLogo from "@/assets/llmprovider/openai.png";
import GenericOpenAiLogo from "@/assets/llmprovider/generic-openai.png";
import AzureOpenAiLogo from "@/assets/llmprovider/azure.png";
import AnthropicLogo from "@/assets/llmprovider/anthropic.png";
import GeminiLogo from "@/assets/llmprovider/gemini.png";
import OllamaLogo from "@/assets/llmprovider/ollama.png";
import TogetherAILogo from "@/assets/llmprovider/togetherai.png";
import LMStudioLogo from "@/assets/llmprovider/lmstudio.png";
import LocalAiLogo from "@/assets/llmprovider/localai.png";
import MistralLogo from "@/assets/llmprovider/mistral.jpeg";
import HuggingFaceLogo from "@/assets/llmprovider/huggingface.png";
import PerplexityLogo from "@/assets/llmprovider/perplexity.png";
import OpenRouterLogo from "@/assets/llmprovider/openrouter.jpeg";
import GroqLogo from "@/assets/llmprovider/groq.png";
import KoboldCPPLogo from "@/assets/llmprovider/koboldcpp.png";
import CohereLogo from "@/assets/llmprovider/cohere.png";
import TextGenWebUILogo from "@/assets/llmprovider/text-generation-webui.png";
import LiteLLMLogo from "@/assets/llmprovider/litellm.png";
import AWSBedrockLogo from "@/assets/llmprovider/bedrock.png";

import ZillizLogo from "@/assets/vectordbs/zilliz.png";
import AstraDBLogo from "@/assets/vectordbs/astraDB.png";
import ChromaLogo from "@/assets/vectordbs/chroma.png";
import PineconeLogo from "@/assets/vectordbs/pinecone.png";
import LanceDbLogo from "@/assets/vectordbs/lancedb.png";
import WeaviateLogo from "@/assets/vectordbs/weaviate.png";
import QDrantLogo from "@/assets/vectordbs/qdrant.png";
import MilvusLogo from "@/assets/vectordbs/milvus.png";
import VoyageAiLogo from "@/assets/embeddingprovider/voyageai.png";

import paths from "@/utils/paths";
import { useNavigate } from "react-router-dom";

const TITLE = "Data Handling & Privacy";
const DESCRIPTION =
  "We are committed to transparency and control when it comes to your personal data.";
export const LLM_SELECTION_PRIVACY = {
  anythingllm_ollama: {
    name: "AnythingLLM x Ollama",
    description: [
      "Your chats, model, and document text are only accessible on this machine",
    ],
    logo: AnythingLLMIcon,
  },
  openai: {
    name: "OpenAI",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to OpenAI",
    ],
    logo: OpenAiLogo,
  },
  azure: {
    name: "Azure OpenAI",
    description: [
      "Your chats will not be used for training",
      "Your text and embedding text are not visible to OpenAI or Microsoft",
    ],
    logo: AzureOpenAiLogo,
  },
  anthropic: {
    name: "Anthropic",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to Anthropic",
    ],
    logo: AnthropicLogo,
  },
  gemini: {
    name: "Google Gemini",
    description: [
      "Your chats are de-identified and used in training",
      "Your prompts and document text used in response creation are visible to Google",
    ],
    logo: GeminiLogo,
  },
  lmstudio: {
    name: "LMStudio",
    description: [
      "Your model and chats are only accessible on the server running LMStudio",
    ],
    logo: LMStudioLogo,
  },
  localai: {
    name: "LocalAI",
    description: [
      "Your model and chats are only accessible on the server running LocalAI",
    ],
    logo: LocalAiLogo,
  },
  ollama: {
    name: "Ollama",
    description: [
      "Your model and chats are only accessible on the machine running Ollama models",
    ],
    logo: OllamaLogo,
  },
  togetherai: {
    name: "TogetherAI",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to TogetherAI",
    ],
    logo: TogetherAILogo,
  },
  mistral: {
    name: "Mistral",
    description: [
      "Your prompts and document text used in response creation are visible to Mistral",
    ],
    logo: MistralLogo,
  },
  huggingface: {
    name: "HuggingFace",
    description: [
      "Your prompts and document text used in response are sent to your HuggingFace managed endpoint",
    ],
    logo: HuggingFaceLogo,
  },
  perplexity: {
    name: "Perplexity AI",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to Perplexity AI",
    ],
    logo: PerplexityLogo,
  },
  openrouter: {
    name: "OpenRouter",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to OpenRouter",
    ],
    logo: OpenRouterLogo,
  },
  groq: {
    name: "Groq",
    description: [
      "Your chats will not be used for training",
      "Your prompts and document text used in response creation are visible to Groq",
    ],
    logo: GroqLogo,
  },
  koboldcpp: {
    name: "KoboldCPP",
    description: [
      "Your model and chats are only accessible on the server running KoboldCPP",
    ],
    logo: KoboldCPPLogo,
  },
  textgenwebui: {
    name: "Oobabooga Web UI",
    description: [
      "Your model and chats are only accessible on the server running the Oobabooga Text Generation Web UI",
    ],
    logo: TextGenWebUILogo,
  },
  "generic-openai": {
    name: "Generic OpenAI compatible service",
    description: [
      "Data is shared according to the terms of service applicable with your generic endpoint provider.",
    ],
    logo: GenericOpenAiLogo,
  },
  cohere: {
    name: "Cohere",
    description: [
      "Data is shared according to the terms of service of cohere.com and your localities privacy laws.",
    ],
    logo: CohereLogo,
  },
  litellm: {
    name: "LiteLLM",
    description: [
      "Your model and chats are only accessible on the server running LiteLLM",
    ],
    logo: LiteLLMLogo,
  },
  bedrock: {
    name: "AWS Bedrock",
    description: [
      "You model and chat contents are subject to the agreed EULA for AWS and the model provider on aws.amazon.com",
    ],
    logo: AWSBedrockLogo,
  },
};

export const VECTOR_DB_PRIVACY = {
  chroma: {
    name: "Chroma",
    description: [
      "Your vectors and document text are stored on your Chroma instance",
      "Access to your instance is managed by you",
    ],
    logo: ChromaLogo,
  },
  pinecone: {
    name: "Pinecone",
    description: [
      "Your vectors and document text are stored on Pinecone's servers",
      "Access to your data is managed by Pinecone",
    ],
    logo: PineconeLogo,
  },
  qdrant: {
    name: "Qdrant",
    description: [
      "Your vectors and document text are stored on your Qdrant instance (cloud or self-hosted)",
    ],
    logo: QDrantLogo,
  },
  weaviate: {
    name: "Weaviate",
    description: [
      "Your vectors and document text are stored on your Weaviate instance (cloud or self-hosted)",
    ],
    logo: WeaviateLogo,
  },
  milvus: {
    name: "Milvus",
    description: [
      "Your vectors and document text are stored on your Milvus instance (cloud or self-hosted)",
    ],
    logo: MilvusLogo,
  },
  zilliz: {
    name: "Zilliz Cloud",
    description: [
      "Your vectors and document text are stored on your Zilliz cloud cluster.",
    ],
    logo: ZillizLogo,
  },
  astra: {
    name: "AstraDB",
    description: [
      "Your vectors and document text are stored on your cloud AstraDB database.",
    ],
    logo: AstraDBLogo,
  },
  lancedb: {
    name: "LanceDB",
    description: [
      "Your vectors and document text are stored privately on this instance of AnythingLLM",
    ],
    logo: LanceDbLogo,
  },
};

export const EMBEDDING_ENGINE_PRIVACY = {
  native: {
    name: "AnythingLLM Embedder",
    description: [
      "Your document text is embedded privately on this instance of AnythingLLM",
    ],
    logo: AnythingLLMIcon,
  },
  openai: {
    name: "OpenAI",
    description: [
      "Your document text is sent to OpenAI servers",
      "Your documents are not used for training",
    ],
    logo: OpenAiLogo,
  },
  azure: {
    name: "Azure OpenAI",
    description: [
      "Your document text is sent to your Microsoft Azure service",
      "Your documents are not used for training",
    ],
    logo: AzureOpenAiLogo,
  },
  localai: {
    name: "LocalAI",
    description: [
      "Your document text is embedded privately on the server running LocalAI",
    ],
    logo: LocalAiLogo,
  },
  ollama: {
    name: "Ollama",
    description: [
      "Your document text is embedded privately on the server running Ollama",
    ],
    logo: OllamaLogo,
  },
  lmstudio: {
    name: "LMStudio",
    description: [
      "Your document text is embedded privately on the server running LMStudio",
    ],
    logo: LMStudioLogo,
  },
  cohere: {
    name: "Cohere",
    description: [
      "Data is shared according to the terms of service of cohere.com and your localities privacy laws.",
    ],
    logo: CohereLogo,
  },
  voyageai: {
    name: "Voyage AI",
    description: [
      "Data sent to Voyage AI's servers is shared according to the terms of service of voyageai.com.",
    ],
    logo: VoyageAiLogo,
  },
  litellm: {
    name: "LiteLLM",
    description: [
      "Your document text is only accessible on the server running LiteLLM and to the providers you configured in LiteLLM.",
    ],
    logo: LiteLLMLogo,
  },
  "generic-openai": {
    name: "Generic OpenAI compatible service",
    description: [
      "Data is shared according to the terms of service applicable with your generic endpoint provider.",
    ],
    logo: GenericOpenAiLogo,
  },
};

export default function DataHandling({ setHeader, setForwardBtn, setBackBtn }) {
  const [llmChoice, setLLMChoice] = useState("openai");
  const [loading, setLoading] = useState(true);
  const [vectorDb, setVectorDb] = useState("pinecone");
  const [embeddingEngine, setEmbeddingEngine] = useState("openai");
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({ title: TITLE, description: DESCRIPTION });
    setForwardBtn({ showing: true, disabled: false, onClick: handleForward });
    setBackBtn({ showing: false, disabled: false, onClick: handleBack });
    async function fetchKeys() {
      const _settings = await System.keys();
      setLLMChoice(_settings?.LLMProvider || "openai");
      setVectorDb(_settings?.VectorDB || "lancedb");
      setEmbeddingEngine(_settings?.EmbeddingEngine || "openai");

      setLoading(false);
    }
    fetchKeys();
  }, []);

  function handleForward() {
    navigate(paths.onboarding.survey());
  }

  function handleBack() {
    navigate(paths.onboarding.llmPreference());
  }

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center p-20">
        <PreLoader />
      </div>
    );

  return (
    <div className="w-full flex items-center justify-center flex-col gap-y-6">
      <div className="p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-y-2 border-b border-zinc-500/50 pb-4">
          <div className="text-white text-base font-bold">LLM Selection</div>
          <div className="flex items-center gap-2.5">
            <img
              src={LLM_SELECTION_PRIVACY[llmChoice].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {LLM_SELECTION_PRIVACY[llmChoice].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {LLM_SELECTION_PRIVACY[llmChoice].description.map((desc) => (
              <li className="text-white/90 text-sm">{desc}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-2 border-b border-zinc-500/50 pb-4">
          <div className="text-white text-base font-bold">
            Embedding Preference
          </div>
          <div className="flex items-center gap-2.5">
            <img
              src={EMBEDDING_ENGINE_PRIVACY[embeddingEngine].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {EMBEDDING_ENGINE_PRIVACY[embeddingEngine].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {EMBEDDING_ENGINE_PRIVACY[embeddingEngine].description.map(
              (desc) => (
                <li className="text-white/90 text-sm">{desc}</li>
              )
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-y-2 pb-4">
          <div className="text-white text-base font-bold">Vector Database</div>
          <div className="flex items-center gap-2.5">
            <img
              src={VECTOR_DB_PRIVACY[vectorDb].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {VECTOR_DB_PRIVACY[vectorDb].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {VECTOR_DB_PRIVACY[vectorDb].description.map((desc) => (
              <li className="text-white/90 text-sm">{desc}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-white/60 text-sm font-medium py-1">
        These preferences can be reconfigured at any time in the settings.
      </p>
    </div>
  );
}
