export type IColorScheme = {
  yellow: string;
  red: string;
  green: string;
  blue: string;
};
export type NoteType = {
  data: string;
  uuid?: string;
  extended?: boolean;
  type: 1 | 0;
  theme: keyof IColorScheme;
  parentFolder?: string;
  parent_folder?: string;
  view_extended?: number | boolean;
};