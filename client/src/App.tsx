import { useMemo, useState, type ReactNode } from "react";
import { Toaster, toast } from "sonner";
import { Route, Switch, useLocation } from "wouter";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Disc3,
  FileText,
  Filter,
  Headphones,
  HeartHandshake,
  Home,
  Layers3,
  MapPin,
  Menu,
  Mic2,
  Music2,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import SidebarNav from "./components/SidebarNav";
import "./index.css";

type IconType = typeof Home;

const people = [
  { name: "Nina Sincera", role: "Rapper / MC", city: "São Paulo, SP", tag: "Rap alternativo", tone: "yellow", initials: "NS" },
  { name: "Kota 47", role: "Beatmaker", city: "Belo Horizonte, MG", tag: "Boom bap · 92 BPM", tone: "green", initials: "K4" },
  { name: "Léo Goma", role: "Produtor musical", city: "Rio de Janeiro, RJ", tag: "Trap · R&B", tone: "black", initials: "LG" },
  { name: "DJ Miro", role: "DJ", city: "Curitiba, PR", tag: "Sets · Eventos", tone: "cream", initials: "DM" },
];

const events = [
  { title: "Batalha da Praça 011", category: "Batalha", date: "18 OUT", location: "Praça Roosevelt · São Paulo", org: "Coletivo Linha 5", status: "Inscrições abertas", color: "yellow" },
  { title: "Cypher Subsolo #08", category: "Cypher", date: "25 OUT", location: "Galpão 9 · Belo Horizonte", org: "Núcleo Subsolo", status: "Acontece em 16 dias", color: "green" },
  { title: "Workshop: créditos sem ruído", category: "Workshop", date: "03 NOV", location: "Online · Sala Cypher", org: "Cypher Central", status: "Vagas limitadas", color: "cream" },
];

const beats = [
  { title: "Semáforo quebrado", producer: "Kota 47", bpm: "92 BPM", key: "Dm", genre: "Boom bap", license: "Uso gratuito", duration: "2:48", color: "green" },
  { title: "Linha de fuga", producer: "Léo Goma", bpm: "140 BPM", key: "F#m", genre: "Trap", license: "Disponível", duration: "3:12", color: "yellow" },
  { title: "Domingo nublado", producer: "Aisha Beats", bpm: "78 BPM", key: "Am", genre: "Lo-fi rap", license: "Disponível", duration: "2:31", color: "black" },
];

const works = [
  { title: "Cidade em silêncio", type: "Single", status: "Em produção", meta: "2024 · Rap alternativo", credits: 4 },
  { title: "Margem & centro", type: "EP", status: "Lançado", meta: "2023 · 5 faixas", credits: 8 },
  { title: "Pé no asfalto", type: "Single", status: "Rascunho", meta: "2024 · Boom bap", credits: 2 },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "logo logo-compact" : "logo"}>
      <span className="logo-mark"><span /> <span /> <span /></span>
      <span className="logo-word">CYPHER</span>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="bottom-right" theme="dark" richColors />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={AppShell} />
        <Route path="/:rest*" component={AppShell} />
      </Switch>
    </>
  );
}

function AppShell() {
  const [location] = useLocation();
  const [mobileNav, setMobileNav] = useState(false);
  const content = getRouteContent(location);
  return (
    <div className="app-shell">
      <SidebarNav location={location} mobileNav={mobileNav} onClose={() => setMobileNav(false)} onNavigate={() => setMobileNav(false)} />
      {mobileNav && <button className="mobile-overlay" onClick={() => setMobileNav(false)} aria-label="Fechar navegação" />}
      <main className="main-shell">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{content.eyebrow}</strong></div>
          <div className="topbar-actions">{(location === "/" || location === "/dashboard") && <button className="topbar-search" onClick={() => toast("Busca rápida ativada")} aria-label="Buscar"><Search size={16} /> Buscar <span className="shortcut">⌘ K</span></button>}<button className="icon-button" onClick={() => toast("Você está em dia — nenhuma notificação nova.")} aria-label="Notificações"><Bell size={18} /><i className="notification-dot" /></button><div className="topbar-avatar">MC</div></div>
        </header>
        <div className="page-content">{content.node}</div>
      </main>
    </div>
  );
}

