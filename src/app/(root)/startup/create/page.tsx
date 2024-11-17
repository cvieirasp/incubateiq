import { redirect } from "next/navigation";

import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";

const CreatePage = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="gold_container !min-h-[230px]">
        <h1 className="heading">Registre sua Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default CreatePage;
