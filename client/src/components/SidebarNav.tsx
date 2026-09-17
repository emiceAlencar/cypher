import type { ComponentType } from "react";
import { Award, BookOpen, CalendarDays, ChevronDown, ChevronRight, Disc3, FileText, Home, Search, Settings2, UserRound } from "lucide-react";

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
    <a href={item.href} onClick={onNavigate} className={active ? "side-link active" : "side-link"}>
      <Icon size={17} />
      <span>{item.label}</span>
      {item.badge && <b>{item.badge}</b>}
    </a>
  );
}

export default function SidebarNav({ location, mobileNav, onClose, onNavigate }: SidebarNavProps) {
  return (
    <aside className={mobileNav ? "sidebar sidebar-open" : "sidebar"}>
      <div className="sidebar-top">
        <div className="sidebar-brand-row">
          <a href="/dashboard" className="logo logo-compact" aria-label="Ir para o início">
            <span className="logo-mark"><span /> <span /> <span /></span>
            <span className="logo-word">CYPHER</span>
          </a>
          <button className="icon-button mobile-close" onClick={onClose} aria-label="Fechar menu"><span aria-hidden="true">×</span></button>
        </div>
        <div className="workspace-chip"><span className="status-dot" /> Espaço de trabalho <ChevronDown size={14} /></div>
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
        <div className="user-mini"><div className="avatar avatar-yellow">MC</div><div><strong>Marina Costa</strong><span>Rapper / MC</span></div><ChevronRight size={15} /></div>
      </div>
    </aside>
  );
}
