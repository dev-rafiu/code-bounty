import { createContext, useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import type { AppContextType, TBounty } from "../types";
import type { AuthResponse, UserData } from "../types/auth";
import { auth, db } from "../config/firebase";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [selectedBounty, setSelectedBounty] = useState<TBounty | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setUser({
              success: true,
              user: {
                ...userData,
                displayName: firebaseUser.displayName,
              },
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
      }

      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        selectedBounty,
        setSelectedBounty,
        isAuthLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
