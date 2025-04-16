
import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type CurrencySymbol = "€" | "R$";
type Language = "pt-BR" | "it-IT" | "de-DE" | "ro-RO" | "fr-FR";

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currencySymbol: CurrencySymbol;
  setCurrencySymbol: (symbol: CurrencySymbol) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Traduções disponíveis
const translations = {
  "pt-BR": {
    "title": "Sistema de Registro de Ponto",
    "config.title": "Configurações",
    "config.hourlyRate": "Valor da Hora",
    "summary.title": "Resumo",
    "summary.today": "Hoje",
    "summary.week": "Semana",
    "summary.month": "Mês",
    "summary.totalHours": "Total de Horas",
    "summary.totalValue": "Valor Total",
    "summary.records": "registros",
    "form.title": "Registrar Horas",
    "form.date": "Data",
    "form.startTime": "Hora de Início",
    "form.endTime": "Hora de Término",
    "form.breakStart": "Início da Pausa",
    "form.breakEnd": "Fim da Pausa",
    "form.travelTime": "Tempo de Viagem (minutos)",
    "form.notes": "Observações (opcional)",
    "form.submit": "Adicionar Registro",
    "entries.title": "Registros de Horas",
    "entries.date": "Data",
    "entries.period": "Período",
    "entries.break": "Pausa",
    "entries.travel": "Viagem",
    "entries.total": "Total",
    "entries.value": "Valor",
    "entries.noEntries": "Nenhum registro encontrado. Adicione seu primeiro registro de horas.",
    "theme.toggle": "Alternar tema",
    "language": "Idioma",
    "login.title": "Entrar no Sistema",
    "login.username": "Nome de usuário",
    "login.password": "Senha",
    "login.submit": "Entrar",
    "login.loading": "Entrando...",
    "login.error": "Usuário ou senha inválidos",
    "settings.title": "Configurações",
    "settings.general": "Geral",
    "settings.appearance": "Aparência",
    "settings.logout": "Sair",
    "settings.loggedInAs": "Conectado como"
  },
  "it-IT": {
    "title": "Sistema di Registrazione Orari",
    "config.title": "Configurazioni",
    "config.hourlyRate": "Tariffa Oraria",
    "summary.title": "Riepilogo",
    "summary.today": "Oggi",
    "summary.week": "Settimana",
    "summary.month": "Mese",
    "summary.totalHours": "Ore Totali",
    "summary.totalValue": "Valore Totale",
    "summary.records": "registrazioni",
    "form.title": "Registra Ore",
    "form.date": "Data",
    "form.startTime": "Ora di Inizio",
    "form.endTime": "Ora di Fine",
    "form.breakStart": "Inizio Pausa",
    "form.breakEnd": "Fine Pausa",
    "form.travelTime": "Tempo di Viaggio (minuti)",
    "form.notes": "Note (opzionale)",
    "form.submit": "Aggiungi Registrazione",
    "entries.title": "Registrazioni Orari",
    "entries.date": "Data",
    "entries.period": "Periodo",
    "entries.break": "Pausa",
    "entries.travel": "Viaggio",
    "entries.total": "Totale",
    "entries.value": "Valore",
    "entries.noEntries": "Nessuna registrazione trovata. Aggiungi la tua prima registrazione.",
    "theme.toggle": "Cambia tema",
    "language": "Lingua",
    "login.title": "Accedi al Sistema",
    "login.username": "Nome utente",
    "login.password": "Password",
    "login.submit": "Accedi",
    "login.loading": "Accesso in corso...",
    "login.error": "Nome utente o password non validi",
    "settings.title": "Impostazioni",
    "settings.general": "Generale",
    "settings.appearance": "Aspetto",
    "settings.logout": "Esci",
    "settings.loggedInAs": "Connesso come"
  },
  "de-DE": {
    "title": "Zeiterfassungssystem",
    "config.title": "Einstellungen",
    "config.hourlyRate": "Stundensatz",
    "summary.title": "Zusammenfassung",
    "summary.today": "Heute",
    "summary.week": "Woche",
    "summary.month": "Monat",
    "summary.totalHours": "Gesamtstunden",
    "summary.totalValue": "Gesamtwert",
    "summary.records": "Einträge",
    "form.title": "Zeit erfassen",
    "form.date": "Datum",
    "form.startTime": "Startzeit",
    "form.endTime": "Endzeit",
    "form.breakStart": "Pausenbeginn",
    "form.breakEnd": "Pausenende",
    "form.travelTime": "Reisezeit (Minuten)",
    "form.notes": "Notizen (optional)",
    "form.submit": "Eintrag hinzufügen",
    "entries.title": "Zeiteinträge",
    "entries.date": "Datum",
    "entries.period": "Zeitraum",
    "entries.break": "Pause",
    "entries.travel": "Reise",
    "entries.total": "Gesamt",
    "entries.value": "Wert",
    "entries.noEntries": "Keine Einträge gefunden. Fügen Sie Ihren ersten Zeiteintrag hinzu.",
    "theme.toggle": "Thema wechseln",
    "language": "Sprache",
    "login.title": "Systemanmeldung",
    "login.username": "Benutzername",
    "login.password": "Passwort",
    "login.submit": "Anmelden",
    "login.loading": "Anmeldung läuft...",
    "login.error": "Ungültiger Benutzername oder Passwort",
    "settings.title": "Einstellungen",
    "settings.general": "Allgemein",
    "settings.appearance": "Erscheinungsbild",
    "settings.logout": "Abmelden",
    "settings.loggedInAs": "Angemeldet als"
  },
  "ro-RO": {
    "title": "Sistem de Înregistrare a Timpului",
    "config.title": "Configurări",
    "config.hourlyRate": "Tarif Orar",
    "summary.title": "Rezumat",
    "summary.today": "Astăzi",
    "summary.week": "Săptămână",
    "summary.month": "Lună",
    "summary.totalHours": "Total Ore",
    "summary.totalValue": "Valoare Totală",
    "summary.records": "înregistrări",
    "form.title": "Înregistrare Timp",
    "form.date": "Data",
    "form.startTime": "Ora de Început",
    "form.endTime": "Ora de Sfârșit",
    "form.breakStart": "Început Pauză",
    "form.breakEnd": "Sfârșit Pauză",
    "form.travelTime": "Timp de Călătorie (minute)",
    "form.notes": "Notițe (opțional)",
    "form.submit": "Adaugă Înregistrare",
    "entries.title": "Înregistrări de Timp",
    "entries.date": "Data",
    "entries.period": "Perioada",
    "entries.break": "Pauză",
    "entries.travel": "Călătorie",
    "entries.total": "Total",
    "entries.value": "Valoare",
    "entries.noEntries": "Nu s-au găsit înregistrări. Adăugați prima dvs. înregistrare de timp.",
    "theme.toggle": "Schimbă tema",
    "language": "Limbă",
    "login.title": "Autentificare în Sistem",
    "login.username": "Nume de utilizator",
    "login.password": "Parolă",
    "login.submit": "Autentificare",
    "login.loading": "Se autentifică...",
    "login.error": "Nume de utilizator sau parolă invalidă",
    "settings.title": "Setări",
    "settings.general": "General",
    "settings.appearance": "Aspect",
    "settings.logout": "Deconectare",
    "settings.loggedInAs": "Conectat ca"
  },
  "fr-FR": {
    "title": "Système d'Enregistrement du Temps",
    "config.title": "Configurations",
    "config.hourlyRate": "Taux Horaire",
    "summary.title": "Résumé",
    "summary.today": "Aujourd'hui",
    "summary.week": "Semaine",
    "summary.month": "Mois",
    "summary.totalHours": "Total des Heures",
    "summary.totalValue": "Valeur Totale",
    "summary.records": "enregistrements",
    "form.title": "Enregistrer des Heures",
    "form.date": "Date",
    "form.startTime": "Heure de Début",
    "form.endTime": "Heure de Fin",
    "form.breakStart": "Début de Pause",
    "form.breakEnd": "Fin de Pause",
    "form.travelTime": "Temps de Voyage (minutes)",
    "form.notes": "Notes (optionnel)",
    "form.submit": "Ajouter un Enregistrement",
    "entries.title": "Enregistrements de Temps",
    "entries.date": "Date",
    "entries.period": "Période",
    "entries.break": "Pause",
    "entries.travel": "Voyage",
    "entries.total": "Total",
    "entries.value": "Valeur",
    "entries.noEntries": "Aucun enregistrement trouvé. Ajoutez votre premier enregistrement de temps.",
    "theme.toggle": "Changer de thème",
    "language": "Langue",
    "login.title": "Connexion au Système",
    "login.username": "Nom d'utilisateur",
    "login.password": "Mot de passe",
    "login.submit": "Se connecter",
    "login.loading": "Connexion en cours...",
    "login.error": "Nom d'utilisateur ou mot de passe invalide",
    "settings.title": "Paramètres",
    "settings.general": "Général",
    "settings.appearance": "Apparence",
    "settings.logout": "Déconnexion",
    "settings.loggedInAs": "Connecté en tant que"
  }
};

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [language, setLanguage] = useLocalStorage<Language>("language", "pt-BR");
  const [currencySymbol, setCurrencySymbol] = useLocalStorage<CurrencySymbol>("currency", "€");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["pt-BR"]] || key;
  };

  const value = {
    language,
    setLanguage,
    currencySymbol,
    setCurrencySymbol,
    t
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
