import { PrimaryButton } from "../atom/button/PrimaryButton"
import styled from "styled-components"
import { Input } from "../atom/input/Input"


export const SearchInput = () => {
    return(
        <SContainer>
            <Input></Input>
            <PrimaryButton>検索</PrimaryButton>
        </SContainer>
    )
}

const SContainer = styled.div`
    display:flex;
    align-items:center;
`