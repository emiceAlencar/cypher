import { Link } from "wouter";
import { useCapabilities } from "../contexts/CapabilitiesContext";

export default function CapabilityChips({ compact = false }: { compact?: boolean }) {
  const { capabilities } = useCapabilities();
  return <div className={compact ? "capability-view compact" : "capability-view"}><div className="capability-view-heading"><span>{compact ? "CAPACIDADES" : "MINHAS CAPACIDADES"}</span>{!compact && <Link href="/settings">Editar</Link>}</div><div className="capability-chips">{capabilities.map((capability) => <span className="capability-chip" key={capability}>{capability}</span>)}</div></div>;
}
