
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type CurrencySymbol = "€" | "R$";
type Language = "pt-BR" | "it-IT";

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
    "language": "Idioma"
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
    "language": "Lingua"
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
