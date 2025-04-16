
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
import { useLocale } from "@/contexts/LocaleContext";

interface SummaryProps {
  entries: TimeEntry[];
  config: AppConfig;
}

const Summary: React.FC<SummaryProps> = ({ entries, config }) => {
  const { currencySymbol, t } = useLocale();
  
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
        <CardTitle>{t("summary.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">{t("summary.today")}</TabsTrigger>
            <TabsTrigger value="week">{t("summary.week")}</TabsTrigger>
            <TabsTrigger value="month">{t("summary.month")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalHours")}</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(todayMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalValue")}</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{currencySymbol} {todayValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {todayEntries.length} {t("summary.records")} {t("summary.today").toLowerCase()}
            </p>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalHours")}</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(weekMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalValue")}</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{currencySymbol} {weekValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {weekEntries.length} {t("summary.records")} {t("summary.week").toLowerCase()}
            </p>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalHours")}</p>
                <h3 className="text-2xl font-bold mt-1">{minutesToTime(monthMinutes)}</h3>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground">{t("summary.totalValue")}</p>
                <h3 className="text-2xl font-bold mt-1 text-green-600">{currencySymbol} {monthValue.toFixed(2)}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {monthEntries.length} {t("summary.records")} {t("summary.month").toLowerCase()}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Summary;
