import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import ProductGallery from "../Components/ProductGallery/ProductGallery";
import { useAddToCart } from "../hooks/useAddToCart";
import { useToggleWishlist } from "../hooks/useToggleWishlist";
import { useWishlist } from "../hooks/useWishlist";

interface ProductDetailsData {
    _id: string;
    images: string[];
    title: string;
    description: string;
    price: number;
    ratingsAverage: number;
    category: {
        name: string;
    };
    brand: {
        name: string;
        image: string;
    };
}

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: wishlist, isPending } = useWishlist();
    const { mutate: addToCart } = useAddToCart();
    const toggleWishlist = useToggleWishlist();

    const getProductDetails = async (): Promise<ProductDetailsData> => {
        const { data } = await axios.get<{ data: ProductDetailsData }>(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        return data.data;
    };

    const { data, isLoading, isError } = useQuery<ProductDetailsData>({
        queryKey: ["product", id],
        queryFn: getProductDetails,
    });

    if (!id) return <p>Invalid product</p>;
    if (isLoading) return <Loading />;
    if (isError) console.error("Error fetching product:");
    if (!data?.images?.length) return null;


    return (
        <div className="container relative flex flex-col md:flex-row justify-center items-center my-10 mx-auto p-5 bg-[#eeeeee] rounded-lg gap-5 md:w-230 ">
            <ProductGallery images={data.images} />
            <div className="flex flex-1 flex-col gap-1 w-full md:w-[40%]">
                <h3 className="font-medium text-[20px]">{data.title}</h3>
                <span className="font-medium text-[16px]">{data.category.name}</span>
                <div className="flex gap-1.5 items-center">
                    <span className="text-[#5c6c75] text-[14px] font-bold">{data.ratingsAverage}</span>
                    <i className="fa-solid fa-star text-[#fbbf24] text-[14px]"></i>
                </div>
                <p className="text-[#5c6c75] text-[17px] font-medium my-4">{data.description}</p>
                <img className="w-75 md:w-full object-contain" src={data.brand.image} alt="ImageBrand" />
                <div className="flex justify-between items-center my-4">
                    <p className="flex items-center gap-1"><strong>Brand: </strong> {data.brand.name}</p>
                    <p className="flex items-center gap-1"><strong>Price: </strong> {data.price} EGP</p>
                </div>
                <button onClick={() => { addToCart(id); }} className="bg-[#212121] text-[#ffffff] w-full py-2 px-1 rounded-lg mt-2 hover:bg-[#000000] transition-all duration-300 cursor-pointer">Add to Cart</button>
            </div>
            <button disabled={isPending} onClick={() => toggleWishlist(id)} className="absolute top-5 right-5 w-7.5 h-7.5 leading-7.5 rounded-md bg-[#eee6ad] cursor-pointer hover:bg-[#f0e786] transition-all duration-300">  <i
                className={`fa-heart ${wishlist?.some((item) => item._id === id)
                    ? "fa-solid text-red-500"
                    : "fa-regular "
                    }`}
            ></i></button>
        </div>
    )
}
export default ProductDetails;
