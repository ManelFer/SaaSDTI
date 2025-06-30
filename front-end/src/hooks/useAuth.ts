
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseConfig";

export default function useAuth(protectedRouter = false) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // firebaseUser é do tipo User | null
      setLoading(false);

      if (protectedRouter && !firebaseUser) {
        router.push("/login");
      } else if (!protectedRouter && firebaseUser) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [protectedRouter, router]);

  return { user, loading };
}
