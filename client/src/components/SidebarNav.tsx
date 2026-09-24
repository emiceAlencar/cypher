import { useState, type ComponentType } from "react";
import { Award, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, Disc3, FileText, Home, Plus, Search, Settings2, UserRound, X } from "lucide-react";
import { Link } from "wouter";
import { useStatuses } from "../contexts/StatusContext";

type IconType = ComponentType<{ size?: number; className?: string }>;
type NavItem = { label: string; href: string; icon: IconType; badge?: string };

type SidebarNavProps = {
  location: string;
  mobileNav: boolean;
  onClose: () => void;
  onNavigate: () => void;
};

const navItems: NavItem[] = [
  { label: "Início", href: "/dashboard", icon: Home },
  { label: "Buscar pessoas", href: "/search", icon: Search },
  { label: "Oportunidades", href: "/events", icon: CalendarDays, badge: "4" },
  { label: "Obras e créditos", href: "/works", icon: FileText },
  { label: "Banco de Beats", href: "/beats", icon: Disc3 },
  { label: "Cypher Central", href: "/central", icon: BookOpen },
];

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: () => void }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} onClick={onNavigate} className={active ? "side-link active" : "side-link"}>
      <Icon size={17} />
      <span>{item.label}</span>
      {item.badge && <b>{item.badge}</b>}
    </Link>
  );
}

export default function SidebarNav({ location, mobileNav, onClose, onNavigate }: SidebarNavProps) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [customStatus, setCustomStatus] = useState("");
  const { availableStatuses, customStatuses, selectedStatuses, addStatus, removeStatus, toggleStatus } = useStatuses();
  const primaryStatus = selectedStatuses[0] || "Definir status";
  const submitCustomStatus = () => { addStatus(customStatus); setCustomStatus(""); };

  return (
    <aside className={mobileNav ? "sidebar sidebar-open" : "sidebar"}>
      <div className="sidebar-top">
        <div className="sidebar-brand-row">
          <Link href="/dashboard" className="logo logo-compact" aria-label="Ir para o início">
            <span className="logo-mark"><span /> <span /> <span /></span>
            <span className="logo-word">CYPHER</span>
          </Link>
          <button className="icon-button mobile-close" onClick={onClose} aria-label="Fechar menu"><span aria-hidden="true">×</span></button>
        </div>
        <div className="status-control">
          <button className="status-trigger" onClick={() => setStatusOpen(!statusOpen)} aria-expanded={statusOpen} aria-controls="status-menu"><span className="status-dot" /><span><small>MEU STATUS</small><strong>{primaryStatus}</strong></span><ChevronDown size={14} aria-hidden="true" /></button>
          {statusOpen && <div className="status-menu" id="status-menu"><div className="status-menu-heading"><span>SELECIONE SEUS STATUS</span><button onClick={() => setStatusOpen(false)} aria-label="Fechar status"><X size={14} /></button></div><p className="status-menu-copy">Visível no seu perfil e no dashboard.</p><div className="status-options">{availableStatuses.map((status) => <button key={status} className={selectedStatuses.includes(status) ? "status-option selected" : "status-option"} onClick={() => toggleStatus(status)}><span>{status}</span>{selectedStatuses.includes(status) && <Check size={14} />}</button>)}</div><div className="status-custom"><input value={customStatus} onChange={(event) => setCustomStatus(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") submitCustomStatus(); }} placeholder="Criar status próprio" maxLength={42} /><button onClick={submitCustomStatus} aria-label="Adicionar status"><Plus size={15} /></button></div>{customStatuses.map((status) => <button key={status} className="status-remove" onClick={() => removeStatus(status)}>Remover “{status}”</button>)}</div>}
        </div>
      </div>
      <nav className="side-nav" aria-label="Navegação principal">
        <span className="nav-label">NAVEGAR</span>
        {navItems.map((item) => <NavLink key={item.href} item={item} active={location === item.href || (item.href === "/dashboard" && location === "/")} onNavigate={onNavigate} />)}
        <span className="nav-label nav-label-spaced">SEU ESPAÇO</span>
        <NavLink item={{ label: "Meu perfil", href: "/profile", icon: UserRound }} active={location === "/profile"} onNavigate={onNavigate} />
        <NavLink item={{ label: "Configurações", href: "/settings", icon: Settings2 }} active={location === "/settings"} onNavigate={onNavigate} />
      </nav>
      <div className="sidebar-bottom">
        <div className="reputation-mini">
          <div className="mini-heading"><span>REPUTAÇÃO PROFISSIONAL</span><Award size={15} /></div>
          <div className="rep-number">78<span>/100</span></div>
          <div className="rep-bar"><i /></div>
          <p>+6 desde sua última participação</p>
        </div>
        <Link href="/profile" className="user-mini" onClick={onNavigate} aria-label="Abrir perfil de Marina Costa"><div className="avatar avatar-yellow">MC</div><div><strong>Marina Costa</strong><span>Rapper / MC</span></div><ChevronRight size={15} /></Link>
      </div>
    </aside>
  );
}
