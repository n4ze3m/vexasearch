import { FastifySchema } from "fastify";

export const generateGuessionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      image_base64: {
        type: "string",
      },
    },
    required: ["image_base64"],
  },
};
