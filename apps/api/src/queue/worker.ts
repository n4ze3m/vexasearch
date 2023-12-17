const connection = {
  host: process.env.REDIS_HOST!,
  port: 6379,
};
import { Worker } from "bullmq";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import os from "os";
import queueHandler from "./index.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const startWorker = async () => {
  // check if windows
  if (os.platform() === "win32") {
    const worker = new Worker(process.env.QUEUE_NAME || "template", queueHandler, {
      connection,
    });

    return worker;
  } else {
    const path = join(__dirname, "./index.js");
    const worker = new Worker(process.env.QUEUE_NAME || "template", path, {
      connection,
    });

    return worker;
  }
};
