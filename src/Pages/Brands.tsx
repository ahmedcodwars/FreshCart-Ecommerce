import Loading from "@/Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BrandData {
    _id: string;
    image: string;
    name: string;
}
const Brands = () => {
    const getBrands = async (): Promise<BrandData[]> => {
        const { data } = await axios.get<{ data: BrandData[] }>('https://ecommerce.routemisr.com/api/v1/brands');
        return data.data;
    }
    const { data, isLoading, error } = useQuery<BrandData[], Error>({
        queryKey: ['brands'],
        queryFn: getBrands,
    })

    if (isLoading) return <Loading />;

    if (error)
        return (
            <p className="text-red-500 text-center mt-10">
                Failed to load brands
            </p>
        );

    return (
        <div className="container mx-auto px-10">
            <h2 className="head">Brands</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 my-10">
                {data?.map((brand) => (
                    <Link to={`/brand/${brand._id}`} key={brand._id}>
                        <motion.div whileHover={{ border: "1px solid #212121" }} transition={{ duration: 0.3 }} className=" flex flex-col shadow-lg items-center rounded-2xl border border-[#e0e0e0] p-5 cursor-pointer">
                            <div className="group w-25 h-25 bg-[#f9fafb] rounded-full p-4">
                                <img src={brand.image} alt="Brand Image" className="w-full h-full object-contain group-hover:scale-[1.1] transition-all duration-300" />
                            </div>
                            <h2 className="text-[#212121] font-semibold text-[18px] mt-5">{brand.name}</h2>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Brands