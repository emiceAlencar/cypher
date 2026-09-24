import { createContext, useContext, useState, type ReactNode } from "react";

const defaultCapabilities = ["Composição", "Rap alternativo", "Trap", "Disponível para feat", "Produção vocal", "Performance ao vivo", "Direção artística", "Escrita criativa"];

type CapabilitiesContextValue = {
  capabilities: string[];
  pendingCapabilities: string[];
  availableCapabilities: string[];
  toggleCapability: (capability: string) => void;
  requestCapability: (capability: string) => boolean;
};

const CapabilitiesContext = createContext<CapabilitiesContextValue | undefined>(undefined);

export function CapabilitiesProvider({ children }: { children: ReactNode }) {
  const [capabilities, setCapabilities] = useState<string[]>(["Composição", "Rap alternativo", "Disponível para feat"]);
  const [pendingCapabilities, setPendingCapabilities] = useState<string[]>([]);
  const toggleCapability = (capability: string) => setCapabilities((current) => current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability]);
  const requestCapability = (capability: string) => {
    const clean = capability.trim();
    if (!clean || defaultCapabilities.includes(clean) || capabilities.includes(clean) || pendingCapabilities.includes(clean)) return false;
    setPendingCapabilities((current) => [...current, clean]);
    return true;
  };
  return <CapabilitiesContext.Provider value={{ capabilities, pendingCapabilities, availableCapabilities: defaultCapabilities, toggleCapability, requestCapability }}>{children}</CapabilitiesContext.Provider>;
}

export function useCapabilities() {
  const context = useContext(CapabilitiesContext);
  if (!context) throw new Error("useCapabilities must be used within CapabilitiesProvider");
  return context;
}
