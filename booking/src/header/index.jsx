import React, {useState, useEffect} from "react";
import { styles } from "./styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {colors} from "../style/colors";

export default function Header() {

    const [hovered, setHovered] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: isScrolled ? '0px 0' : '20px 0', // Adjust the padding when scrolled
        background: isScrolled ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.85)', // Adjust background when scrolled
        boxShadow: isScrolled ? '0 0 10px rgba(0,0,0,0.15)' : 'none', // Add a soft shadow when scrolled
        transition: 'padding 0.3s, background 0.3s', // Add smooth transition
       // background: colors.white,
        color: colors.brown,
        margin: "auto",
        width: "100%",
    };

    return (
        <AppBar position="static" style={styles.header}>
            <Toolbar  style={headerStyle}>
                <div style={styles.headerContainer }>
                    <Button
                        variant="h6"
                        component="div"
                        style={{
                            flexGrow: 1,
                            ...(hovered === 'services' ? styles.hoverFont : styles.font), // Apply hoverFont or font style conditionally
                        }}
                        onMouseEnter={() => setHovered('services')}
                        onMouseLeave={() => setHovered(null)} // Reset hovered state when mouse leaves
                    >
                        Services
                    </Button>
                    <Button variant="h6"
                            component="div"
                            style={{
                                flexGrow: 1,
                                ...(hovered === "pricing" ? styles.hoverFont : styles.font),
                            }}
                            onMouseEnter={() => setHovered("pricing")}
                            onMouseLeave={() => setHovered(null)}
                    >
                        Pricing
                    </Button>
                    <Button variant="h6"
                            component="div"
                            style={{
                                flexGrow: 1,
                                ...(hovered === "gallery" ? styles.hoverFont : styles.font),
                            }}
                            onMouseEnter={() => setHovered("gallery")}
                            onMouseLeave={() => setHovered(null)}
                    >
                        Gallery
                    </Button>
                    {/* <LogoIcon />*/}
                    <img
                        src="./logo.png"
                        alt="Logo"
                        width="260"
                    />
                    <Button variant="h6"
                            component="div"
                            style={{
                                flexGrow: 1,
                                ...(hovered === "time" ? styles.hoverFont : styles.font),
                            }}
                            onMouseEnter={() => setHovered("time")}
                            onMouseLeave={() => setHovered(null)}
                    >
                        Time
                    </Button>
                    <Button variant="h6"
                            component="div"
                            style={{
                                flexGrow: 1,
                                ...(hovered === "booking" ? styles.hoverFont : styles.font),
                            }}
                            onMouseEnter={() => setHovered("booking")}
                            onMouseLeave={() => setHovered(null)}
                    >
                        Booking
                    </Button>
                    <Button variant="h6"
                            component="div"
                            style={{
                                flexGrow: 1,
                                ...(hovered === "contact" ? styles.hoverFont : styles.font),
                            }}
                            onMouseEnter={() => setHovered("contact")}
                            onMouseLeave={() => setHovered(null)}
                    >    Contact
                    </Button>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img
                            src="./et.png"
                            alt="et"
                        />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img
                            src="./ru.png"
                            alt="et"
                        />
                    </IconButton>
                </div>
            </Toolbar>


        </AppBar>
    );
}
