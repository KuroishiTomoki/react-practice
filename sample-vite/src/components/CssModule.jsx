import classSass from "./CssModule.module.scss"


export const CssModule = () => {
    return(
        <div className={classSass.container}>
            <p className={classSass.title}>タイトル</p>
            <button className={classSass.button}>ファイヤ</button>
        </div>

    )
} 