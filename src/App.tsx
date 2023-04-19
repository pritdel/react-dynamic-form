import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicForm from './Forms/DynamicForm'
import { useTranslation } from 'react-i18next';
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('');

  const changeLanguageHandler = (e: any) => i18n.changeLanguage(e)

  return (
    <div className="App">
      <Header onLanguageChange={changeLanguageHandler}/>
      <h1>{t('Welcome to Dynamic Form')}</h1>
      <DynamicForm />
    </div>
  )
}

export default App
