
export interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  travelTime: number; // em minutos
  notes?: string;
}

export interface AppConfig {
  hourlyRate: number;
}
