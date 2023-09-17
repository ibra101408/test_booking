import Button from "@mui/material/Button";
import {useState} from "react";
import {styles} from "./header/styles.js";

const Buttons = () => {

    const [hovered, setHovered] = useState(null);

    return (
        <div>
            <Button
                hovered={hovered === "services"}
                onMouseEnter={() => setHovered("services")}
                //...
            >Services</Button>

            <Button
                hovered={hovered === "pricing"}
                onMouseEnter={() => setHovered("pricing")}
            >Pricing</Button>
        </div>
    )
}
export default Buttons;