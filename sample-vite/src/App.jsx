import { useState, useCallback } from 'react'
import './App.css'
import { RouterPage } from './router/RouterPage';
import {  UserProvider } from './provider/UserProvider';

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
    <UserProvider>
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
    </UserProvider>
  )
}

export default App
