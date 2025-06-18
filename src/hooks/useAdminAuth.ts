import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/Firebase";

const ADMIN_EMAILS = ["amekpoagbedaniel@gmail.com"];

type AdminAuthState = {
  user: User | null;
  isAdmin: boolean;
};

export function useAdminAuth() {
  const [user, setUser] = useState<AdminAuthState | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const isAdmin =
        !!currentUser &&
        !!currentUser.email &&
        ADMIN_EMAILS.includes(currentUser.email);
      setUser({ user: currentUser, isAdmin });
      setIsAdmin(isAdmin);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin };
}
