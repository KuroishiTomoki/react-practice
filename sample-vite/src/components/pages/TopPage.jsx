import styled from "styled-components"
import { SecondaryButton } from "../atom/button/SecondaryButton"
import { useNavigate } from "react-router"
import { useContext } from "react";
import { UserContent } from "../../provider/UserProvider";

export const TopPage = () => {

    const nav = useNavigate();
    const {setUserInfo} = useContext(UserContent);

    const onClickAdmin = () => {
        setUserInfo({isAdmin:true});
        nav("/users");
    }

    const onClickUser = () => {
        setUserInfo({isAdmin:false});
        nav("/users");
    }

    return(
        <SContainer>
            <h2>TOPページ</h2>
            <SecondaryButton onClick={onClickAdmin}>管理者</SecondaryButton>
            <SecondaryButton onClick={onClickUser}>一般</SecondaryButton>

        </SContainer>
    )
}

const SContainer = styled.div`
    text-align:center;
`