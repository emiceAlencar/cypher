import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type SessionMode = "signed-out" | "user" | "guest";

type SessionContextValue = {
  mode: SessionMode;
  authScreen: "login" | "register";
  startSession: (mode: Exclude<SessionMode, "signed-out">) => void;
  endSession: () => void;
  openRegister: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SessionMode>(() => {
    try {
      const stored = sessionStorage.getItem("cypher-session");
      return stored === "user" || stored === "guest" ? stored : "signed-out";
    } catch {
      return "signed-out";
    }
  });
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");
  const startSession = (nextMode: Exclude<SessionMode, "signed-out">) => setMode(nextMode);
  const endSession = () => { setMode("signed-out"); setAuthScreen("login"); };
  const openRegister = () => setAuthScreen("register");

  useEffect(() => {
    try {
      if (mode === "signed-out") sessionStorage.removeItem("cypher-session");
      else sessionStorage.setItem("cypher-session", mode);
    } catch {
      // Sessão em memória continua funcionando quando o armazenamento da aba não está disponível.
    }
  }, [mode]);

  return <SessionContext.Provider value={{ mode, authScreen, startSession, endSession, openRegister }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}
