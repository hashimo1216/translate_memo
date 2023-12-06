import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TranslationState } from "../../types/types"
import { DeeplLanguages } from "deepl";

const initialState: TranslationState = {
  languages: [
    {key: "JA", language:'日本語', nationalFlag:'🇯🇵'},
    {key: "KO", language:'韓国語', nationalFlag:'🇰🇷'},
    {key: "EN-US", language:'英語(USA)', nationalFlag:'🇺🇸'},
    {key: "ZH", language: '中国語', nationalFlag:'🇨🇳'},
    {key: "FR", language:'フランス語', nationalFlag:'🇫🇷'},
    {key: "RU", language:'ロシア語', nationalFlag:'🇷🇺'},
    {key: "ES", language: 'スペイン語', nationalFlag:'🇪🇸'},
  ],
  targetLanguage: 'JA',
  text: '',
  translationResult: '',
  copied: false,
  showNotification: false,
}

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    selectNationalFlag(state, action: PayloadAction<DeeplLanguages>) {
      const language = state.languages.find((language) => language.language === action.payload)
      if(language) {
        
      }
    }
  },
});

export const {selectNationalFlag} = translationSlice.actions;
export default translationSlice.reducer;