export const InlineStyle = () =>{
    
    const containerStyle = {
        border:"solid 2px",
        borderRadius:"8px",
        padding:"8px",
        margin:"8px",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
    }

    const titleStyle = {
        margin: "0",
        color:"#3d84a8"
    }
    
    const buttonStyle = {
        backgroundColor:"#3d84a0",
        border:"none",
        padding:"8px",
        borderRadius:"8px",
    }
    
    return(

      <div style={containerStyle}>
        <p style={titleStyle}>InLine</p>
        <button style={buttonStyle}>ファイヤ</button>
      </div>

    )
}