import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import SlideImages from '../../assets/SlideImages';
import SliderImages1 from '../../assets/images/slider-image-2.jpeg';
import SliderImages2 from '../../assets/images/slider-2.jpeg';
function Hero() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 h-75 sm:h-100 md:h-112.5 lg:h-125">
            <div className='overlay'></div>
            <div className="w-full md:w-[70%] h-full">
                <Swiper
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    pagination={{ dynamicBullets: true }}
                    grabCursor={true}
                >
                    {SlideImages.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className='w-full h-75 sm:h-100 md:h-112.5 lg:h-125 object-cover rounded-lg'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full md:w-[30%] h-full hidden md:flex flex-col gap-3 md:gap-4">
                <img
                    src={SliderImages1}
                    alt="Featured product 1"
                    className='w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300 cursor-pointer'
                />
                <img
                    src={SliderImages2}
                    alt="Featured product 2"
                    className='w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300 cursor-pointer'
                />
            </div>
        </div>
    );
}

export default Hero;