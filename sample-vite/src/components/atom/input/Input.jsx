import styled from "styled-components"

export const Input = (props) => {
    const {placeholder = ""} = props;

    return(
        <>
            <SInput placeholder={placeholder} type="test"></SInput>
        </>

    )
}

const SInput = styled.input`
    padding:8px 16px;
    border:soled #ddd 1px;
    border-radius:9999px;
    outline:none;

`