import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Loading from "../Components/Loading/Loading";
import { useRemoveFromCart } from "../hooks/useRemoveFromCart";
import { useClearCart } from "../hooks/useClearCart";
import { useUpdateCartQuantaty } from "../hooks/useUpdateCartQuantaty";
import { useEffect } from "react";
function Cart() {
    const navigate = useNavigate();
    const { data: cart, isLoading, error } = useCart()
    console.log(cart);

    const { mutate: removeFromCart } = useRemoveFromCart()
    const { mutate: clearCart } = useClearCart();
    const { mutate: updateCartQuantaty } = useUpdateCartQuantaty();
    useEffect(() => {
        if (error) navigate('/auth/sign-in');
    }, [error, navigate]);
    if (isLoading) return <Loading />
    if (!cart || cart.products.length === 0) {
        return (
            <div className=" sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center gap-10 my-5">
                    <i className="fa-brands fa-opencart text-2xl text-[#5c6c75] after:content-[''] after:absolute after:h-6.25 after:w-0.5 after:mx-5 after:bg-[#5c6c75]"></i>
                    <h2 className="text-10 font-medium text-[#5c6c75]">Your shopping cart</h2>
                </div>
                <div className="text-center bg-[#eeeeeea9] p-10 flex flex-col gap-1.5 rounded-2xl w-full mx-auto">
                    <h2 className="text-2xl font-medium ">Oops! your cart is empty.</h2>
                    <p className="text-[#5c6c75] font-medium">Start shopping now by clicking the button below and find something you love!</p>
                    <Link to="/" className="bg-[#212121] mt-2.5 w-[50%] mx-auto text-[#ffffff] py-2 px-1 rounded-lg hover:bg-[#000000] transition-all duration-300 cursor-pointer">Back To Home</Link>
                </div>
            </div>
        )
    };
    return (
        <div className="px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-10 my-5">
                <i className="fa-brands fa-opencart text-2xl text-[#5c6c75] after:content-[''] after:absolute after:h-6.25 after:w-0.5 after:mx-5 after:bg-[#5c6c75]"></i>
                <h2 className="text-10 font-medium text-[#5c6c75]">Your shopping cart</h2>
            </div>
            {cart?.products.map((product) => (
                <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-center p-5 mb-7.5 rounded-md shadow-[0_.125rem_.25rem_rgba(0,0,0,.075)] hover:transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer" key={product._id}>
                    <img src={product.product.imageCover} className="w-30 h-30" alt="ProductImage" />
                    <div className="">
                        <h6 className="font-semibold mb-1.5">{product.product.title.slice(0, 15)}</h6>
                        <p className="text-[#5c6c75] text-[14px] font-medium">{product.product.category?.name}</p>
                    </div>
                    <div className="flex gap-2.5">
                        <button className="w-7 h-7 text-center leading-7 bg-[#f3f4f6] rounded-md hover:bg-[#e5e7eb] transition-all duration-300 cursor-pointer" onClick={() => updateCartQuantaty({ productId: product.product._id, count: Math.max(1, product.count - 1) })}>-</button>
                        <input type="number" min={1} className="w-15 h-7 text-center rounded-md border border-[#dee2e6]" value={product.count} onChange={(e) => updateCartQuantaty({ productId: product.product._id, count: Number(e.target.value) })} />
                        <button className="w-7 h-7 text-center leading-7 bg-[#f3f4f6] rounded-md hover:bg-[#e5e7eb] transition-all duration-300 cursor-pointer" onClick={() => updateCartQuantaty({ productId: product.product._id, count: product.count + 1 })}>+</button>
                    </div>
                    <div >
                        <span className="font-semibold text-[#212121]">{product.price} EGP</span>
                    </div>
                    <button onClick={() => removeFromCart(product.product._id)} className="flex gap-1 items-center bg-[#dc2626] text-white p-2 font-medium rounded-md text-[14px] leading-1 cursor-pointer">
                        <i className="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            ))}
            <div className="flex justify-between items-center my-4">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-sack-dollar text-Success text-xl text-[#fbbf24]"></i>
                    <span className="font-semibold">Total Price: {cart.totalCartPrice} EGP</span>
                </div>
                <button className="flex gap-1 items-center bg-[#dc2626] text-white p-2 font-medium rounded-md text-[14px] leading-1 cursor-pointer" onClick={() => clearCart()}><i className="fa-solid fa-trash"></i> Delete All</button>
            </div>
        </div>
    )
};

export default Cart;

