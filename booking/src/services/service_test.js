import Slider, {Slide} from "./slider";
import { pictures } from "../data";

//import "./styles.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

function slider_test() {
    return (
        <Slider
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
    );
}

export default slider_test;