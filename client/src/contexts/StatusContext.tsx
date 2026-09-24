import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type ProfileType = "Rapper / MC" | "Beatmaker" | "Produtor" | "Organizador de eventos" | "Selo / Coletivo" | "Fotógrafo / Videomaker" | "Designer";

const statusByProfile: Record<ProfileType, string[]> = {
  "Rapper / MC": ["Buscando colaboração", "Buscando beat", "Buscando produtor", "Gravando projeto", "Lançando música", "Divulgando trabalho", "Buscando shows", "Disponível para feat", "Buscando grupo"],
  Beatmaker: ["Disponível para beats", "Vendendo beats", "Buscando MCs", "Buscando produtor", "Produzindo projeto", "Aceitando encomendas", "Disponível para collab"],
  Produtor: ["Buscando artistas", "Produzindo projeto", "Disponível para collab", "Buscando MCs", "Buscando beatmakers", "Aceitando projetos"],
  "Organizador de eventos": ["Buscando artistas", "Montando evento", "Buscando atrações", "Buscando parceiros", "Buscando patrocinadores", "Aceitando inscrições"],
  "Selo / Coletivo": ["Buscando artistas", "Buscando produtores", "Buscando lançamentos", "Aceitando demos", "Buscando parcerias"],
  "Fotógrafo / Videomaker": ["Disponível para eventos", "Buscando artistas", "Aceitando projetos", "Disponível para collab", "Produzindo portfólio"],
  Designer: ["Disponível para projetos", "Buscando artistas", "Aceitando encomendas", "Disponível para collab"],
};

type StatusContextValue = {
  profileTypes: ProfileType[];
  availableStatuses: string[];
  customStatuses: string[];
  selectedStatuses: string[];
  addStatus: (status: string) => void;
  removeStatus: (status: string) => void;
  toggleStatus: (status: string) => void;
};

const StatusContext = createContext<StatusContextValue | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
  const profileTypes: ProfileType[] = ["Rapper / MC"];
  const [customStatuses, setCustomStatuses] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["Buscando colaboração"]);
  const availableStatuses = useMemo(() => Array.from(new Set([...profileTypes.flatMap((type) => statusByProfile[type]), ...customStatuses])), [customStatuses]);
  const addStatus = (status: string) => {
    const clean = status.trim();
    if (!clean || availableStatuses.includes(clean)) return;
    setCustomStatuses((current) => [...current, clean]);
    setSelectedStatuses((current) => current.includes(clean) ? current : [...current, clean]);
  };
  const removeStatus = (status: string) => {
    setCustomStatuses((current) => current.filter((item) => item !== status));
    setSelectedStatuses((current) => current.filter((item) => item !== status));
  };
  const toggleStatus = (status: string) => setSelectedStatuses((current) => current.includes(status) ? current.filter((item) => item !== status) : [...current, status]);
  return <StatusContext.Provider value={{ profileTypes, availableStatuses, customStatuses, selectedStatuses, addStatus, removeStatus, toggleStatus }}>{children}</StatusContext.Provider>;
}

export function useStatuses() {
  const context = useContext(StatusContext);
  if (!context) throw new Error("useStatuses must be used within StatusProvider");
  return context;
}
