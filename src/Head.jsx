import { Link } from "react-router-dom";

export default function Head(){

    const header_style = {
        "display"         :"flex",
        "flexDirection"  : "row",
        "justifyContent" : "center",
        "width"           : "100%",
        "gap": "50px"
    }

    const border = {
        "padding" : "5px 20px",
        "border": "1px solid black"
    }

    return(
            <div>
                <header style={header_style}>
                    <div style={border}><Link to="/">Home</Link></div>
                    <div style={border}><Link to="/calculator">Calculator</Link></div>
                    <div style={border}><Link to="/library">Library</Link></div>
                    <div style={border}>Graph</div>
                    <div style={border}>Empty 1</div>
                    <div style={border}>Empty 2</div>
                    <div style={border}>Empty 3</div>

                </header>
            </div>
        )
}