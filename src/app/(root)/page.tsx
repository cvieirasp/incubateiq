import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

const posts = [
  {
    _id: 1,
    title: "Startup 1",
    description: "Descrição da Startup 1",
    image:
      "https://www.fumec.br/wp-content/uploads/2024/07/team_party2-01-scaled.jpg",
    views: 10,
    category: "Tecnologia",
    createdAt: new Date(),
    author: { _id: 1, name: "John Doe" },
  },
];

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;

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
    </>
  );
}
