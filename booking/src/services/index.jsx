import React, { useEffect } from "react";
import {Grid} from "@mui/material";
import {styles} from "./styles.js";
/*import {Swiper} from "swiper";

//import SwiperCore, { Navigation, EffectFade } from "swiper";
//import { Swiper, SwiperSlide } from "swiper/react";
import  {EffectFade, Navigation} from "swiper/modules";
import {SwiperSlide} from "swiper/react";
//SwiperCore.use([Navigation, EffectFade]);
*/
import Slider, {Slide} from "./slider";
import { pictures, pictures1 } from "../data";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Services() {

    return (
        <div style={styles.container}>
            <h4>Our</h4>
            <h1>Services</h1>
            <p>
                Meie salong pakub kõiki juuksuriteenuseid nii naistele kui ka meestele. Meie stilistid aitavad teil kujundada just teile sobiva individuaalse kuvandi lähtudes teie soovidest, välimuse eripärast, iseloomust, harjumistest ja eluviisist.
            </p>
            <div className="services-box-container">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className="services-box">
                            <img src="./service1.png" alt="services1" />
                            <h3>Haircut</h3>
                            <p>
                                Juuste lõikus pole mitte ainult esmavajalik juuste hooldamise põhiprotseduur, vaid ka eneseväljenduse viis ning teie imago ja stiili lähtepunkt.
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="services-box">
                            <img src="./service2.png" alt="services1" />
                            <h3>Haircut</h3>
                            <p>
                                Juuste lõikus pole mitte ainult esmavajalik juuste hooldamise põhiprotseduur, vaid ka eneseväljenduse viis ning teie imago ja stiili lähtepunkt.
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="services-box">
                            <img src="./service3.png" alt="services1" />
                            <h3>Haircut</h3>
                            <p>
                                Juuste lõikus pole mitte ainult esmavajalik juuste hooldamise põhiprotseduur, vaid ka eneseväljenduse viis ning teie imago ja stiili lähtepunkt.
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="services-box">
                            <img src="./service4.png" alt="services1" />
                            <h3>Haircut</h3>
                            <p>
                                Juuste lõikus pole mitte ainult esmavajalik juuste hooldamise põhiprotseduur, vaid ka eneseväljenduse viis ning teie imago ja stiili lähtepunkt.
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="chose_style">
                <h4>Valige</h4>
                <h1>Oma stiil</h1>
                <p>
                    Püüdleme selle poole, et iga meie poolt loodud kuvand lisaks teie stiilile omapära, sobiks kokku teie „minaga“ ja tõstaks teie tuju.
                </p>
                <div className="swiper">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Slider className="swiper-wrapper"
                                settings={{
                                    navigation: true
                                }}
                            >
                                {pictures.map((slide, index) => (
                                    <Slide
                                        key={slide.id ? slide.id : index}
                                    >
                                        <img
                                            src={slide?.thumbnail}
                                            alt={slide?.title}
                                        />
                                    </Slide>
                                ))}
                            </Slider>
                        </Grid>
                        <Grid item xs={6}>
                            <Slider className="swiper-wrapper"
                                settings={{
                                    navigation: true
                                }}
                            >
                                {pictures1.map((slide, index) => (
                                    <Slide
                                        key={slide.id ? slide.id : index}
                                    >
                                        <img
                                            src={slide?.thumbnail}
                                            alt={slide?.title}
                                        />
                                    </Slide>
                                ))}
                            </Slider>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    );
}