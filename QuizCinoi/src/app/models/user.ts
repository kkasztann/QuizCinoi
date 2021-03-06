export interface User {
  uid: string;
  name: string;
  avatarURL: string;
  location?: Location;
  points?: number;
  resultsDuel?: ResultDuel;
  availablesDuel?: AvailablesDuel;
}
export interface Location {
  latitude: any;
  longitude: any;
}
export interface ResultDuel {
  opponentNick: string;
  opponentAvatar: string;
  result: string;
  stats: Stats;
}
export interface AvailablesDuel {
  opponentUID: string;
}
export interface Stats {
  questions: number;
  correct: number;
  wrong: number;
  gainedPoints?: number;
}
