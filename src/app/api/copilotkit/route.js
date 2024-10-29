import { CopilotRuntime, AnthropicAdapter, copilotRuntimeNextJSAppRouterEndpoint } from "@copilotkit/runtime";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});



const serviceAdapter = new AnthropicAdapter({ anthropic });
const runtime = new CopilotRuntime();


export const POST = async (req) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });

  try {
    return await handleRequest(req);
  } catch (error) {
    console.error('Anthropic API error:', error);
    return new Response('Error processing request', { status: 500 });
  }
};
