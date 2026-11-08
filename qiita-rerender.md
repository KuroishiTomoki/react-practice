# 【React】再レンダリングが起きるタイミングと memo / useCallback で防ぐ方法

## はじめに

React の再レンダリングについて、実際にコードを書いて確かめながらまとめました。

- 再レンダリングはいつ起きるのか
- 不要な再レンダリングを `memo` と `useCallback` で防ぐ方法

の 2 つを、例を出しながら説明します。

### 環境

- React 19
- Vite 8
- JavaScript（`.jsx`）

## レンダリングとは

コンポーネント（関数）を実行して、画面に何を表示するかを計算することです。

たとえば「いいね」ボタンの横に回数が表示されているとき、

1. ボタンを押すと、回数のデータが「0」から「1」に変わる
2. React が「じゃあ、画面には『いいね 1』を表示しよう」と計算する。**これがレンダリング**
3. その結果を使って、実際の画面の数字が「1」に変わる

という流れになります。

もう一度計算し直すことを **再レンダリング** と呼びます。

## 再レンダリングが起きる 3 つのタイミング

再レンダリングは、主に次の 3 つのタイミングで起きます。

```
① state が変更されたとき
② props が変更されたとき
③ 親コンポーネントが再レンダリングされたとき（その子コンポーネントも再レンダリングされる）
```

ひとつずつ見ていきます。

### ① state が変更されたとき

`useState` の更新関数（ここでは `setText`）で state が変わると、そのコンポーネントが再レンダリングされます。

```jsx:App.jsx
import { useState } from 'react'

function App() {
  console.log('App がレンダリングされました')

  const [text, setText] = useState('')

  const onChangeText = (e) => {
    // state が変わる → App が再レンダリングされる
    setText(e.target.value)
  }

  return (
    <>
      <input value={text} onChange={onChangeText} />
    </>
  )
}

export default App
```

入力欄に 1 文字打つたびに、コンソールに「App がレンダリングされました」と表示されます。

### ② props が変更されたとき

親から渡される props が変わると、子コンポーネントも再レンダリングされます。

「表示」ボタンを押すと、子コンポーネントの表示・非表示が切り替わる例です。

```jsx:App.jsx
import { useState } from 'react'
import { ChildArea } from './components/ChildArea'

function App() {
  const [open, setOpen] = useState(false)

  const onClickOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} />
    </>
  )
}

export default App
```

```jsx:components/ChildArea.jsx
export const ChildArea = (props) => {
  console.log('ChildArea がレンダリングされました')

  const { open } = props

  return (
    <>
      {open ? <p>子コンポーネント</p> : null}
    </>
  )
}
```

ボタンを押すと `open` が `true` / `false` に切り替わり、`ChildArea` が再レンダリングされて表示が変わります。

### ③ 親コンポーネントが再レンダリングされたとき

ここが見落としやすいポイントです。

**親が再レンダリングされると、props が変わっていなくても、子コンポーネントも再レンダリングされます。**

① と ② を合わせた次のコードで確かめてみます。

```jsx:App.jsx
import { useState } from 'react'
import { ChildArea } from './components/ChildArea'

function App() {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onClickOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} />
    </>
  )
}

export default App
```

入力欄に文字を打つと、変わるのは `text` だけです。`ChildArea` に渡している `open` は変わっていません。

それでも、コンソールには 1 文字ごとに「ChildArea がレンダリングされました」と表示されます。

`text` が変わったことで親の `App` が再レンダリングされ、その中にある `ChildArea` も一緒に再レンダリングされたからです。

:::note info
実は ② の「props が変わったとき」も、props を変えるには親の state を変える必要があるので、親が再レンダリングされています。
つまり子コンポーネントから見ると、**「親が再レンダリングされたら、自分も再レンダリングされる」** のが基本の動きです。
:::

:::note warn
開発中（`npm run dev`）は、`main.jsx` の `<StrictMode>` の影響で、コンソールのログが 2 回ずつ表示されることがあります。
これはバグを見つけやすくするための React の仕組みで、本番ビルドでは 1 回になります。
:::

## 不要な再レンダリングを防ぐ

