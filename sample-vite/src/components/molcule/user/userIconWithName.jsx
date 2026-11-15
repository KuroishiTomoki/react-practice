

export const UserIconWithName = (props) => {

    const {img, name} = props;
    return(
        <>
            <img height={160} width={160} src={img} alt="プロフィール"></img>
            <p>{name}</p>
        </>

    )
}