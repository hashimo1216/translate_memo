import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faFolderPlus, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import FolderMenu from "../modal/FolderMenu";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFolder, displayFolderMenu, openFolder} from "../redux/features/Folder";
import { RootState } from "../redux/store/store";
import RenameForm from "./RenameForm";
import { DeeplLanguages } from "deepl";
import axios from "../config/axios";

export default function Sidebar() {
  const folders = useSelector((state: RootState) => state.folder.folders)
  const languages = useSelector((state: RootState) => state.translation.languages)
  const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false)
  const [nationalFlag, setNationalFlag] =  useState('')
  const [folderName, setFolderName] = useState('')
  const [languageKey, setLanguageKey] = useState('')
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<SVGSVGElement>(null)
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();
  
  const handleSelectLanguage = (nationalFlag: string, languageKey: DeeplLanguages) => {
    setNationalFlag(nationalFlag)
    setLanguageKey(languageKey as DeeplLanguages)
    setIsOpenLanguageMenu(false)
  }

  const handleLanguageMenu = () => {
    setIsOpenLanguageMenu(!isOpenLanguageMenu)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if(languageMenuRef.current && !languageMenuRef.current.contains(e.target as Node)) {
      setIsOpenLanguageMenu(false);
    }
  }
  
  const handleCreatefolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (folderName !== '' && languageKey) {
      try {
        const res = await axios.post('/api/add_folder', { folderName, languageKey, nationalFlag });
  
        if (res.status === 200) {
          const { ID, folderName, languageKey, nationalFlag } = res.data;
          dispatch(addFolder({ ID, folderName, languageKey, nationalFlag }));
          setFolderName('');
          setLanguageKey('');
          setNationalFlag('🌐');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const handleFolderMenu = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, ID: number) => {
    dispatch(displayFolderMenu(ID));

    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPosition({ top: rect.top, left:  rect.left})
  };

  const handleOpenFolder = (ID: number) => {
    dispatch(openFolder(ID))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[]);


  return (
    <div className='h-full w-64 flex flex-col text-left bg-gray-100'>
      <form onSubmit={(e) => handleCreatefolder(e)} className='w-64 mt-20 flex border-black border-b-2'>
        <input
          type="text"
          placeholder="タイトル"
          value={folderName}
          onChange={(e) =>  setFolderName(e.target.value)}
          className='h-12 w-[178px] text-sm px-4 bg-gray-100'
        />
        <div ref={languageMenuRef} className="relative flex gap-2 items-center">
          <div onClick={handleLanguageMenu} className="flex items-center gap-1 hover:cursor-pointer">
            { !nationalFlag ? <p>🌐</p> : <p className="text-lg">{nationalFlag}</p>}
            <span>
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </div>
          { isOpenLanguageMenu && 
          <div className="absolute top-10 h-40 w-28 p-2 bg-gray-200 rounded-lg shadow-lg overflow-y-auto z-10">
            { languages.map(language => (
              <div 
                key={language.key}
                onClick={() => handleSelectLanguage(language.nationalFlag, language.key)} 
                className="p-1 rounded-md hover:cursor-pointer hover:bg-white">{language.language}</div>
            )) }
          </div> }
        </div>
        <button type="submit" className="px-3 bg-gray-100"><FontAwesomeIcon icon={faFolderPlus} /></button>
      </form>
      <div className="hidden-y-scrollbar hidden-y-scrollbar::-webkit-scrollbar">
        {folders.map((folder) => (
          <div key={folder.ID}
               onClick={() => handleOpenFolder(folder.ID)}
               className={`flex justify-between px-4 py-2 items-center hover:bg-gray-200 hover:cursor-pointer
               ${ folder.isOpenFolder ? 'bg-gray-300 hover:bg-gray-300' : ''}`}>
            <div className='w-full flex items-center text-xl'>
              <p className="mr-4 text-2xl">{folder.nationalFlag}</p>
              { folder.isNameEditable ?
              <RenameForm name={folder.folderName} ID={folder.ID} /> 
              :
              <p className="w-24 overflow-x-auto">{folder.folderName}</p>
              }
            </div>
            { folder.isOpenFolder && 
            <div className="relative">
              <FontAwesomeIcon ref={menuButtonRef} onClick={(e) => handleFolderMenu(e, folder.ID)} icon={faEllipsis} className="hover:cursor-pointer"/>
              { folder.isMenu && <FolderMenu menuPosition={menuPosition} ID={folder.ID}/> }
            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}