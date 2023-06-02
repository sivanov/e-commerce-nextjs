import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout";

export default function Home() {
  // renaming data to session for feature reusing
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
      </div>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6" />
        <span className="px-2">{session?.user?.name}</span>
      </div>
    </Layout>
  );
}
