
import { useState } from "react";
import { TimeEntry, AppConfig } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ConfigPanel from "@/components/ConfigPanel";
import TimeEntryForm from "@/components/TimeEntryForm";
import TimeEntryList from "@/components/TimeEntryList";
import Summary from "@/components/Summary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLocale } from "@/contexts/LocaleContext";

const Index = () => {
  const { t } = useLocale();
  
  // Estado para armazenar registros de tempo usando localStorage
  const [timeEntries, setTimeEntries] = useLocalStorage<TimeEntry[]>("timeEntries", []);
  
  // Estado para configuração usando localStorage
  const [config, setConfig] = useLocalStorage<AppConfig>("appConfig", {
    hourlyRate: 50.00 // Valor padrão inicial de €50/hora
  });

  // Função para adicionar um novo registro
  const addTimeEntry = (entry: TimeEntry) => {
    setTimeEntries(prevEntries => [entry, ...prevEntries]);
  };

  // Função para remover um registro
  const removeTimeEntry = (id: string) => {
    setTimeEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">{t("title")}</h1>
          <div className="flex space-x-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        
        <div className="grid md:grid-cols-12 gap-6">
          {/* Coluna da esquerda */}
          <div className="md:col-span-4 space-y-6">
            {/* Painel de configuração */}
            <ConfigPanel config={config} setConfig={setConfig} />
            
            {/* Resumo dos valores */}
            <Summary entries={timeEntries} config={config} />
            
            {/* Formulário de registro de horas */}
            <TimeEntryForm addEntry={addTimeEntry} />
          </div>
          
          {/* Coluna da direita - Lista de registros */}
          <div className="md:col-span-8">
            <TimeEntryList 
              entries={timeEntries} 
              config={config} 
              removeEntry={removeTimeEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
