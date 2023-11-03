import React, {useState} from "react";
import {Grid} from "@mui/material";
import { styles } from "./styles"
import "./ImageSlider.css"; // You'll need to create this CSS file for styling.


export default function Choose_style({ images }) {


    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div style={styles.container}>
            <h4 style={styles.transitional}>Valige</h4>
            <h1 style={styles.heading}>Oma stiil</h1>
            <divider style={styles.divider} />

            <p style={styles.text}>
                Püüdleme selle poole, et iga meie poolt loodud kuvand lisaks teie stiilile <br/>omapära, sobiks kokku teie „minaga“ ja tõstaks teie tuju.
            </p>
            <div className="image-slider">
                <button onClick={prevSlide} className="prev-button">
                    Previous
                </button>
                <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                <button onClick={nextSlide} className="next-button">
                    Next
                </button>
            </div>
            {/*<div className="swiper">
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
            </div>*/}
        </div>
    );
}