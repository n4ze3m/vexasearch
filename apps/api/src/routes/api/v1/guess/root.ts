import { FastifyPluginAsync } from "fastify";
import { generateGuessionSchema } from "../../../../handlers/guess/schema.js";
import { guessHandler } from "../../../../handlers/guess/post.handler.js";

const generate: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.post(
    "/",
    {
      schema: generateGuessionSchema,
      bodyLimit: 50 * 1024 * 1024,
    },
    guessHandler
  );
};

export default generate;
