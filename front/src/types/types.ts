import { DeeplLanguages } from "deepl";

export interface Folder {
  ID: number;
  folderName: string;
  languageKey: DeeplLanguages;
  nationalFlag: string;
  isMenu?: boolean;
  isOpenFolder?: boolean;
  isNameEditable?: boolean;
  Memos?: Memo[];
}

export interface Memo {
  ID: number;
  text: string;
  translatedText: string;
}

export interface TranslationState {
  languages: Language[];
  targetLanguage: DeeplLanguages | null;
  text: string;
  translationResult: string;
  copied?: boolean;
  showNotification?: boolean;
}


export interface FolderState {
  folders: Folder[];
  selectedFolder: Folder | null;
}

export interface Language {
  key: DeeplLanguages;
  language: string;
  nationalFlag: string;
}

export interface AuthState {
  isLoggedIn: boolean;
}