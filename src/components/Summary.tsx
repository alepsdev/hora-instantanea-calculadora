
import React from "react";
import { TimeEntry, AppConfig } from "@/types";
import { 
  calculateTotalMinutes, 
  calculateTotalValue, 
  getEntriesForCurrentWeek,
  getEntriesForCurrentMonth,
  minutesToTime
} from "@/utils/timeCalculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SummaryProps {
  entries: TimeEntry[];
  config: AppConfig;
}

const Summary: React.FC<SummaryProps> = ({ entries, config }) => {
  // Cálculos para dia atual (hoje)
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(entry => entry.date === today);
  const todayMinutes = calculateTotalMinutes(todayEntries);
  const todayValue = calculateTotalValue(todayEntries, config);
  
  // Cálculos para semana atual
  const weekEntries = getEntriesForCurrentWeek(entries);
  const weekMinutes = calculateTotalMinutes(weekEntries);
  const weekValue = calculateTotalValue(weekEntries, config);
  
  // Cálculos para mês atual
  const monthEntries = getEntriesForCurrentMonth(entries);
  const monthMinutes = calculateTotalMinutes(monthEntries);
  const monthValue = calculateTotalValue(monthEntries, config);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Total de Horas</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(todayMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">R$ {todayValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {todayEntries.length} registros hoje
            </p>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Total de Horas</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(weekMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">R$ {weekValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {weekEntries.length} registros esta semana
            </p>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Total de Horas</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(monthMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">R$ {monthValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {monthEntries.length} registros este mês
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Summary;
