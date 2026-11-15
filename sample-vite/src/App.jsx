import { useState, useCallback } from 'react'
import './App.css'
import { ChildAria } from './components/ChildAria'
import { InlineStyle } from './components/InlineStyle';
import { CssModule } from './components/CssModule';
import { StyleJsx } from './components/StyleJsx';
import { StyledComponent } from './components/StyledComponent';
import { BrowserRouter, Link } from "react-router"
import { Router } from './router/Router';
import { PrimaryButton } from './components/atom/button/PrimaryButton';
import { SecondaryButton } from './components/atom/button/SecondaryButton';
import { SearchInput } from './components/molcule/SearchInput';
import { UserCard } from './components/organism/user/UserCard';
import { HeaderOnly } from './components/templates/HeaderOnly';
import { Default } from './components/templates/Default';
import { RouterPage } from './router/RouterPage';

function App() {

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onClickOpen = () => {
    setOpen(!open);
  }

  const onClickClose = useCallback(() => {
    setOpen(false);
  }, [])

  const user = {
    image: "http://localhost:5173/victor-g-N04FIfHhv_k-unsplash.jpg",
    name:"たげ",
    email:"mausuraion100@gmail.com",
    phone:"08000000001",
    company:{
      name:"株ちゃん",
      website:"https:"
    }
  }

  return(
    <RouterPage>
        { /*アトミックデザイン 

        <SearchInput></SearchInput>
        <PrimaryButton>Primary1</PrimaryButton>
        <SecondaryButton>Primary2</SecondaryButton>
        <UserCard user={user}></UserCard>
        */}

        {/* Routeの学習 

        <Link to="/">Home</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>  
        <Router />     

        <input value={text} onChange={onChangeText} />
        <button onClick={onClickOpen}>表示</button>

        <ChildAria onClose={onClickClose} open={open} />

        <InlineStyle />
        <CssModule />
        <StyleJsx />
        <StyledComponent />
        */}

    </RouterPage>
  )
}

export default App
