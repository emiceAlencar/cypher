import { createContext, useContext, useState, type ReactNode } from "react";

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
  const [mode, setMode] = useState<SessionMode>("signed-out");
  const [authScreen, setAuthScreen] = useState<"login" | "register">("login");
  const startSession = (nextMode: Exclude<SessionMode, "signed-out">) => setMode(nextMode);
  const endSession = () => { setMode("signed-out"); setAuthScreen("login"); };
  const openRegister = () => setAuthScreen("register");

  return <SessionContext.Provider value={{ mode, authScreen, startSession, endSession, openRegister }}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}
