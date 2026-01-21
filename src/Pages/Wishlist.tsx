import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useWishlist } from "../hooks/useWishlist";
import { useAddToCart } from "../hooks/useAddToCart";
import { useRemoveFromWishlist } from "../hooks/useRemoveFromWishlist";
import { useEffect } from "react";

function Wishlist() {
    const navigate = useNavigate();
    const { data: wishlist, isLoading, error } = useWishlist();
    const { mutate: addToCart } = useAddToCart();
    const { mutate: removeProductFromWishlist } = useRemoveFromWishlist();

    useEffect(() => {
        if (error) navigate('/auth/sign-in')
    }, [error, navigate]);

    if (isLoading) return <Loading />
    if (!wishlist || wishlist.length === 0) {
        return (
            <div className=" sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center gap-10 my-5">
                    <i className="fa-brands fa-opencart text-2xl text-[#5c6c75] after:content-[''] after:absolute after:h-6.25 after:w-0.5 after:mx-5 after:bg-[#5c6c75]"></i>
                    <h2 className="text-10 font-medium text-[#5c6c75]">Your your wishlist </h2>
                </div>
                <div className="text-center bg-[#eeeeeea9] p-10 flex flex-col gap-1.5 rounded-2xl w-full mx-auto">
                    <h2 className="text-2xl font-medium ">Oops! your wishlist is empty.</h2>
                    <p className="text-[#5c6c75] font-medium">Start shopping now by clicking the button below and find something you love!</p>
                    <Link to="/" className="bg-[#212121] mt-2.5 w-[50%] mx-auto text-[#ffffff] py-2 px-1 rounded-lg hover:bg-[#000000] transition-all duration-300 cursor-pointer">Back To Home</Link>
                </div>
            </div>
        )
    };
    return (
        <div className="w-[70%] mx-auto sm:w-full px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-10 my-5">
                <i className="fa-brands fa-opencart text-2xl text-[#5c6c75] after:content-[''] after:absolute after:h-6.25 after:w-0.5 after:mx-5 after:bg-[#5c6c75]"></i>
                <h2 className="text-10 font-medium text-[#5c6c75]">Your shopping wishlist</h2>
            </div>
            {wishlist?.map((wishlist) => (
                <div key={wishlist._id} className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-center p-5 mb-7.5 rounded-md shadow-[0_.125rem_.25rem_rgba(0,0,0,.075)] hover:transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                    <img src={wishlist.imageCover} className="w-30 h-30" alt="ProductImage" />
                    <div className="">
                        <h6 className="font-semibold mb-1.5">{wishlist.title.slice(0, 15)}</h6>
                        <p className="text-[#5c6c75] text-[14px] font-medium">{wishlist.category?.name}</p>
                    </div>
                    <div >
                        <span className="font-semibold text-[#212121]">{wishlist.price} EGP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button onClick={() => removeProductFromWishlist(wishlist._id)} className="flex gap-1 items-center bg-[#dc2626] hover:bg-[#991b1b] text-white p-2 font-medium rounded-md text-[14px] leading-1 transition-all duration-300 cursor-pointer">
                            <i className="fa-solid fa-trash"></i>
                            Delete
                        </button>
                        <button onClick={() => { addToCart(wishlist._id) }} className="flex gap-1 items-center bg-[#212121] text-white p-2 font-medium rounded-md text-[14px] leading-1 hover:bg-[#000000] transition-all duration-300 cursor-pointer">
                            <i className="fa-solid fa-cart-plus"></i>
                            Add to Cart
                        </button>

                    </div>
                </div>
            ))}
        </div>
    )
};

export default Wishlist;

