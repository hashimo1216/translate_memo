import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Folder, FolderState, Memo } from "../../types/types";
import { DeeplLanguages } from "deepl";

const initialState: FolderState = {
  folders: [],
  selectedFolder: null,
};

export const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload
    },
    addFolder: (state, action: PayloadAction<{ID: number; folderName: string; languageKey: DeeplLanguages, nationalFlag: string }>) => {
      state.folders.push({
        ID: action.payload.ID,
        folderName: action.payload.folderName,
        languageKey: action.payload.languageKey as DeeplLanguages,
        nationalFlag: action.payload.nationalFlag,
      });
    },
    displayFolderMenu: (state, action: PayloadAction<number>) => {
      const folder = state.folders.find((folder) => folder.ID === action.payload);
      if (folder) {
        folder.isMenu = !folder.isMenu;
      }
    },
    setNameEditable(state, action: PayloadAction<number>) {
      const folder = state.folders.find((folder) => folder.ID === action.payload);
      if (folder) {
        folder.isNameEditable = !folder.isNameEditable
      }
    },
    renameFolder: (state, action: PayloadAction<{ID: number, name: string}>) => {
      const folder = state.folders.find((folder) => folder.ID === action.payload.ID)
      if (folder) {
        folder.folderName = action.payload.name
      }
    },
    openFolder: (state, action: PayloadAction<number>) => {
      const folderId = action.payload
      const folder = state.folders.find((folder) => folder.ID === folderId)
      if(folder) {
        folder.isOpenFolder = true;
        state.selectedFolder = folder;

        if (folder.isOpenFolder) {
          state.folders.forEach((folder) => {
            if (folder.ID !== folderId) {
              folder.isOpenFolder = false;
            }
          });
        }
      }
    },
    deleteFolder: (state, action: PayloadAction<number>) => {
      if (state.selectedFolder?.ID == action.payload) {
        state.selectedFolder = null
      }
      state.folders = state.folders.filter((folder) => folder.ID !== action.payload);
    },
    saveMemoToFolder: (state, action: PayloadAction<{folderID: number; memo: Memo}>) => {
      const {folderID, memo} = action.payload;
      const folder = state.folders.find((folder) => folder.ID === folderID) as Folder || null;
      if (folder && memo) {
        if (state.selectedFolder?.ID === folderID) {
          state.selectedFolder.Memos = [...(state.selectedFolder?.Memos || []), memo];
        }
        folder.Memos = [...(folder.Memos || []), memo];
      }
    },
    deleteMemoFromFolder: (state, action: PayloadAction<{folderID: number; memoID: number}>) => {
      const folder = state.folders.find((folder) => folder.ID === action.payload.folderID);
      if (folder) {
        if (state.selectedFolder?.ID === action.payload.folderID) {
          state.selectedFolder.Memos = (state.selectedFolder?.Memos || []).filter(
            (memo) => memo.ID !== action.payload.memoID
          );
          folder.Memos = (folder.Memos || []).filter((memo) => memo.ID !== action.payload.memoID);
        }
      }
    }
  },
});

export const { setFolders, addFolder, openFolder, displayFolderMenu, deleteFolder, setNameEditable, renameFolder, saveMemoToFolder, deleteMemoFromFolder } = folderSlice.actions;
export default folderSlice.reducer;