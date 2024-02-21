import fs from "fs/promises";
import crypto from "crypto";

export const generateImage = async ({ prompt }: { prompt: string }) => {
  const url =
    "https://api.fireworks.ai/inference/v1/image_generation/accounts/fireworks/models/stable-diffusion-xl-1024-v1-0 ";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
      Accept: "image/png",
    },
    body: JSON.stringify({
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      sampler: null,
      samples: 1,
      steps: 30,
      seed: 0,
      style_preset: "",
      safety_check: true,
      prompt: prompt,
    }),
  });

  // it will buffer the image saved in the disk

  const imageResponse = await response.arrayBuffer();

  const buffer = Buffer.from(imageResponse);

  try {
    await fs.access("public/images");
  } catch (error) {
    await fs.mkdir("public/images");
  }

  const path = `/images/${crypto.randomUUID()}.png`;

  await fs.writeFile(`public${path}`, buffer);

  return {
    response: `Prompt: ${prompt}\n\n

![Generated Image](${path})`,
    links: [],
  };
};
