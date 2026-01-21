import { CategoriesData, CategoriesResponse } from "@/Pages/Categories/Categories.types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import { FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const SlideCategories = () => {
    const token = localStorage.getItem('user');
    const getCategories = async (): Promise<CategoriesData[]> => {
        const { data } = await axios.get<CategoriesResponse>('https://ecommerce.routemisr.com/api/v1/categories');
        return data.data;
    }
    const query = useQuery<CategoriesData[]>({
        queryKey: ["categories"],
        queryFn: getCategories
    })
    return (
        <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <h2 className="head">Shop by Categories</h2>
            <div className="my-10 px-4 sm:px-6 lg:px-8">
                <Swiper
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    slidesPerView={1}
                    freeMode={true}
                    breakpoints={{
                        576: {
                            slidesPerView: 3, // >= 640px
                        },
                        768: {
                            slidesPerView: 4, // >= 768px
                        },
                        1024: {
                            slidesPerView: 5, // >= 1024px
                        },
                        1124: {
                            slidesPerView: 7, // >= 1024px
                        },
                    }}
                    modules={[FreeMode, Pagination]}
                >
                    {query.data?.map((cat) => {
                        return (
                            <SwiperSlide key={cat._id} >
                                <Link to={!token ? `/auth/sign-in` : `/category/${cat._id}`} key={cat._id}>

                                    <div className="cursor-pointer overflow-hidden flex flex-col items-center hover: text-[#5c6c75] hover:text-[#212121] transition-all duration-300">
                                        <img src={cat.image} className="w-32 h-32 rounded-lg object-cover hover:scale-[1.1] transition-transform duration-300" alt="" />
                                        <h3 className="font-semibold text-center  mt-1.5">{cat.name}</h3>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default SlideCategories