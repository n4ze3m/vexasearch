import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { Queue } from "bullmq";
import { startWorker } from "../queue/worker.js";
const connection = {
  host: process.env.REDIS_HOST!,
  port: 6379,
};

declare module "fastify" {
  interface FastifyInstance {
    queue: Queue;
  }
}

const bullPlugin: FastifyPluginAsync = fp(async (server, options) => {
  if (process.env.HAVE_REDIS !== "false") {
    const queueName = process.env.QUEUE_NAME || "template";

    const worker = await startWorker();
    const queue = new Queue(queueName, {
      connection,
    });

    server.decorate("queue", queue);

    server.addHook("onClose", () => {
      worker.close();
      queue.close();
    });
  }
});

export default bullPlugin;
