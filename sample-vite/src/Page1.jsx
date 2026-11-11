import {Link, Route, Router} from "react-router"

export const Page1 = () => {
    return(
        <div>
            <h1>Page1</h1>
            <Link to="detailA">DetailA</Link>
            <Link to="detailB">DetailB</Link>
        </div>
    )
}