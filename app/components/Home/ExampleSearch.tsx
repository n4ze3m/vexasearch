import { Form} from "@remix-run/react";
import React from "react";

export const HomeExampleSearchCard = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className=" truncate  bg-[#222831] text-slate-50  md:hover:text-slate-700 md:dark:hover:text-slate-200   text-center items-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-xs px-3 font-medium h-6"
    >
      {name}
    </button>
  );
};

export const HomeExampleSearch = () => {
  const query = [
    "What available models are mentioned on this site: https://readme.fireworks.ai/docs/querying-embeddings-models?",
    "Generate Image of Astronaut Riding a Horse",
    "When is Juventus' next game?",
    "How many kilometers from Washingto D.C. to Miami Beach?",
  ];

  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Form
      method="POST"
      className="flex flex-wrap gap-4 md:items-center md:justify-center md:gap-4"
    >
      <input type="hidden" name="query" value={searchQuery} />
      {query.map((q, i) => (
        <HomeExampleSearchCard
          key={i}
          name={q}
          onClick={() => {
            setSearchQuery(q);
          }}
        />
      ))}
    </Form>
  );
};
