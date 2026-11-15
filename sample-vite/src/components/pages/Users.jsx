import styled from "styled-components"
import { SearchInput } from "../molcule/SearchInput"
import { UserCard } from "../organism/user/UserCard"


export const Users = () => {
    const users = [...Array(10)].map((val) => {
        return(
            {
                id:val,
                image: "http://localhost:5173/victor-g-N04FIfHhv_k-unsplash.jpg",
                name:`たげ${val}`,
                email:"mausuraion100@gmail.com",
                phone:"08000000001",
                company:{
                  name:"株ちゃん",
                  website:"https:"
                }
            }
        )
    })

    return(
        <SContainer>
            <h2>Userページ</h2>
            <SearchInput></SearchInput>
            {users.map((user) => {
                return(
                    <UserCard key={user.id} user={user}/>
                )
            })}
        </SContainer>
    )
}

const SContainer = styled.div`
    text-align:center;
    align-item:center;
`