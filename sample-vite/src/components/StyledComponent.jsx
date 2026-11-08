import styled from 'styled-components'


export const StyledComponent = () =>{


    return(
        <Container>
            <Title>タイトル</Title>
            <Button>ファイヤ</Button>
        </Container>
    )
}

const Container = styled.div`
    border:solid 2px;
    border-radius:8px;
    padding:8px;
    margin:8px;
    display:flex;
    justify-content:space-around;
    align-items:center;
`;

const Title = styled.p`
    margin: 0;
    color:#3d84a8;
`;

const Button = styled.button`
    background-color:#3d84a0;
    border:none;
    padding:8px;
    border-radius:8px;
`;