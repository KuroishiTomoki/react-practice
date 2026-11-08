import { useState, useCallback } from 'react'
import './App.css'
import { ChildAria } from './components/ChildAria'
import { InlineStyle } from './components/InlineStyle';
import { CssModule } from './components/CssModule';
import { StyleJsx } from './components/StyleJsx';
import { StyledComponent } from './components/StyledComponent';
import { Emotion } from './components/Emotion';

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
      <input value={text} onChange={onChangeText} />
      <button onClick={onClickOpen}>表示</button>

      <ChildAria onClose={onClickClose} open={open} />

      <InlineStyle />
      <CssModule />
      <StyleJsx />
      <StyledComponent />
      <Emotion />
    </>
  )
}

export default App
