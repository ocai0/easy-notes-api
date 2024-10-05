export type IColorScheme = {
  yellow: string;
  red: string;
  green: string;
  blue: string;
};
export type NoteType = {
  data: string;
  extended?: boolean;
  type: 1 | 0;
  theme: keyof IColorScheme;
};