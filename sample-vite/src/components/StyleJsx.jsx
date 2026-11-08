export const StyleJsx = () => {

    return (
        <>
            <div className="container">
                <p className="tile">タイトル</p>
                <button className="button">ファイヤ</button>
            </div>
            <style jsx="true">{`
                .container {
                border:solid 2px;
                border-radius:8px;
                padding:8px;
                margin:8px;
                display:flex;
                justify-content:space-around;
                align-items:center;
            }

            .tile{
                margin: 0;
                color:#3d84a8;
            }

            .button{
                background-color:#3d84a0;
                border:none;
                padding:8px;
                border-radius:8px;
}
            `}</style>
        </>
        
    )
}