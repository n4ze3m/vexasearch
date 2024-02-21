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
      className="border  dark:border-gray-700 text-slate-900 dark:text-slate-50  md:hover:text-slate-700 md:dark:hover:text-slate-200  justify-center text-center items-center rounded-full cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-xs px-3 font-medium h-6"
    >
      {name}
    </button>
  );
};

export const HomeExampleSearch = () => {
  const query = [
    "Generate Image of Astronaut Riding a Horse",
    "Who won this year's Super Bowl?",
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
