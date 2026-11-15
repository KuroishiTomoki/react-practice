import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";

export const Default = (props) => {
    const { children } = props;

    return(
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    )
}