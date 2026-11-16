import styled from "styled-components";
import { useContext } from "react";
import { UserContent } from "../../../provider/UserProvider";

export const UserIconWithName = (props) => {
    const {userInfo} = useContext(UserContent);
    const {img, name} = props;
    const isAdmin = userInfo ? userInfo.isAdmin : false;
    return(
        <>
            <img height={160} width={160} src={img} alt="プロフィール"></img>
            <p>{name}</p>
            {isAdmin && <SEdit>編集</SEdit>}
        </>

    )
}


const SEdit = styled.span`
    text-decoration:underline;
    color:#aaa;

`
