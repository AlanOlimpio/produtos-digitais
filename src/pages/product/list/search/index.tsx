import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import * as z from "zod";

import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ? searchParams.get("q") : undefined;

  const { setValue, register, watch } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: searchQuery || "",
    },
  });
  const searchValue = watch("query");

  const debouncedValue = useDebounce(searchValue);
  const isFirstLoad = useRef(true);

  function handleSearch(query: string) {
    if (query) {
      setSearchParams((params) => {
        params.set("q", query);
        return params;
      });
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    if (searchQuery) {
      setValue("query", searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      placeholder="Pesquisar"
      className="h-8 w-full max-w-[320px]"
      {...register("query")}
    />
  );
}
