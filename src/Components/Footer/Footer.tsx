
const Footer = () => {
    return (
        <footer className="bg-[#212121] text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">
                            FreshCart
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            High quality products with the best prices.
                            Your satisfaction is our priority.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#5c6c75] hover:bg-[#212121] transition">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#5c6c75] hover:bg-[#212121] transition">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#5c6c75] hover:bg-[#212121] transition">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#5c6c75] hover:bg-[#212121] transition">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-white cursor-pointer transition">Home</li>
                            <li className="hover:text-white cursor-pointer transition">Products</li>
                            <li className="hover:text-white cursor-pointer transition">Categories</li>
                            <li className="hover:text-white cursor-pointer transition">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                            Contact Us
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@example.com</li>
                            <li>Phone: +20 100 000 0000</li>
                            <li>Location: Egypt</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} FreshCart. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
