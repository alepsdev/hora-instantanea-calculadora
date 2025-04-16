
import { TimeEntry, AppConfig } from "../types";

// Converte string de hora (HH:MM) para minutos
export const timeToMinutes = (time: string): number => {
  if (!time) return 0;
  
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// Converte minutos para string de hora (HH:MM)
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Calcula o tempo trabalhado para uma entrada de tempo (em minutos)
export const calculateWorkTime = (entry: TimeEntry): number => {
  // Tempo total de trabalho
  const startMinutes = timeToMinutes(entry.startTime);
  const endMinutes = timeToMinutes(entry.endTime);
  
  // Tempo de pausa
  const breakStartMinutes = timeToMinutes(entry.breakStart);
  const breakEndMinutes = timeToMinutes(entry.breakEnd);
  
  // Cálculo do tempo trabalhado: (fim - início) - (fim da pausa - início da pausa) + tempo de viagem
  let totalMinutes = (endMinutes - startMinutes);
  
  // Subtrai o tempo de pausa se estiver definido
  if (breakStartMinutes > 0 && breakEndMinutes > 0) {
    totalMinutes -= (breakEndMinutes - breakStartMinutes);
  }
  
  // Adiciona o tempo de viagem
  totalMinutes += entry.travelTime || 0;
  
  return totalMinutes > 0 ? totalMinutes : 0;
};

// Calcula o valor monetário com base nas horas trabalhadas
export const calculateValue = (timeInMinutes: number, hourlyRate: number): number => {
  const hoursWorked = timeInMinutes / 60;
  return hoursWorked * hourlyRate;
};

// Agrupa entradas por dia
export const groupEntriesByDay = (entries: TimeEntry[]): Record<string, TimeEntry[]> => {
  return entries.reduce((acc, entry) => {
    const day = entry.date;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(entry);
    return acc;
  }, {} as Record<string, TimeEntry[]>);
};

// Calcula o total de minutos trabalhados para um array de entradas
export const calculateTotalMinutes = (entries: TimeEntry[]): number => {
  return entries.reduce((total, entry) => total + calculateWorkTime(entry), 0);
};

// Calcula o valor total para um array de entradas
export const calculateTotalValue = (entries: TimeEntry[], config: AppConfig): number => {
  const totalMinutes = calculateTotalMinutes(entries);
  return calculateValue(totalMinutes, config.hourlyRate);
};

// Filtra entradas por semana (considerando que a data está no formato YYYY-MM-DD)
export const getEntriesForCurrentWeek = (entries: TimeEntry[]): TimeEntry[] => {
  const today = new Date();
  const firstDayOfWeek = new Date(today);
  const day = today.getDay() || 7; // Ajuste para considerar domingo como 7
  firstDayOfWeek.setDate(today.getDate() - day + 1); // Primeiro dia da semana (segunda-feira)
  
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Último dia da semana (domingo)
  
  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= firstDayOfWeek && entryDate <= lastDayOfWeek;
  });
};

// Filtra entradas por mês
export const getEntriesForCurrentMonth = (entries: TimeEntry[]): TimeEntry[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getFullYear() === year && entryDate.getMonth() === month;
  });
};
