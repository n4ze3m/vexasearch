export const randomAlphaNumeric = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const encodeSlug = (title: string) => {
  return `${title}-${randomAlphaNumeric(5)}`
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const decodeSlug = (slug: string) => {
  slug = slug.split("-").slice(0, -1).join("-");
  return slug.replace(/-/g, " ");
};
