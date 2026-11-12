# 【React】URLパラメータとクエリパラメータの使い方

## はじめに

React Router で URL から値を受け取る方法について、実際にコードを書いて確かめながらまとめました。

- URLパラメータ（`/page2/100` の `100`）の受け取り方
- クエリパラメータ（`?name=hogehoge`）の受け取り方

の 2 つを、例を出しながら説明します。

### 環境

- React 19.3.1
- react-router 8.5.1
- Vite 8
- JavaScript（`.jsx`）

react-router はバージョンによって書き方が大きく違います（v5 と v6 以降で別物）。この記事は v6 以降の書き方で説明しています。

## URLパラメータとクエリパラメータの違い

どちらも URL に値をのせて、ページに渡す方法です。

```
/page2/100?name=hogehoge
       ───  ─────────────
        ①        ②

① URLパラメータ   … パスの一部として値を渡す
② クエリパラメータ … ? より後ろに「名前=値」の形で値を渡す
```

| | URLパラメータ | クエリパラメータ |
|---|---|---|
| 書き方 | `/page2/100` | `/page2?name=hogehoge` |
| Route の `path` に書くか | 書く（`/page2/:id`） | 書かない |
| 値が無いとき | Route に当てはまらない | `null` になる |
| 取り出し方 | `useParams` | `useLocation`（または `useSearchParams`） |
| よく使う場面 | 商品 ID、ユーザー ID など「どのページか」を決める値 | 検索ワード、並び順など「あってもなくてもいい」値 |

## URLパラメータの使い方

### ① Route の path に `:名前` を書く

`path` に `:id` のように `:名前` と書くと、URL のその部分にどんな値が来ても、同じ Route で受け取れます。

```jsx
import { Routes, Route } from "react-router"
import { Page2 } from "./Page2"
import { UrlParameter } from "./UrlParameter"

export const Router = () => {
    return(
        <Routes>
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page2/:id" element={<UrlParameter />} />
        </Routes>
    )
}
```

この場合、`/page2/100` を開いても `/page2/abc` を開いても、`UrlParameter` が表示されます。

### ② useParams で値を取り出す

URL に入っている値は、`useParams` で取り出せます。`path` に `:id` と書いたので、`id` という名前で受け取ります。

```jsx
import { useParams } from "react-router"

export const UrlParameter = () => {
    const { id } = useParams();

    return(
        <div>
            <h1>UrlParameter</h1>
            <p>Idは{id}です</p>
        </div>
    )
}
```

`/page2/100` を開くと、「Idは100です」と表示されます。

### ③ Link で移動する

パラメータ付きの URL へ移動するときは、`Link` の `to` に値を入れた URL を書きます。

```jsx
import { Link } from "react-router"

export const Page2 = () => {
    return(
        <div>
            <h1>Page2</h1>
            <Link to="/page2/100">Url Parameter</Link>
        </div>
    )
}
```

## クエリパラメータの使い方

クエリパラメータは、URL の `?` より後ろに `名前=値` の形で付けます。複数あるときは `&` でつなぎます。

```
/page2/100?name=hogehoge&age=20
```

URL パラメータと違って、**Route の `path` には何も書かなくても**受け取れます。

### ① useLocation で取り出す

`useLocation` を使うと、今の URL の情報を取得できます。その中の `search` に、`?name=hogehoge` のような `?` から後ろの文字列が入っています。

この文字列を `URLSearchParams` に渡すと、`get("名前")` で値を 1 つずつ取り出せます。

```jsx
import { useParams, useLocation } from "react-router"

export const UrlParameter = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);

    return(
        <div>
            <h1>UrlParameter</h1>
            <p>Idは{id}です</p>
            <p>クエリパラメータは{query.get("name")}です</p>
        </div>
    )
}
```

`/page2/100?name=hogehoge` を開くと、次のように表示されます。

```
Idは100です
クエリパラメータはhogehogeです
```

### ② Link で移動する

`Link` の `to` に、`?` から後ろも続けて書きます。

```jsx
<Link to="/page2/100?name=hogehoge">Query Parameter</Link>
```

### 補足：useSearchParams を使う方法

`useSearchParams` を使うと、`URLSearchParams` を自分で作らずに、直接値を取り出せます。

```jsx
import { useSearchParams } from "react-router"

const [searchParams] = useSearchParams();
const name = searchParams.get("name");
```

クエリパラメータだけを使うなら、こちらのほうが短く書けます。`useLocation` はクエリパラメータ以外に、今のパス（`pathname`）なども取れるので、URL の情報をまとめて使いたいときに便利です。

## 注意点

### 値はすべて文字列

URL パラメータもクエリパラメータも、`100` のように数字に見えても**文字列**で受け取ります。計算に使うときは、`Number()` で数値に変換します。

```jsx
const { id } = useParams();
console.log(id + 1);          // "1001"（文字列がつながる）
console.log(Number(id) + 1);  // 101
```

### 無いクエリパラメータは null

URL に無い名前を `get` すると、`null` が返ります。

```jsx
// /page2/100 を開いたとき（? が無い）
query.get("name");  // null
```

画面に表示するときは、値が無い場合も考えておきましょう。

```jsx
<p>クエリパラメータは{query.get("name") ?? "未指定"}です</p>
```

### v5 の記事を読むときの注意

v5 以前の記事では、次のような書き方が出てきます。v6 以降では使えないので、読み替えてください。

| v5 | v6 以降 |
|---|---|
| `<Switch>` | `<Routes>` |
| `<Route path="/page2/:id"><UrlParameter /></Route>` | `<Route path="/page2/:id" element={<UrlParameter />} />` |
| `useHistory` | `useNavigate` |
| `useRouteMatch` の `url` | 相対パス、または `useLocation` の `pathname` |

## まとめ

- **URLパラメータ**: `path` に `:id` と書き、`useParams` で取り出す。「どのページか」を決める値に使う
- **クエリパラメータ**: `path` には書かず、`useLocation` の `search` を `URLSearchParams` に渡して `get` で取り出す。「あってもなくてもいい」値に使う
- どちらも値は文字列で受け取るので、数値として使うときは `Number()` で変換する
