import React, { useEffect } from "react";
import {Grid} from "@mui/material";
import {styles} from "./styles.js";
import services from "./services.json";
import Slider, {Slide} from "./slider";
import { pictures, pictures1 } from "../data";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Services({services}) {

    return (
        <div style={styles.container}>
            <h4 style={styles.transitional}>Our</h4>
            <h1 style={styles.heading}>Услуги</h1>
            <div style={styles.subContainer}>
                <divider style={styles.divider} />

                <p style={styles.text}>
                    Meie salong pakub kõiki juuksuriteenuseid nii naistele kui ka meestele. Meie stilistid aitavad teil kujundada just teile sobiva individuaalse kuvandi lähtudes teie soovidest, välimuse eripärast, iseloomust, harjumistest ja eluviisist.
                </p>
                <div style={styles.gridContainer}>
                    <Grid container spacing={2}>
                        {services.map((service) => (
                            <Grid item xs={6} key={service.id}>
                                <div className="services-box">
                                    <img style={styles.image} src={service.imageSrc} alt={service.name} />
                                    <h3 style={styles.service_name}>{service.name}</h3>
                                    <p style={styles.serviceText}>{service.description}</p>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}