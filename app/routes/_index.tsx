import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { HomeExampleSearch } from "~/components/Home/ExampleSearch";
import { HomeForm } from "~/components/Home/Form";
import { encodeSlug } from "~/utils/slug";
import { createClient } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Vexa Search" },
    { name: "description", content: "Search the internet with powerful AI" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  const values = Object.fromEntries(formData) as { query: string };

  const slug = encodeSlug(values.query);
  const supabase = createClient(request);

  await supabase.from("Query").insert([
    {
      query: values.query,
      slug: slug,
    },
  ]);

  return redirect(`/search/${slug}`);
}

export default function Index() {
  return (
    <div className="flex p-6 flex-col items-center justify-center h-screen  bg-[#0C0C0C] text-white w-full">
      <div className="mb-6">
        <h1 className="text-2xl text-center text-white">
          What you want to do today?
        </h1>
      </div>
      <HomeForm />
      <div className="mt-6 w-full  max-w-4xl">
        <HomeExampleSearch />
      </div>
    </div>
  );
}
