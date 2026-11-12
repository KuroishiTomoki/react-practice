import {useParams, useLocation, useNavigate} from "react-router"


export const UrlParameter = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const nav = useNavigate();
    console.log(query);

    const onBack = () => nav(-1);

    return(
        <div>
            <h1>UrlParameter</h1>
            <p>Idは{id}です</p>
            <p>クエリパラメータは{query.get("name")}です</p>
            <button onClick={onBack}>戻る</button>
        </div>
    )
}