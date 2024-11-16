import Form from "next/form";
import { Search } from "lucide-react";

import SearchFormReset from "@/components/SearchFormReset";

type SearchFormProps = {
  query?: string;
};

const SearchForm = ({ query }: SearchFormProps) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Pesquisar Startups..."
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;