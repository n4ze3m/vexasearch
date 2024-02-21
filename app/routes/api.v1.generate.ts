import { ActionFunctionArgs, json } from "@remix-run/node";
import { generate } from "~/utils/fireworks";
import { createClient } from "~/utils/supabase.server";

interface Body {
  query: string;
  slug: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as Body;

  const supabase = createClient(request);

  const { data, error } = await supabase
    .from("Search")
    .select("*")
    .eq("slug", body.slug)
    .maybeSingle();

  if (!data || error) {
    const response = await generate(body.query);

    await supabase.from("Search").insert([
      {
        slug: body.slug,
        response: response.response,
        links: response.links,
        query: body.query,
      },
    ]);

    return json({ data: response });
  } else {
    return json({ data: data });
  }
}
