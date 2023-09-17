import React, {useEffect, useState} from 'react';
import './style/App.css';
import Button from "@mui/material/Button";
import {styles} from "./header/styles.js";
function SectionTest() {

    const Button = ({title}) => {
        const [hovered, setHovered] = useState(false);

        return (

            <div>

                <Button
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        ...styles.font,
                        ...(hovered && styles.hoverFont)
                    }}
                >
                    {title}
                </Button>
                <Button
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        ...styles.font,
                        ...(hovered && styles.hoverFont)
                    }}
                >
                    {title}
                </Button>
                <Button title="Index"/>
                <Button title="Pricing"/>
            </div>
        );

    }  // Usage

}
export default SectionTest;