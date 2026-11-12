import { useLocation, useNavigate } from "react-router"

export const Page1DetailA = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const onBack = () => {
        navigate.onBack();
    }

    return(
        <div>
            <h1>Page1DetailA</h1>
            <button onClick={onBack}></button>
        </div>
    )
}