import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAddToCart } from "../hooks/useAddToCart";
import { useToggleWishlist } from "../hooks/useToggleWishlist";
import { useWishlist } from "../hooks/useWishlist";

interface ProductsData {
    _id: string;
    imageCover: string;
    title: string;
    category: {
        name: string;
    };
    price: number;
    ratingsAverage: number;
}
const Products = () => {
    const token = localStorage.getItem('user')
    const { mutate: addToCart } = useAddToCart()
    const toggleWishlist = useToggleWishlist()
    const { data: wishlist, isPending } = useWishlist();


    const getProducts = async (): Promise<ProductsData[]> => {
        const { data } = await axios.get<{ data: ProductsData[] }>(
            "https://ecommerce.routemisr.com/api/v1/products"
        );
        return data.data;
    };

    const { data, isLoading, error } = useQuery<ProductsData[], Error>({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) return <Loading />
    if (error) return <p>{error.message}</p>
    return (
        <div className="container mx-auto my-5">
            <h2 className="head">All Products</h2>
            <div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 my-10">
                    {data?.map((product) => (
                        <div key={product._id} className=" relative shadow-lg rounded-lg p-5 overflow-hidden cursor-pointer">
                            <Link to={!token ? `/auth/sign-in` : `/product/${product._id}`} >
                                <img src={product.imageCover} className="w-full h-62.5 mb-5 object-cover hover:scale-[1.1] transition-transform duration-300" alt="productImage" />
                                <h2 className="font-semibold text-xl mb-2">{product.title.slice(0, 15)}</h2>
                                <p>{product.category?.name}</p>
                                <div className="flex justify-between items-center my-2">
                                    <p className="font-semibold text-lg">$ {product.price}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#5c6c75]">{product.ratingsAverage}</span>
                                        <i className="fa-solid fa-star text-[#fbbf24] text-[14px]"></i>
                                    </div>
                                </div>
                            </Link>
                            <button onClick={() => { addToCart(product._id) }} className="bg-[#212121] text-[#ffffff] w-full py-2 px-1 rounded-lg mt-2 hover:bg-[#000000] transition-all duration-300 cursor-pointer">Add to Cart</button>
                            <button disabled={isPending} onClick={() => toggleWishlist(product._id)} className="absolute top-5 right-5 w-7.5 h-7.5 leading-7.5 rounded-md bg-[#eee6ad] cursor-pointer hover:bg-[#f0e786] transition-all duration-300">
                                <i
                                    className={`fa-heart ${wishlist?.some((item) => item._id === product._id)
                                        ? "fa-solid text-red-500"
                                        : "fa-regular "
                                        }`}
                                ></i></button>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default Products