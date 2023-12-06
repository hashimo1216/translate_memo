import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { DeeplLanguages } from 'deepl';
import { translator } from '../config/DeepLApi';

export default function Home() {
  const languages = useSelector((state: RootState) => state.translation.languages)

  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const [copied, setCopied] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  
  const handleCopy = () => {
    changeClipbordIcon()
    navigator.clipboard.writeText(translatedText)
    .then(() => displayNotfication());
  }

  const clearText = () => {
    setText('')
    setTranslatedText('')
  }
  
  const changeClipbordIcon = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }
  
  const displayNotfication = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500)
  }

  
  const handleTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(targetLanguage) {
      const result = await translator(targetLanguage as DeeplLanguages, text);
      setTranslatedText(result.data.translations[0].text);
    }
  }
  
  useEffect(() => {
    if (text === '') {
      setTranslatedText('')
    }
  }, [text])

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="w-[600px]">
        <form onSubmit={(e) => handleTranslate(e)} className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold">翻訳</h1>
          <div className="flex justify-center">
            <select className="w-40 h-[40px] px-2 bg-gray-200 rounded-md hover:cursor-pointer text-black font-bold"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option value={language.key} key={language.key}>{language.language}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <textarea name="message"
              placeholder="テキストを入力してください。"
              required
              value={text} 
              onChange={(e) =>  setText(e.target.value)}
              className="resize-none h-40 w-full p-4 text-2xl font-serif border-[1px] border-gray-400 rounded-md focus:outline-none focus:ring-0"/>
            { text && <p onClick={clearText} className='absolute right-3 top-1 text-2xl font-bold cursor-pointer hover:text-gray-600'>×</p>}
          </div>
          <button type='submit' className="py-2 bg-yellow-400 text-white font-bold rounded-md hover:bg-yellow-500">翻訳する</button>
          <div className='relative'>
            <div id='translation' className="relative h-32 border-[1px] border-gray-400 rounded-md overflow-scroll">
              <p className="absolute top-3 left-3 w-[550px] text-xl text-left">{translatedText}</p>
            </div>
            <a onClick ={handleCopy} className='absolute right-3 top-3 hover:cursor-pointer'>
              {copied ? <FontAwesomeIcon icon={faCheck} className="w-5 h-5 hover:text-gray-600" /> : <FontAwesomeIcon icon={faClipboard} className="w-5 h-5 hover:text-gray-600" />}
            </a>
          </div>
          <div className='flex justify-center'>
            <p className={`w-36 p-2 bg-blue-400 rounded-3xl font-bold text-white transition-transform duration-500
            ${showNotification ? "" : "translate-y-24"}`}>コピーしました</p>
          </div>
        </form>
      </div>
    </div>
  )
}