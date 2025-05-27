import { createContext, useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import type { AppContextType, TBounty } from "../definitions";
import type { AuthResponse, UserData } from "../definitions/auth";
import { auth, db } from "../firebase";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState("home");
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [selectedBounty, setSelectedBounty] = useState<TBounty | null>(null);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
