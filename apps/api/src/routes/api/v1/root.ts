import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return {
      hello: "world",
    };
  });
};

export default root;
