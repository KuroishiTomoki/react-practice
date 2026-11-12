# 【React】useNavigate でページ移動する方法（useHistory からの書き換えも）

## はじめに

React Router の `useNavigate` について、実際にコードを書いて確かめながらまとめました。

- `useNavigate` とは何か、`Link` とどう使い分けるか
- ページ移動・戻る・データを渡す書き方
- v5 の `useHistory` からの書き換え方

の 3 つを、例を出しながら説明します。

### 環境

- React 19.3.1
- react-router 8.5.1
- Vite 8
- JavaScript（`.jsx`）

react-router はバージョンによって書き方が大きく違います（v5 と v6 以降で別物）。この記事は v6 以降の書き方で説明しています。

## useNavigate とは

JavaScript の処理の中からページを移動するためのフックです。

ページを移動する方法には、`Link` と `useNavigate` の 2 つがあります。

| | Link | useNavigate |
|---|---|---|
| 移動するタイミング | リンクをクリックしたとき | 好きなタイミング（関数を呼んだとき） |
| 画面に出るもの | リンク（`<a>` タグ） | 何も出ない（ボタンなどは自分で作る） |
| よく使う場面 | メニュー、ページ内のリンク | ボタンを押したとき、送信が終わった後、ログイン後など |

ただリンクを置くだけなら `Link`、「〇〇したら移動する」という処理を書きたいときは `useNavigate` を使います。

## 基本の使い方

### ① useNavigate を呼び出して navigate を受け取る

```jsx
import { useNavigate } from "react-router"

export const Page1 = () => {
    const navigate = useNavigate();

    const onClickDetailA = () => navigate("/page1/detailA");

    return(
        <div>
            <h1>Page1</h1>
            <button onClick={onClickDetailA}>DetailA</button>
        </div>
    )
}
```

ボタンを押すと、`/page1/detailA` に移動します。

ポイントは、**`useNavigate` を import するだけでは使えない**ことです。`useNavigate` は「`navigate` 関数を作るための関数」なので、コンポーネントの中で一度呼び出して、`navigate` を受け取ります。

```jsx
import { useNavigate } from "react-router"

export const Page1 = () => {
    // ❌ これを書き忘れると「navigate is not defined」になる
    const navigate = useNavigate();
    ...
```

### ② 呼び出す場所に注意

`useNavigate()` は、**コンポーネント関数のすぐ中**（`return` より前）で呼び出します。クリックしたときの関数の中で呼ぶとエラーになります。

```jsx
// ❌ 関数の中で呼んでいる
const onClickDetailA = () => {
    const navigate = useNavigate();
    navigate("/page1/detailA");
}

// ✅ コンポーネントのすぐ中で呼び、関数の中では navigate を使うだけ
const navigate = useNavigate();
const onClickDetailA = () => navigate("/page1/detailA");
```

`useParams` や `useLocation` など、`use〇〇` という名前のフックはすべて同じルールです。

## navigate に渡すもので動きが変わる

`navigate` は**関数**です。何をするかは、渡す引数で決まります。

| やりたいこと | 書き方 |
|---|---|
| 指定したページへ移動 | `navigate("/page1")` |
| 今のページからの相対パスで移動 | `navigate("detailA")` |
| 1 つ戻る（ブラウザの戻るボタンと同じ） | `navigate(-1)` |
| 2 つ戻る | `navigate(-2)` |
| 1 つ進む | `navigate(1)` |

文字列を渡すと「そのパスへ移動」、数字を渡すと「履歴をいくつ戻る（進む）か」という意味になります。

### 戻るボタンを作る

```jsx
import { useNavigate } from "react-router"

export const UrlParameter = () => {
    const navigate = useNavigate();

    const onBack = () => navigate(-1);

    return(
        <div>
            <h1>UrlParameter</h1>
            <button onClick={onBack}>戻る</button>
        </div>
    )
}
```

`navigate` にはメソッドが無いので、`navigate.back()` や `navigate.onBack()` のようには書けません。書くと `is not a function` のエラーになります。

## データを渡して移動する（state）

`navigate` の 2 つ目の引数に `{ state: 渡したい値 }` を書くと、URL に出さずに移動先へデータを渡せます。

```jsx
// Page1.jsx（渡す側）
const navigate = useNavigate();
const arr = [...Array(100).keys()];  // [0, 1, 2, ..., 99]

const onClickDetailA = () => navigate("/page1/detailA", { state: arr });
```

移動先では、`useLocation` の `state` で受け取ります。

```jsx
// Page1DetailA.jsx（受け取る側）
import { useLocation } from "react-router"

export const Page1DetailA = () => {
    const { state } = useLocation();
    console.log(state);  // [0, 1, 2, ..., 99]

    return(
        <div>
            <h1>Page1DetailA</h1>
        </div>
    )
}
```

`Link` で同じことをするときは、`state` を属性で書きます。

```jsx
<Link to="/page1/detailA" state={arr}>DetailA</Link>
```

### state の注意点

`state` は、`Link` や `navigate` を経由して移動したときだけ届きます。アドレスバーに `/page1/detailA` を直接入力して開くと、`state` は `null` になります。

```jsx
const { state } = useLocation();

if (!state) {
    return <p>データがありません</p>;
}
```

受け取る側では、`null` の場合も考えておきましょう。

## 履歴に残さずに移動する（replace）

2 つ目の引数に `{ replace: true }` を書くと、今のページを履歴に残さずに移動します。

```jsx
navigate("/", { replace: true });
```

移動した後にブラウザの戻るボタンを押しても、元のページには戻れません。

ログインに成功した後や、フォームを送信した後など、**前のページに戻ってほしくないとき**に使います。

## useHistory からの書き換え

v5 以前の記事では `useHistory` が使われていますが、v6 で削除されて `useNavigate` に置き換わりました。

| v5（useHistory） | v6 以降（useNavigate） |
|---|---|
| `const history = useHistory()` | `const navigate = useNavigate()` |
| `history.push("/page1")` | `navigate("/page1")` |
| `history.push("/page1", arr)` | `navigate("/page1", { state: arr })` |
| `history.goBack()` | `navigate(-1)` |
| `history.replace("/page1")` | `navigate("/page1", { replace: true })` |

一番大きな違いは、`history` が**メソッドを持ったオブジェクト**だったのに対して、`navigate` は**関数そのもの**になったことです。`history.push()` のように `.` でメソッドを呼ぶのではなく、`navigate()` を直接呼び出します。

## まとめ

- `useNavigate` は、ボタンを押したときなど、**処理の中からページを移動したいとき**に使う
- コンポーネントのすぐ中で `const navigate = useNavigate()` と呼び出してから使う
- `navigate("/パス")` で移動、`navigate(-1)` で戻る
- `{ state: 値 }` でデータを渡し、移動先では `useLocation().state` で受け取る
- `{ replace: true }` で、履歴に残さずに移動する
- v5 の `useHistory` は使えないので、`useNavigate` に読み替える
