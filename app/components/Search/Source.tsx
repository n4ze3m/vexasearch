import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export const SearchSourceCard = ({ url }: { url: string }) => {
  const hostname = new URL(url).hostname;
  return (
    <a
      href={url}
      target="_blank"
      className=" truncate bg-[#222831] text-slate-50  md:hover:text-slate-700 md:dark:hover:text-slate-200   text-center items-center rounded-md cursor-point active:scale-95 origin-center whitespace-nowrap inline-flex text-xs px-3 font-medium h-6"
    >
      {hostname}
      <ArrowUpRightIcon className="h-3 w-3 ml-1" />
    </a>
  );
};

export const SearchSources = ({ links }: { links: string[] }) => {
  if (links.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-12">
      <span className="text-lg font-bold dark:text-white text-slate-900">
        Sources
      </span>
      <div className="flex mt-4 flex-wrap gap-4 items-start md:items-center md:gap-4">
        {links.map((url, i) => (
          <SearchSourceCard key={i} url={url} />
        ))}
      </div>
    </div>
  );
};
