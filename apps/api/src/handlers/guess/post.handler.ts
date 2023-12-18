import { FastifyRequest, FastifyReply } from "fastify";
import { generateGuess, generateSearchQuery } from "../../utils/ai.js";
import { searchResult } from "../../utils/google.js";

interface GuessRequestBody {
  Body: {
    image_base64: string;
  };
}

export const guessHandler = async (
  request: FastifyRequest<GuessRequestBody>,
  reply: FastifyReply
) => {
  try {
    const { image_base64 } = request.body;

    const result = await generateGuess(image_base64);

    const query = await generateSearchQuery(result);

    const search = await searchResult(query);

    // for debugging
    await request.server.prisma.search.create({
      data: {
        logs: {
          query,
          result,
          search
        },
      },
    });

    return {
      ai: result,
      query,
      image: image_base64,
      google: search,
    };
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: "Internal Server Error",
    });
  }
};
