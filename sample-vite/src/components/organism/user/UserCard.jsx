import styled from "styled-components"
import { Card } from "../../atom/card/Card";
import { UserIconWithName } from "../../molcule/user/userIconWithName";

export const UserCard = (props)=> {
    const { user } = props;

    return(
        <Card>
           <UserIconWithName name={user.name} img={user.img}></UserIconWithName>
            <SDl>
                <dt>メール</dt>
                <dd>{user.email}</dd>
                <dt>電話番号</dt>
                <dd>{user.phone}</dd>
                <dt>会社名</dt>
                <dd>{user.company.name}</dd>
                <dt>WEB</dt>
                <dd>{user.company.website}</dd>
            </SDl>
        </Card>
    )
}

const SDl = styled.dl`
    text-align:left;
    dt{
        float:left;
    }
    dd{
        padding-left:32px;
        padding-button:8px;
    }

`