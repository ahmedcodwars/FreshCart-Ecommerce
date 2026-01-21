import { useState, type Key } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductGallery = ({ images }: { images: string[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="w-full md:w-[40%]">
            {/* Main Slider */}
            <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                // modules={[Thumbs]}
                className="mb-4"
            >
                {images.map((img: string | undefined, index: Key | null | undefined) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt=""
                            className="w-full h-100 object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
            >
                {images.map((img: string | undefined, index: Key | null | undefined) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt=""
                            className="h-25 w-full object-contain cursor-pointer border border-[#5c6c75] rounded-md"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductGallery;
