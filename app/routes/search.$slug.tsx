import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect, useLoaderData, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { SkeletonLoading } from "~/components/Common/Skeleton";
import { SearchForm } from "~/components/Search/Form";
import Markdown from "~/components/Search/Markdown";
import { SearchSources } from "~/components/Search/Source";
import { encodeSlug } from "~/utils/slug";
import { createClient } from "~/utils/supabase.server";

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

export const meta: MetaFunction = () => {
  return [
    { title: "Search / Vexa Search" },
    { name: "description", content: "Search the internet with powerful AI" },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const supabase = createClient(request);

  const slug = params.slug as string;

  const { data, error } = await supabase
    .from("Query")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    return json({
      query: decodeURI(slug),
      slug: slug,
    });
  }

  return json({
    query: data.query,
    slug: data.slug,
  });
}

export default function Index() {
  const { query, slug } = useLoaderData<typeof loader>();

  const { data, status } = useQuery({
    queryKey: ["search", slug],
    queryFn: async () => {
      const response = await fetch("/api/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, slug }),
      });

      if (!response.ok) {
        throw new Error("An error has occurred");
      }

      const data = (await response.json()) as {
        data: {
          response: string;
          links: string[];
        };
      };

      return data.data;
    },
    enabled: !!slug,
  });

  return (
    <div className="flex p-6 flex-col items-center justify-center h-screen  bg-[#0C0C0C] text-white w-full">
      <div className="max-w-2xl w-full  mb-4 h-screen max-h-screen">
        <SearchForm q={query} />
        {status === "pending" ? <SkeletonLoading /> : null}
        {status === "success" && data ? (
          <div className="mt-12">
            <Markdown message={data.response} />

            <SearchSources links={data?.links || []} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
