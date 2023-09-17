import React from "react";
import {styles} from "./styles.js";

export default function Welcome() {


        return (
            <div style={styles.container}>
                <img style={styles.model} src="./hero_model2.png" alt="model" />
                <img style={styles.bg_img} src="./homepage_bg.jpg" alt="bg" />
                <img style={styles.under_bg_img} src="./over-curve_03.png" alt="under_bg" />
                <img style={styles.arrow} src="./service4.png" alt="arrow" />
                <img style={styles.img5} src="./service4.png" alt="something" />
<br />
                <div style={styles.textContainer}>
                        <em style={styles.transitional}>You are Welcome</em>

                        <h1 style={styles.heading}>EXPLORER HAIR<br /> STUDIO</h1>
                        <divider style={styles.divider} />

                        <img style={styles.img6} src="./jelena.png" alt="jelena" />
                        <em style={styles.transitional}>Stilist</em>
                        <divider style={styles.divider2} />
                        <h2 style={styles.name}>Елена Пяхнапуу</h2>
                        <img style={styles.img7} src="./intro-bg2.jpg" alt="intro_bg2" />


                </div>

            </div>

        )
}