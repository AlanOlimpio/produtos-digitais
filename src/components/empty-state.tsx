import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function EmptyState() {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("q") ? searchParams.get("q") : undefined;
  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    if (querySearch) {
      setSearch(querySearch);
    } else {
      setSearch("");
    }
  }, [querySearch]);
  return (
    <div className="flex mt-4 min-h-[200px] flex-col items-center justify-center gap-2">
      {search && (
        <p className="">
          Nenhum produto encontrado pelo termo pesquisado:{" "}
          <strong>{search}</strong>.
        </p>
      )}
      {!search && (
        <>
          <h1 className="text-2xl font-bold">Nenhum produto cadastrado.</h1>
          <div className="mt-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 max-sm:w-full"
            >
              Cadastrar produto
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
