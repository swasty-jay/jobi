import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/Firebase";

const ADMIN_EMAILS = ["amekpoagbedaniel@gmail.com"];

export function useAdminAuth() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(
        !!currentUser &&
          !!currentUser.email &&
          ADMIN_EMAILS.includes(currentUser.email)
      );
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin };
}
