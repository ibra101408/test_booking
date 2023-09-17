import {SliderWrap} from "./swiper.style";
// styled-component wrap
import {Swiper, SwiperSlide} from 'swiper/react';
// SwiperSlide is pretty self-explantory. it is one slide that would contain
// one of data you want to show
//import SwiperCore, {Navigation, Pagination, EffectFade, Autoplay } from "swiper";
//import { Navigation, Pagination, EffectFade } from 'swiper/core';
import * as SwiperCore from "react";

// install Swiper modules
//SwiperCore.use([Navigation, Pagination, EffectFade]);

const Slider = ({children, settings}) => {
    const sliderOptions = {
        slidesPerView: 1,
        pagination: true,
        navigation: true,
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
         },
        ...settings
        // Uncomment autoply option then you can see the swiper play automatically
        // you can override setting options pass settings props to this component
    };
    // swiper takes options as props
    // you can find more about options on the website link above

    return (
        <SliderWrap
            dots={sliderOptions?.pagination}
            arrows={sliderOptions?.navigation}
            // I pass dots and arrow props to custom pagination and navigation in styled-component
        >
            <Swiper
                {...sliderOptions}
            >
                {children}
            </Swiper>
        </SliderWrap>
    );
};

export {SwiperSlide as Slide};
export default Slider;