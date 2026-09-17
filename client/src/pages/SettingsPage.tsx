import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronRight, ExternalLink, Eye, HelpCircle, LockKeyhole, LogOut, Moon, Palette, ShieldCheck, Sun, UserRound, UsersRound, X } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useTheme, type Theme } from "../contexts/ThemeContext";

type ToggleProps = { label: string; description: string; checked: boolean; onChange: () => void };

type ModalProps = { title: string; children: ReactNode; onClose: () => void };

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <button className="settings-toggle-row" onClick={onChange} aria-pressed={checked}>
      <span className="settings-toggle-copy"><strong>{label}</strong><small>{description}</small></span>
      <span className={checked ? "settings-switch is-on" : "settings-switch"} aria-hidden="true"><i /></span>
    </button>
  );
}

function SettingsModal({ title, children, onClose }: ModalProps) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal settings-modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={18} /></button></div>{children}</div></div>;
}

const profileLinks = [
  { label: "Editar perfil", description: "Atualize sua identidade e informações profissionais", href: "/profile", icon: UserRound },
  { label: "Informações profissionais", description: "Dados relacionados à sua atuação na cena", href: "/profile", icon: UsersRound },
  { label: "Informações técnicas", description: "DAWs, softwares, equipamentos e especialidades", href: "/profile", icon: Palette },
  { label: "Links profissionais", description: "Redes e plataformas relacionadas ao seu trabalho", href: "/profile", icon: ExternalLink },
];

const genres = ["Boom Bap", "Trap", "Drill", "Grime", "R&B", "Funk", "Afrobeat"];

