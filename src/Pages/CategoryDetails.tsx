import Loading from '@/Components/Loading/Loading';
import { Button } from '@/Components/ui/button';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useToggleWishlist } from '@/hooks/useToggleWishlist';
import { useWishlist } from '@/hooks/useWishlist';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface CategoryDetailsData {
    _id: string;
    imageCover: string;
    title: string;
    price: number;
    category: {
        name: string;
    }
    ratingsAverage: number;
}
const CategoryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const token = localStorage.getItem('user');

    const { mutate: addToCart } = useAddToCart()
    const toggleWishlist = useToggleWishlist()
    const { data: wishlist } = useWishlist();

    const getCategoryDetails = async (): Promise<CategoryDetailsData[]> => {
        const { data } = await axios.get<{ data: CategoryDetailsData[] }>(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);
        return data.data;
    }

    const { data, isLoading, error } = useQuery<CategoryDetailsData[], Error>({
        queryKey: ['category-products', id],
        queryFn: getCategoryDetails,
    })
    if (isLoading) return <Loading />
    if (error) return <p>{error.message}</p>

    if (!data || data.length === 0) {
        return (
            <div className=" sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center gap-10 my-5">
                    <i className="fa-brands fa-opencart text-2xl text-[#5c6c75] after:content-[''] after:absolute after:h-6.25 after:w-0.5 after:mx-5 after:bg-[#5c6c75]"></i>
                    <h2 className="text-10 font-medium text-[#5c6c75]">Your Category Products</h2>
                </div>
                <div className="text-center bg-[#eeeeeea9] p-10 flex flex-col gap-1.5 rounded-2xl w-full mx-auto">
                    <h2 className="text-2xl font-medium ">Oops! his category currently has no products.</h2>
                    <p className="text-[#5c6c75] font-medium">Try another category, otherwise press the button to go back</p>
                    <Link to="/" className="bg-[#212121] mt-2.5 w-[50%] mx-auto text-[#ffffff] py-2 px-1 rounded-lg hover:bg-[#000000] transition-all duration-300 cursor-pointer">Back To Home</Link>
                </div>
            </div>
        )
    };
    return (
        <div className="container mx-auto my-5">
            <h2 className="head">Category Products</h2>
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
                            <Button onClick={() => { addToCart(product._id) }} variant="default" className='w-full mt-2 cursor-pointer'>Add to Cart</Button>
                            <Button onClick={() => toggleWishlist(product._id)} variant="ghost" className="absolute top-5 right-5 w-7.5 h-7.5 leading-7.5 rounded-md bg-[#eee6ad] cursor-pointer hover:bg-[#f0e786] transition-all duration-300">  <i
                                className={`fa-heart ${wishlist?.some((item) => item._id === product._id)
                                    ? "fa-solid text-red-500"
                                    : "fa-regular "
                                    }`}
                            ></i></Button>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default CategoryDetails