function getRouteContent(location: string) {
  if (location.startsWith("/search")) return { eyebrow: "Buscar pessoas", node: <SearchPage /> };
  if (location.startsWith("/events")) return { eyebrow: "Oportunidades", node: <EventsPage /> };
  if (location.startsWith("/works")) return { eyebrow: "Obras e créditos", node: <WorksPage /> };
  if (location.startsWith("/beats")) return { eyebrow: "Banco de Beats", node: <BeatsPage /> };
  if (location.startsWith("/central")) return { eyebrow: "Cypher Central", node: <CentralPage /> };
  if (location.startsWith("/profile")) return { eyebrow: "Meu perfil", node: <ProfilePage /> };
  return { eyebrow: "Visão geral", node: <DashboardPage /> };
}

function PageHeader({ eyebrow, title, description, action, descriptionClassName }: { eyebrow: string; title: ReactNode; description: ReactNode; action?: ReactNode; descriptionClassName?: string }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className={descriptionClassName}>{description}</p></div>{action}</div>;
}

function DashboardPage() {
  return <div className="dashboard-page">
    <PageHeader eyebrow="QUARTA-FEIRA · 09 OUT 2024" title={<>A cena se move quando<br /><em>a gente se conecta.</em></>} description="Bom te ver, Marina. Aqui está o que está acontecendo no seu espaço." />
    <section className="hero-grid">
      <div className="hero-card lime-card"><div className="hero-card-top"><span className="pill pill-dark">SEU CICLO</span><ArrowUpRight size={20} /></div><h2>Descobrir.<br />Conectar.<br /><span>Criar.</span></h2><p>O Cypher organiza o caminho entre uma oportunidade e a próxima obra.</p><div className="cycle-stamp"><span>01</span><div><strong>Próximo passo</strong><b>Encontrar colaboradores</b></div><ChevronRight size={18} /></div></div>
      <div className="stat-stack"><StatCard label="Obras em andamento" value="03" detail="+1 este mês" icon={FileText} accent="yellow" /><StatCard label="Conexões profissionais" value="28" detail="4 aguardando resposta" icon={UsersRound} accent="white" /></div>
      <div className="accent-note"><Sparkles size={18} /><span>IDEIA DO DIA</span><p>“Crédito bem organizado abre portas que o talento sozinho não abre.”</p><small>— Cypher Central</small></div>
    </section>
    <div className="section-heading"><div><div className="eyebrow">SEU MAPA AGORA</div><h2>O que pede sua atenção</h2></div><a href="/events" className="text-link">Ver tudo <ArrowUpRight size={15} /></a></div>
    <section className="attention-grid"><div className="agenda-card card-surface"><div className="card-heading"><div><span className="eyebrow">PRÓXIMOS EVENTOS</span><h3>Na sua rota</h3></div><CalendarDays size={20} /></div>{events.slice(0, 2).map((event) => <EventRow key={event.title} event={event} />)}<a href="/events" className="card-footer-link">Explorar oportunidades <ArrowUpRight size={14} /></a></div><div className="people-card card-surface"><div className="card-heading"><div><span className="eyebrow">PESSOAS PARA CONHECER</span><h3>Conexões que fazem sentido</h3></div><HeartHandshake size={20} /></div>{people.slice(0, 3).map((person) => <PersonRow key={person.name} person={person} />)}<a href="/search" className="card-footer-link">Buscar na cena <ArrowUpRight size={14} /></a></div></section>
    <section className="cycle-section"><div className="section-heading compact"><div><div className="eyebrow">O CICLO CYPHER</div><h2>Da oportunidade à reputação</h2></div></div><div className="cycle-line">{["Descobrir oportunidades", "Encontrar profissionais", "Formar conexões", "Desenvolver projetos", "Organizar obras", "Construir reputação"].map((label, index) => <div className={index < 2 ? "cycle-step current" : "cycle-step"} key={label}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b>{index < 5 && <ChevronRight size={17} />}</div>)}</div></section>
  </div>;
}

