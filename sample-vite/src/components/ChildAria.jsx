import {memo} from "react"


export const ChildAria = memo((props) => {

    const {open, onClose} = props;

    const data = [...Array(2000).keys()];
    console.log(data);
    data.forEach(() => {
        console.log("...");
    })

    return(
        <>
            {console.log(open)}
            {open ? ( 
                <>
                    <p>子コンポーネント</p>
                    <button onClick={onClose}>閉じる</button>
                </>
            ) :
            null}
        </>
    )
})