### なぜ防ぎたいのか

再レンダリング自体は悪いことではありません。React は画面を最新の状態に保つために、再レンダリングを繰り返しています。

問題になるのは、**重い処理をしているコンポーネントが、必要もないのに何度も再レンダリングされる** ときです。

先ほどの例でいうと、`ChildArea` の中で大量のデータを処理していた場合、入力欄に 1 文字打つたびにその処理が走ってしまいます。すると入力がカクついたり、画面の反応が遅くなったりします。

小さなアプリなら気にならないことが多いですが、画面が複雑になるほど影響が大きくなります。

### `memo` で子コンポーネントを再レンダリングさせない

`memo` で包んだコンポーネントは、**props が変わったときだけ** 再レンダリングされるようになります。
親が再レンダリングされても、props が前回と同じなら計算をスキップします。

```jsx:components/ChildArea.jsx
import { memo } from 'react'

export const ChildArea = memo((props) => {
  console.log('ChildArea がレンダリングされました')

  const { open } = props

  return (
    <>
      {open ? <p>子コンポーネント</p> : null}
    </>
  )
})
```

これで、入力欄に文字を打っても `ChildArea` のログは出なくなります。
「表示」ボタンを押して `open` が変わったときだけ、ログが出ます。

### 関数を props で渡すと `memo` が効かない → `useCallback`

次に、子コンポーネントに「閉じる」ボタンを付けて、閉じる処理を親から関数で渡してみます。

```jsx:App.jsx（うまくいかない例）
const onClickClose = () => {
  setOpen(false)
}

// ...

<ChildArea open={open} onClose={onClickClose} />
```

```jsx:components/ChildArea.jsx
import { memo } from 'react'

export const ChildArea = memo((props) => {
  console.log('ChildArea がレンダリングされました')

  const { open, onClose } = props

  return (
    <>
      {open ? (
        <>
          <p>子コンポーネント</p>
          <button onClick={onClose}>閉じる</button>
        </>
      ) : null}
    </>
  )
})
```

すると、`memo` を付けているのに、入力欄に文字を打つたびにまた `ChildArea` が再レンダリングされるようになります。

原因は、**親が再レンダリングされるたびに `onClickClose` 関数が新しく作り直されている** ことです。
見た目は同じ関数でも、React からは「前回とは別の関数＝props が変わった」と判断されます。

そこで `useCallback` を使います。

```jsx:App.jsx
import { useState, useCallback } from 'react'
import { ChildArea } from './components/ChildArea'

function App() {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onClickOpen = () => {
    setOpen(!open)
  }

  // 第2引数の配列 [] が変わらない限り、同じ関数を使い回す
  const onClickClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClose={onClickClose} />
    </>
  )
}

export default App
```

`useCallback` で包んだ関数は、第 2 引数の配列（依存配列）の値が変わらない限り、前回と同じ関数が使い回されます。
これで props が変わらなくなり、`memo` がまた効くようになります。

:::note info
**React Compiler について**
最近の React では、`memo` や `useCallback` を自動で付けてくれる「React Compiler」というツールも使えます。
ただ、何が起きているかを理解するために、まずは手で書いて仕組みを知っておくのがおすすめです。
:::

## まとめ

- 再レンダリングが起きるのは
  - ① state が変更されたとき
  - ② props が変更されたとき
  - ③ 親コンポーネントが再レンダリングされたとき
- `memo` で包むと、props が変わったときだけ再レンダリングされる
- 関数を props で渡すときは、`useCallback` で包まないと `memo` が効かない

## 感想

最初は「state が変わったら画面が変わる」くらいの理解でしたが、`console.log` を仕込んで動かしてみると、思っていたよりずっと多く再レンダリングされていて驚きました。
アプリが大きくなるほど、再レンダリングの知識は大切になると感じました。

## 参考

- [レンダーとコミット – React](https://ja.react.dev/learn/render-and-commit)
- [memo – React](https://ja.react.dev/reference/react/memo)
- [useCallback – React](https://ja.react.dev/reference/react/useCallback)
- [React Compiler – React](https://ja.react.dev/learn/react-compiler)