function StatCard({ label, value, detail, icon: Icon, accent }: { label: string; value: string; detail: string; icon: IconType; accent: string }) { return <div className={`stat-card stat-${accent}`}><div className="stat-icon"><Icon size={17} /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }

function EventRow({ event }: { event: typeof events[number] }) { return <div className="event-row"><div className={`date-tile date-${event.color}`}><strong>{event.date.split(" ")[0]}</strong><span>{event.date.split(" ")[1]}</span></div><div className="row-info"><strong>{event.title}</strong><span>{event.category} · {event.location}</span></div><ChevronRight size={16} /> </div>; }
function PersonRow({ person }: { person: typeof people[number] }) { return <div className="person-row"><div className={`avatar avatar-${person.tone}`}>{person.initials}</div><div className="row-info"><strong>{person.name}</strong><span>{person.role} · {person.city}</span></div><button className="round-arrow" onClick={() => toast(`Perfil de ${person.name} aberto`)} aria-label={`Abrir perfil de ${person.name}`}><ArrowUpRight size={15} /></button></div>; }

function SearchPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => people.filter(p => `${p.name} ${p.role} ${p.city} ${p.tag}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div><PageHeader eyebrow="EXPLORAR A CENA" title="Buscar pessoas" description="Encontre profissionais por função, localização e estilo — sem ruído." action={<button className="button button-lime" onClick={() => toast("Filtros salvos para esta sessão") }><Filter size={16} /> Filtros</button>} /><div className="search-toolbar"><div className="search-input-wrap"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Busque por nome, função, cidade ou estilo" /><kbd>⌘ K</kbd></div><div className="filter-chips"><button className="filter-chip active">Todas as funções <ChevronDown size={14} /></button><button className="filter-chip">Localização <ChevronDown size={14} /></button><button className="filter-chip">Estilo musical <ChevronDown size={14} /></button></div></div><div className="results-meta"><span><strong>{filtered.length}</strong> profissionais encontrados</span><span>Mais relevantes <ChevronDown size={14} /></span></div><div className="people-grid">{filtered.map(person => <ProfileCard key={person.name} person={person} />)}</div>{filtered.length === 0 && <EmptyState title="Nada encontrado ainda" description="Tente buscar por outra função, cidade ou estilo." />}</div>;
}

function ProfileCard({ person }: { person: typeof people[number] }) { return <article className="profile-card"><div className={`profile-card-top tone-${person.tone}`}><div className={`avatar avatar-${person.tone}`}>{person.initials}</div><span className="availability"><i /> Disponível</span><button className="dots-button" onClick={() => toast("Mais opções em breve")}>•••</button></div><div className="profile-card-body"><h3>{person.name}</h3><p className="role-line">{person.role}</p><div className="profile-detail"><MapPin size={14} /> {person.city}</div><div className="tag-line"><span>{person.tag}</span></div><div className="profile-card-actions"><button className="button button-dark small" onClick={() => toast(`Solicitação enviada para ${person.name}`)}>Conectar</button><button className="icon-button border-button" onClick={() => toast(`Perfil de ${person.name} aberto`)} aria-label="Ver perfil"><ArrowUpRight size={16} /></button></div></div></article>; }

function EventsPage() { const [active, setActive] = useState("Todos"); const categories = ["Todos", "Batalhas", "Shows", "Cyphers", "Workshops"]; return <div><PageHeader eyebrow="OPORTUNIDADES" title="A cena está chamando." description="Eventos, encontros e espaços para colocar seu trabalho em movimento." action={<button className="button button-yellow" onClick={() => toast("Fluxo de inscrição iniciado") }><Plus size={17} /> Demonstrar interesse</button>} /><div className="tabs-row">{categories.map(cat => <button key={cat} className={active === cat ? "tab active" : "tab"} onClick={() => setActive(cat)}>{cat}</button>)}<span className="tabs-count">12 oportunidades neste mês</span></div><div className="events-layout"><div className="events-list">{events.map((event, i) => <article className="event-card" key={event.title}><div className={`event-card-band band-${event.color}`}><span>{String(i + 1).padStart(2, "0")}</span><span>{event.category}</span></div><div className="event-card-content"><div className="event-date-large"><strong>{event.date.split(" ")[0]}</strong><span>{event.date.split(" ")[1]}</span></div><div className="event-main"><h3>{event.title}</h3><p>{event.org}</p><div className="event-meta"><span><MapPin size={14} />{event.location}</span><span><Clock3 size={14} />{event.status}</span></div></div><button className="round-arrow dark" onClick={() => toast(`Detalhes de ${event.title}`)} aria-label="Ver detalhes"><ArrowUpRight size={17} /></button></div></article>)}</div><aside className="event-side card-surface"><div className="eyebrow">HISTÓRICO</div><h3>Seu rastro na cena</h3><div className="history-number">07<span> participações</span></div><div className="history-bar"><i /></div><p>Você esteve em 3 categorias diferentes este ano.</p><div className="history-list"><span><i className="dot yellow-dot" />Batalhas <b>03</b></span><span><i className="dot green-dot" />Workshops <b>02</b></span><span><i className="dot black-dot" />Cyphers <b>02</b></span></div><button className="button button-outline full" onClick={() => toast("Histórico completo em breve")}>Ver histórico completo</button></aside></div></div>; }

function WorksPage() { const [open, setOpen] = useState(false); return <div><PageHeader eyebrow="ORGANIZAÇÃO PROFISSIONAL" title="Obras e créditos" description="Um lugar claro para guardar sua trajetória e reconhecer quem constrói com você." action={<button className="button button-lime" onClick={() => setOpen(true)}><Plus size={17} /> Nova obra</button>} /><div className="works-overview"><div className="work-overview-card dark"><span>CATÁLOGO</span><strong>08</strong><p>obras registradas</p><FileText size={36} /></div><div className="work-overview-card yellow"><span>CRÉDITOS MAPEADOS</span><strong>31</strong><p>participações organizadas</p><UsersRound size={36} /></div><div className="work-overview-card white"><span>EM ANDAMENTO</span><strong>03</strong><p>obras pedem atenção</p><Clock3 size={36} /></div></div><div className="works-toolbar"><div><div className="eyebrow">SEU CATÁLOGO</div><h2>Obras recentes</h2></div><div className="filter-chips"><button className="filter-chip active">Todas <ChevronDown size={14} /></button><button className="filter-chip">Status <ChevronDown size={14} /></button></div></div><div className="works-table"><div className="works-table-head"><span>OBRA</span><span>TIPO</span><span>STATUS</span><span>CRÉDITOS</span><span /></div>{works.map((work, i) => <div className="work-row" key={work.title}><div className="work-title"><div className={`work-index index-${i}`}>{String(i + 1).padStart(2, "0")}</div><div><strong>{work.title}</strong><span>{work.meta}</span></div></div><span className="type-label">{work.type}</span><span className={`status-label status-${work.status.toLowerCase().replace(" ", "-")}`}><i />{work.status}</span><span className="credits-count"><UsersRound size={15} />{work.credits}</span><button className="round-arrow" onClick={() => toast(`Abrindo ${work.title}`)} aria-label="Abrir obra"><ArrowUpRight size={15} /></button></div>)}</div><div className="ghost-credit"><div className="ghost-icon"><UserRound size={19} /></div><div><strong>Menções Fantasma</strong><p>Registre uma participação mesmo quando a pessoa ainda não tem conta no Cypher.</p></div><button className="text-link" onClick={() => toast("Menção Fantasma adicionada à obra")}>Adicionar <Plus size={14} /></button></div>{open && <Modal title="Cadastrar nova obra" onClose={() => setOpen(false)}><div className="form-grid"><label>Título da obra<input placeholder="Ex.: Cidade em silêncio" /></label><label>Tipo de lançamento<select defaultValue="Single"><option>Single</option><option>EP</option><option>Álbum</option></select></label><label>Gênero<input placeholder="Ex.: Rap alternativo" /></label><label>BPM<input placeholder="Ex.: 92" /></label></div><label className="full-label">Descrição / letra<textarea placeholder="Anote uma ideia ou cole a letra da obra..." /></label><div className="modal-actions"><button className="button button-outline" onClick={() => setOpen(false)}>Cancelar</button><button className="button button-lime" onClick={() => { setOpen(false); toast("Obra salva no seu catálogo") }}>Salvar obra</button></div></Modal>}</div>; }

function BeatsPage() { const [selected, setSelected] = useState<typeof beats[number] | null>(null); return <div><PageHeader eyebrow="BANCO DE BEATS" title="Encontre o som certo." description="Beats cadastrados por produtores da cena, com informações claras de uso e licença." action={<button className="button button-yellow" onClick={() => toast("Cadastro de beat disponível para produtores") }><Plus size={17} /> Cadastrar beat</button>} /><div className="beats-toolbar"><div className="search-input-wrap"><Search size={18} /><input placeholder="Buscar por nome ou produtor" /><kbd>⌘ K</kbd></div><div className="filter-chips"><button className="filter-chip active">Gênero <ChevronDown size={14} /></button><button className="filter-chip">BPM <ChevronDown size={14} /></button><button className="filter-chip">Licença <ChevronDown size={14} /></button></div></div><div className="beats-grid">{beats.map((beat, i) => <article className="beat-card" key={beat.title}><div className={`beat-art beat-art-${beat.color}`}><div className="beat-art-lines" /><span className="beat-number">0{i + 1}</span><button className="play-button" onClick={() => toast(`Demo de “${beat.title}” — player em modo protótipo`)} aria-label={`Ouvir ${beat.title}`}><Play size={17} fill="currentColor" /></button><span className="demo-label">DEMO</span></div><div className="beat-card-content"><div className="beat-title-row"><div><h3>{beat.title}</h3><p>por {beat.producer}</p></div><button className="dots-button" onClick={() => toast("Mais opções em breve")}>•••</button></div><div className="beat-specs"><span><Zap size={13} />{beat.bpm}</span><span><Music2 size={13} />{beat.key}</span><span>{beat.genre}</span></div><div className="beat-bottom"><span className={`license license-${beat.color}`}>{beat.license}</span><button className="text-link" onClick={() => setSelected(beat)}>Ver detalhe <ArrowUpRight size={14} /></button></div></div></article>)}</div>{selected && <Modal title={selected.title} onClose={() => setSelected(null)}><div className="player-card"><div className="player-play"><Play size={20} fill="currentColor" /></div><div><strong>{selected.producer} · demonstração</strong><div className="player-track"><i /></div><span>00:00 <b>{selected.duration}</b></span></div></div><div className="detail-list"><span><b>BPM</b>{selected.bpm}</span><span><b>Tom</b>{selected.key}</span><span><b>Gênero</b>{selected.genre}</span><span><b>Status</b>{selected.license}</span></div><div className="license-note"><CircleHelp size={18} /><p>A demonstração é apenas uma prévia. A versão completa não fica exposta como arquivo público no protótipo.</p></div><div className="modal-actions"><button className="button button-outline" onClick={() => toast("Download de demo solicitado")}>Baixar demo</button><button className="button button-lime" onClick={() => { setSelected(null); toast("Beat salvo para consultar depois") }}>Salvar beat</button></div></Modal>}</div>; }

function CentralPage() { const [open, setOpen] = useState(0); const faqs = [{ q: "O que é ISRC?", a: "É um código usado para identificar gravações musicais. No Cypher, você pode guardar essa informação junto da obra e dos créditos." }, { q: "O que é ISWC?", a: "É um identificador internacional de obras musicais. Registre o código quando já tiver essa informação para manter seu histórico organizado." }, { q: "Como conseguir shows?", a: "Acompanhe oportunidades, eventos e seleções na plataforma. Mantenha o perfil profissional atualizado e registre suas participações." }, { q: "Como funciona a reputação?", a: "A reputação é uma informação profissional baseada em participação, avaliações e profissionalismo dentro da plataforma — não é gamificação." }]; return <div><PageHeader eyebrow="CONHECIMENTO COMPARTILHADO" title="Cypher Central" description="Informação direta para você cuidar melhor da sua carreira e das suas obras." /><div className="central-search"><Search size={18} /><input placeholder="O que você quer entender hoje?" /><button className="button button-dark">Buscar</button></div><div className="central-layout"><div><div className="eyebrow">PERGUNTAS FREQUENTES</div><h2 className="central-section-title">Comece por aqui</h2><div className="faq-list">{faqs.map((faq, i) => <div className={open === i ? "faq-item open" : "faq-item"} key={faq.q}><button onClick={() => setOpen(open === i ? -1 : i)}><span><b>0{i + 1}</b>{faq.q}</span><ChevronDown size={18} /></button>{open === i && <p>{faq.a}</p>}</div>)}</div></div><aside className="knowledge-aside"><div className="knowledge-pattern"><BookOpen size={25} /><span>GUIA RÁPIDO</span><h3>Organize antes de lançar.</h3><p>Um bom registro de créditos evita ruído lá na frente.</p></div><div className="article-list"><div className="eyebrow">ARTIGOS RECENTES</div><a href="/central">Direitos autorais sem juridiquês <ArrowUpRight size={14} /></a><a href="/central">O que guardar no seu histórico <ArrowUpRight size={14} /></a><a href="/central">Reputação é presença <ArrowUpRight size={14} /></a></div></aside></div></div>; }

function ProfilePage() { return <div><PageHeader eyebrow="SEU ESPAÇO PROFISSIONAL" title="Marina Costa" description="Rapper / MC · São Paulo, SP" action={<button className="button button-outline" onClick={() => toast("Modo de edição do perfil em breve")}><Settings2 size={16} /> Editar perfil</button>} /><section className="profile-hero"><div className="profile-hero-main"><div className="avatar avatar-hero">MC</div><div><div className="profile-kicker"><span className="status-dot" /> Disponível para colaboração</div><h2>Marina Costa</h2><p>marina.costa<span> · </span>@marinacosta</p><div className="tag-line big"><span>Rap alternativo</span><span>Trap</span><span>Composição</span></div></div></div><div className="profile-rep"><Award size={19} /><span>REPUTAÇÃO</span><strong>78</strong><small>profissional</small></div></section><div className="profile-columns"><div className="profile-column-main"><section className="profile-section card-surface"><div className="card-heading"><div><div className="eyebrow">SOBRE</div><h3>Biografia</h3></div><button className="dots-button" onClick={() => toast("Edição em breve")}>•••</button></div><p className="bio">Artista independente construindo pontes entre o rap alternativo e a cidade. Gosto de transformar vivências em letra e encontrar gente que leva o processo a sério.</p><div className="profile-info-grid"><div><span>Frequência de lançamentos</span><strong>A cada 3 meses</strong></div><div><span>Interesse em colaboração</span><strong>Sim, especialmente feats</strong></div><div><span>Contato</span><strong>marina@cypher.art</strong></div><div><span>Desde no Cypher</span><strong>Março de 2023</strong></div></div></section><section className="profile-section card-surface"><div className="card-heading"><div><div className="eyebrow">CATÁLOGO</div><h3>Obras recentes</h3></div><a href="/works" className="text-link">Ver todas <ArrowUpRight size={14} /></a></div>{works.slice(0, 2).map((work, i) => <div className="profile-work" key={work.title}><div className={`work-index index-${i}`}>{String(i + 1).padStart(2, "0")}</div><div><strong>{work.title}</strong><span>{work.meta}</span></div><span className="status-label"><i />{work.status}</span></div>)}</section></div><aside className="profile-column-side"><div className="profile-section card-surface"><div className="eyebrow">EQUIPAMENTOS</div><h3>Meu setup</h3><div className="gear-list"><span><Mic2 size={15} />Shure SM58</span><span><Headphones size={15} />Focusrite Scarlett</span><span><Music2 size={15} />Ableton Live</span></div><button className="button button-outline full" onClick={() => toast("Edição de equipamentos em breve")}>Gerenciar setup</button></div><div className="profile-section lime-mini"><Zap size={20} /><div><span>PRÓXIMA META</span><strong>Registrar o próximo crédito</strong><p>Faltam 2 obras para atualizar sua trajetória.</p></div></div></aside></div></div>; }

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) { return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e => e.stopPropagation()}><div className="modal-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={18} /></button></div>{children}</div></div>; }
function EmptyState({ title, description }: { title: string; description: string }) { return <div className="empty-state"><Search size={22} /><h3>{title}</h3><p>{description}</p></div>; }

function AuthFrame({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div className="auth-page">
      <div className="auth-art">
        <div className="auth-brand">
          <Logo />
          <span>ECOSSISTEMA PROFISSIONAL DA CENA UNDERGROUND</span>
        </div>
        <div className="auth-quote">
          <span>01 — CONECTAR</span>
          <h1>Seu próximo<br /><em>passo começa aqui.</em></h1>
          <div className="auth-art-footer">
            <div className="auth-bars"><i /><i /><i /><i /></div>
            <p>{note}</p>
          </div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-panel-inner">{children}</div>
        <span className="auth-corner">CYPHER © 2024</span>
      </div>
    </div>
  );
}

function LoginPage() {
  const [, navigate] = useLocation();
  return (
    <AuthFrame note="Encontre profissionais. Organize suas obras. Faça a cena avançar.">
      <div className="auth-mobile-logo"><Logo /></div>
      <div className="eyebrow">BEM-VINDO DE VOLTA</div>
      <h2>Entre no seu espaço.</h2>
      <p className="auth-description">A cena continua se movendo enquanto você não para.</p>
      <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); toast("Bem-vinda de volta, Marina"); }}>
        <label>E-mail<input type="email" placeholder="voce@email.com" required /></label>
        <label>Senha
          <div className="password-wrap">
            <input type="password" placeholder="••••••••" required />
            <button type="button" onClick={() => toast("Visibilidade da senha em breve")}>mostrar</button>
          </div>
        </label>
        <div className="form-row">
          <label className="check-label"><input type="checkbox" /> Lembrar de mim</label>
          <a href="/central">Esqueci minha senha</a>
        </div>
        <button className="button button-lime full" type="submit">Entrar <ArrowUpRight size={17} /></button>
      </form>
      <div className="auth-divider"><span>ou</span></div>
      <button className="button button-outline full" onClick={() => { navigate("/dashboard"); toast("Entrando como visitante"); }}>Entrar como visitante</button>
      <p className="auth-switch">Ainda não está no Cypher? <a href="/register">Criar conta</a></p>
    </AuthFrame>
  );
}

function RegisterPage() {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState("Rapper / MC");
  const categories = ["Rapper / MC", "Beatmaker", "Produtor", "DJ", "Empreendedor", "Organizador de eventos", "Público / Fã"];
  return (
    <AuthFrame note="Um perfil profissional bem cuidado é o começo de novas oportunidades.">
      <div className="auth-mobile-logo"><Logo /></div>
      <div className="eyebrow">PRIMEIRO PASSO</div>
      <h2>Crie seu espaço.</h2>
      <p className="auth-description">Escolha como você participa da cena underground.</p>
      <form onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); toast("Perfil criado. Bem-vinda ao Cypher!"); }}>
        <label>Nome completo<input placeholder="Seu nome" required /></label>
        <label>E-mail<input type="email" placeholder="voce@email.com" required /></label>
        <div className="eyebrow category-label">SUA CATEGORIA</div>
        <div className="category-grid">
          {categories.map((cat) => (
            <button type="button" key={cat} className={selected === cat ? "category-option selected" : "category-option"} onClick={() => setSelected(cat)}>
              {cat}{selected === cat && <span>✓</span>}
            </button>
          ))}
        </div>
        <button className="button button-lime full" type="submit">Continuar <ArrowUpRight size={17} /></button>
      </form>
      <p className="auth-switch">Já tem uma conta? <a href="/login">Entrar</a></p>
    </AuthFrame>
  );
}


export default App;
