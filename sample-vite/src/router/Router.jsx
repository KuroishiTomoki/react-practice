import { Routes, Route} from "react-router"
import { Home } from "../Home"
import { Page2 } from "../Page2"
import { Page1Router } from "./Page1Router"


export const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>

            {Page1Router.map((route) => {
                return(
                    <Route key={route.path} path={route.path} element={route.Children}></Route>
                )
            })}

            <Route path="/page2" element={<Page2 />} />
        </Routes>      

    )
}