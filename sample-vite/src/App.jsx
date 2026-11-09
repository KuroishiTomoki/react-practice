import { useState, useCallback } from 'react'
import './App.css'
import { ChildAria } from './components/ChildAria'
import { InlineStyle } from './components/InlineStyle';
import { CssModule } from './components/CssModule';
import { StyleJsx } from './components/StyleJsx';
import { StyledComponent } from './components/StyledComponent';
//import { Emotion } from './components/Emotion';
import { Home } from './Home';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { BrowserRouter, Link, Routes, Route} from "react-router"

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
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/page1">Page1</Link>
      <Link to="/page2">Page2</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
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
