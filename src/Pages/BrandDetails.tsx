import Loading from "@/Components/Loading/Loading";
import { Button } from "@/Components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Brand {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
}
const BrandDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const getBrand = async (): Promise<Brand> => {
        const { data } = await axios.get<{ data: Brand }>(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        return data.data;
    }
    const { data, isLoading, error } = useQuery<Brand, Error>({
        queryKey: ['brand', id],
        queryFn: getBrand,
    });
    useEffect(() => {
        if (error) {
            toast.error(error.message);
            navigate('/auth/sign-in');
        }
    }, [error, navigate])
    if (isLoading) return <Loading />;
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/" className="hover:text-[#000000]">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/brands" className="hover:text-[#000000]">Brands</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700 font-medium">Brand Details</span>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 flex justify-center items-center">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                        }}
                    />

                </div>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-[#212121] mb-4">
                        {data.name}
                    </h2>
                    <p className="text-[#5c6c75] leading-relaxed mb-6">
                        This brand is known for high-quality products and exceptional
                        customer satisfaction. It focuses on innovation, durability,
                        and modern design.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-100 rounded-xl p-4">
                            <span className="block text-gray-500">Founded</span>
                            <span className="font-semibold text-[#212121]">{data.createdAt.slice(0, 4)}</span>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-4">
                            <span className="block text-gray-500">Country</span>
                            <span className="font-semibold text-[#212121]">USA</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link to="/products">
                            <Button className="px-6 py-3 cursor-pointer">View Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandDetails;
