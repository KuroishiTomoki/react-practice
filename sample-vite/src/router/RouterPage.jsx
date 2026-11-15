import { Routes, Route, BrowserRouter} from "react-router"
import { Home } from "../Home"
import { Page2 } from "../Page2"
import { Page1Router } from "./Page1Router"
import { Page2Router } from "./Page2Router"
import { Page404 } from "../Page404"
import { TopPage } from "../components/pages/TopPage"
import { Users } from "../components/pages/Users"
import { HeaderOnly } from "../components/templates/HeaderOnly"
import { Default } from "../components/templates/Default"


export const RouterPage = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/top" element={<Default><TopPage /></Default>}></Route>
                <Route path="/users" element={<HeaderOnly><Users /></HeaderOnly>}></Route>
                <Route path="*" element={<Page404/>}></Route>
            </Routes>      
        </BrowserRouter>
    )
}