export default function SettingsPage() {
  const [, navigate] = useLocation();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("Conta");
  const [publicProfile, setPublicProfile] = useState(true);
  const [searchable, setSearchable] = useState(true);
  const [locationVisible, setLocationVisible] = useState(true);
  const [available, setAvailable] = useState(true);
  const [regionalDiscovery, setRegionalDiscovery] = useState(true);
  const [collaboration, setCollaboration] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState(["Boom Bap", "Trap", "R&B"]);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);

  const sections = ["Conta", "Perfil Profissional", "Privacidade e Visibilidade", "Descoberta", "Aparência", "Ajuda e Sobre"];
  const toggleGenre = (genre: string) => setSelectedGenres((current) => current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre]);
  const chooseTheme = (nextTheme: Theme) => { setTheme(nextTheme); toast(`Tema ${nextTheme === "dark" ? "escuro" : "claro"} aplicado.`); };
  const signOut = () => { navigate("/login"); toast("Você saiu da sua conta."); };

  return <div className="settings-page">
    <div className="settings-intro"><div><div className="eyebrow">CONTROLE DO SEU ESPAÇO</div><h1>Configurações</h1><p>Controle sua conta e a forma como você vive a cena dentro do Cypher.</p></div><div className="settings-mark"><span>06</span><small>áreas de controle</small></div></div>
    <div className="settings-layout">
      <aside className="settings-index" aria-label="Seções de configurações">
        <div className="settings-index-label">NESTA PÁGINA</div>
        {sections.map((section, index) => <button key={section} className={activeSection === section ? "settings-index-link active" : "settings-index-link"} onClick={() => { setActiveSection(section); document.getElementById(`settings-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><span>0{index + 1}</span>{section}</button>)}
        <button className="settings-index-link settings-index-danger" onClick={signOut}><LogOut size={15} /> Sair da conta</button>
      </aside>
      <main className="settings-content">
        <SettingsSection id="settings-0" eyebrow="01 · CONTA" title="Sua conta" description="Os dados que identificam seu acesso ao Cypher.">
          <div className="account-summary"><div className="avatar avatar-yellow">MC</div><div><strong>Marina Costa</strong><span>Rapper / MC</span></div><span className="account-status"><i /> Ativa</span></div>
          <div className="settings-data-grid"><SettingData label="E-mail" value="og.cypher.ofc@gmail.com" /><SettingData label="Tipo de conta" value="Rapper / MC" /><SettingData label="Status" value="Ativa" /></div>
          <div className="settings-actions"><button className="button button-outline" onClick={() => setShowPassword(true)}>Alterar senha <ArrowUpRight size={15} /></button><button className="button button-outline danger-button" onClick={() => setShowDeactivate(true)}>Desativar conta</button></div>
        </SettingsSection>

        <SettingsSection id="settings-1" eyebrow="02 · PERFIL PROFISSIONAL" title="Como você aparece" description="Mantenha sua identidade profissional clara para a cena.">
          <div className="settings-link-list">{profileLinks.map(({ label, description, href, icon: Icon }) => <a className="settings-link-row" href={href} key={label}><span className="settings-link-icon"><Icon size={17} /></span><span><strong>{label}</strong><small>{description}</small></span><ChevronRight size={17} /></a>)}</div>
        </SettingsSection>

        <SettingsSection id="settings-2" eyebrow="03 · PRIVACIDADE E VISIBILIDADE" title="Você decide o que aparece" description="Controles simples para sua presença profissional.">
          <div className="settings-control-list"><Toggle label="Perfil público" description="Permite que seu perfil profissional seja visualizado por outras pessoas." checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} /><Toggle label="Aparecer na busca" description="Permite que seu perfil seja encontrado na busca de profissionais." checked={searchable} onChange={() => setSearchable(!searchable)} /><Toggle label="Localização visível" description="Exibe a localização informada no seu perfil." checked={locationVisible} onChange={() => setLocationVisible(!locationVisible)} /><Toggle label="Disponível para colaboração" description="Indica que você está aberta a oportunidades de colaboração." checked={available} onChange={() => setAvailable(!available)} /></div>
        </SettingsSection>

        <SettingsSection id="settings-3" eyebrow="04 · DESCOBERTA" title="Oriente o que encontra" description="Preferências para descobrir profissionais, eventos e oportunidades.">
          <label className="settings-field"><span>REGIÃO PRINCIPAL</span><select defaultValue="Campinas - SP"><option>Campinas - SP</option><option>São Paulo - SP</option><option>Belo Horizonte - MG</option><option>Rio de Janeiro - RJ</option></select></label>
          <Toggle label="Usar região na descoberta" description="Prioriza oportunidades e profissionais próximos da sua região escolhida." checked={regionalDiscovery} onChange={() => setRegionalDiscovery(!regionalDiscovery)} />
          <div className="settings-interest"><div className="settings-subhead"><span>GÊNEROS DE INTERESSE</span><small>Escolha os sons que fazem sentido para você.</small></div><div className="genre-chips">{genres.map((genre) => <button key={genre} className={selectedGenres.includes(genre) ? "genre-chip selected" : "genre-chip"} onClick={() => toggleGenre(genre)}>{selectedGenres.includes(genre) && <Check size={12} />}{genre}</button>)}</div></div>
          <Toggle label="Interesse em colaboração" description="Indica que você está aberta a encontrar profissionais e participar de novos projetos." checked={collaboration} onChange={() => setCollaboration(!collaboration)} />
        </SettingsSection>

        <SettingsSection id="settings-4" eyebrow="05 · APARÊNCIA" title="Escolha o clima da interface" description="O tema acompanha você por toda a plataforma durante esta sessão.">
          <div className="theme-picker"><ThemeOption value="light" current={theme} icon={<Sun size={18} />} title="Claro" description="Papel, contraste e luz natural" onChoose={chooseTheme} /><ThemeOption value="dark" current={theme} icon={<Moon size={18} />} title="Escuro" description="Mais imersão, mesma identidade" onChoose={chooseTheme} /></div>
        </SettingsSection>

        <SettingsSection id="settings-5" eyebrow="06 · AJUDA E SOBRE" title="Continue no caminho" description="Acesse conhecimento e informações sobre o Cypher.">
          <div className="settings-link-list"><a className="settings-link-row" href="/central"><span className="settings-link-icon"><HelpCircle size={17} /></span><span><strong>Cypher Central</strong><small>Acesse a Central de Conhecimento.</small></span><ChevronRight size={17} /></a><button className="settings-link-row" onClick={() => toast("Cypher — plataforma profissional para a cena underground.")}><span className="settings-link-icon"><ShieldCheck size={17} /></span><span><strong>Sobre o Cypher</strong><small>Informações gerais sobre a plataforma.</small></span><ChevronRight size={17} /></button></div><div className="settings-version">CYPHER PROTOTYPE <strong>v1.0</strong></div>
        </SettingsSection>

        <div className="settings-signout"><div><div className="eyebrow">FIM DO CAMINHO</div><h2>Sair da conta</h2><p>Encerre seu acesso a este espaço e retorne à tela de login.</p></div><button className="button button-outline danger-button" onClick={signOut}><LogOut size={16} /> Sair da conta</button></div>
      </main>
    </div>
    {showPassword && <SettingsModal title="Alterar senha" onClose={() => setShowPassword(false)}><p className="modal-copy">Crie uma nova senha para continuar protegendo seu espaço.</p><label className="modal-field">Senha atual<input type="password" placeholder="••••••••" /></label><label className="modal-field">Nova senha<input type="password" placeholder="Digite uma nova senha" /></label><div className="modal-actions"><button className="button button-outline" onClick={() => setShowPassword(false)}>Cancelar</button><button className="button button-lime" onClick={() => { setShowPassword(false); toast("Senha atualizada."); }}>Atualizar senha</button></div></SettingsModal>}
    {showDeactivate && <SettingsModal title="Desativar conta" onClose={() => setShowDeactivate(false)}><p className="modal-copy">Seu perfil deixará de aparecer para outras pessoas enquanto a conta estiver desativada.</p><div className="modal-actions"><button className="button button-outline" onClick={() => setShowDeactivate(false)}>Manter conta</button><button className="button button-dark" onClick={() => { setShowDeactivate(false); toast("Conta desativada."); navigate("/login"); }}>Desativar conta</button></div></SettingsModal>}
  </div>;
}

function SettingsSection({ id, eyebrow, title, description, children }: { id: string; eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} className="settings-section"><div className="settings-section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{description}</p></div></div><div className="settings-section-body">{children}</div></section>;
}

function SettingData({ label, value }: { label: string; value: string }) { return <div className="settings-data"><span>{label}</span><strong>{value}</strong></div>; }

function ThemeOption({ value, current, icon, title, description, onChoose }: { value: Theme; current: Theme; icon: ReactNode; title: string; description: string; onChoose: (value: Theme) => void }) {
  return <button className={current === value ? "theme-option selected" : "theme-option"} onClick={() => onChoose(value)} aria-pressed={current === value}><span className="theme-option-icon">{icon}</span><span><strong>{title}</strong><small>{description}</small></span>{current === value && <Check size={16} />}</button>;
}
