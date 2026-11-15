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

  return(
    <>
      { /*アトミックデザイン */}
      <SearchInput></SearchInput>
      <PrimaryButton>Primary1</PrimaryButton>
      <SecondaryButton>Primary2</SecondaryButton>


      {/* Routeの学習 */}
      <BrowserRouter>

        <Link to="/">Home</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>  
        <Router />     

      </BrowserRouter>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClickOpen}>表示</button>

      <ChildAria onClose={onClickClose} open={open} />

      <InlineStyle />
      <CssModule />
      <StyleJsx />
      <StyledComponent />
    </>
  )
}

export default App
