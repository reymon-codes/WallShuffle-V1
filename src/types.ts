export interface Wallpaper {
  id: string;
  name: string;
  url: string;
  isFavorite: boolean;
  addedAt: number;
  usageCount: number;
  extractedColors: string[]; // Dynamic hex-color accents extracted
  size: string;
}

export interface HistoryItem {
  id: string;
  wallpaperId: string;
  wallpaperName: string;
  wallpaperUrl: string;
  changedAt: number;
  target: 'Home' | 'Lock' | 'Both';
}

export interface SchedulerConfig {
  isEnabled: boolean;
  intervalType: 'unlock' | '15m' | '30m' | '1h' | '6h' | '12h' | '24h' | 'custom';
  customIntervalMinutes: number;
  target: 'Home' | 'Lock' | 'Both';
  shuffleMode: 'random' | 'sequential';
  avoidRecentCount: number; // For smart shuffle
}

export interface SystemStats {
  totalChanges: number;
  mostUsedName: string;
  mostUsedUrl: string;
  dailyChanges: number;
  batteryOptimized: boolean;
}

export interface AndroidFile {
  path: string;
  language: 'kotlin' | 'xml' | 'groovy' | 'json';
  content: string;
  category: 'Configuration' | 'Data / Database' | 'Worker / Scheduling' | 'UI Screens' | 'ViewModel & DI';
}
