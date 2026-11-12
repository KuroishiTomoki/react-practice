import {Link, useNavigate} from "react-router"

export const Page1 = () => {

    const navigate = useNavigate();
    const arr = [...Array(100).keys()];
    
    const onClickDetailA = () => navigate("detailA");

    return(
        <div>
            <h1>Page1</h1>
            <Link to="detailA" state={arr}>DetailA</Link>
            <Link to="detailB">DetailB</Link>
            <button onClick={onClickDetailA}>Detail</button>
        </div>
    )
}