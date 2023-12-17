import { Job } from "bullmq";

export default async function queueHandler(job: Job) {
  console.log("job", job);
}
