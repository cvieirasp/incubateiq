import Link from "next/link";
import Image from "next/image";

import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-roboto">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Criar</span>
              </Link>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Sair</span>
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Entrar</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
