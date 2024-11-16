import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="gold_container">
        <h1 className="heading">
          Apresente sua Startup, <br /> Conecte-se com Empresários
        </h1>

        <p className="sub-heading !max-w-3xl">
          Envie suas ideias, vote em apresentações e seja notado em competições
          virtuais.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Resultados para "${query}"` : "Últimas Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">Nenhuma Startup encontrada...</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
