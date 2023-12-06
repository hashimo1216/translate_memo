import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store/store"
import { DeeplLanguages } from "deepl"
import { useEffect, useState } from "react"
import { translator } from "../config/DeepLApi"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../config/axios"
import { deleteMemoFromFolder, saveMemoToFolder } from "../redux/features/Folder"

export default function Main() {
  const folder = useSelector((state: RootState) => state.folder.selectedFolder)
  const memos = folder?.Memos || [];
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  const clearText = () => {
    setText('')
    setTranslatedText('')
  }

  const handleTranslate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const result = await translator(folder?.languageKey as DeeplLanguages, text)
    setTranslatedText(result.data.translations[0].text)
  }
  
  const folderID = folder?.ID
  
  const handleSave = async () => {
    if(text !== '' && translatedText !== '') {
      try {
        if (folderID !== undefined) {
          const data = {text, translatedText, folderID}
          const res = await axios.post('/api/save_memo', data)
          if(res.status === 200) {
            const {ID, text, translatedText} = res.data;
            await dispatch(saveMemoToFolder({folderID, memo: {ID, text, translatedText}}));
            setText('')
          }
        }
      } catch(error) {
        console.log(error)
      }
    } else {
      window.alert('保存するためのテキストがありません。')
    }
  }

  const handleDeleteMemo = async (memoID: number) => {
    try {
      if (folderID !== undefined) {
        const res = await axios.delete(`/api/delete_memo/${memoID}`)
        if (res.status === 200) {
          dispatch(deleteMemoFromFolder({folderID, memoID}))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('Updated Memos:', memos);
    if (text === '') {
      setTranslatedText('')
    }
  }, [text, memos]);

  return (
    <div className="w-full pt-24 flex justify-center">
      <div className="h-full w-full px-8">
        <h1 className="mb-4 text-2xl">{ folder?.folderName }</h1>
        <div className="w-full h-24 flex gap-4">
          <div className="relative flex-1 border border-gray-400 rounded-md">
            <textarea
              placeholder="テキストを入力してください。"
              value={text} 
              onChange={(e) => setText(e.target.value)} name="text"
              className="resize-none overflow-y-auto w-full h-full p-3 focus:outline-none rounded-md" />
            { text && <p onClick={clearText} className='absolute right-3 top-1 text-2xl font-bold cursor-pointer hover:text-gray-600'>×</p>}
          </div>
          <div className="flex-1 border border-gray-400 rounded-md">
            <div className="w-full h-full p-3 rounded-md">
              <p className="text-left">{translatedText}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={(e) => handleTranslate(e)} className="flex justify-start mt-4 px-4 py-2 bg-gray-400 font-bold text-white rounded-lg hover:bg-gray-500 hover:cursor-pointer">翻訳</button>
          <button onClick={handleSave} className="flex justify-start mt-4 px-4 py-2 bg-yellow-400 font-bold text-white rounded-lg hover:bg-yellow-500 hover:cursor-pointer">保存</button>
        </div>
        <div className="pb-4 h-[480px] hidden-y-scrollbar hidden-y-scrollbar::-webkit-scrollbar">
          <table className="w-full mt-6 border-collapse border rounded-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr className="flex">
                <th className="flex-1 p-3 text-left">原文</th>
                <th className="flex-1 p-3 text-left">訳文</th>
              </tr>
            </thead>
            <tbody>
            {memos.map((memo) => (
              <tr key={memo.ID} className="relative group flex gap-y-2 gap-x-1 border-b">
                <td className="flex-1 p-3 text-left">{memo.text}</td>
                <td className="flex-1 p-3 text-left">{memo.translatedText}</td>
                <td onClick={() => handleDeleteMemo(memo.ID)} className="relative right-1 top-3 opacity-0 group-hover:opacity-100 hover:cursor-pointer">
                  <span>
                    <FontAwesomeIcon icon={faTrash}/>
                  </span>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}