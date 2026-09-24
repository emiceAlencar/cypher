import { Activity, Plus } from "lucide-react";
import { Link } from "wouter";
import { useStatuses } from "../contexts/StatusContext";

export default function StatusChips({ compact = false }: { compact?: boolean }) {
  const { selectedStatuses } = useStatuses();
  return <div className={compact ? "status-view compact" : "status-view"}><div className="status-view-heading"><span><Activity size={14} /> {compact ? "STATUS ATUAL" : "MEU STATUS"}</span><Link href="/settings">Editar <Plus size={12} /></Link></div>{selectedStatuses.length > 0 ? <div className="status-view-chips">{selectedStatuses.map((status) => <span className="status-view-chip" key={status}>{status}</span>)}</div> : <p className="status-empty">Nenhum status selecionado. <Link href="/settings">Adicionar</Link></p>}</div>;
}
