import Loading from '@/Components/Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
interface CategoriesData {
    _id: string;
    image: string;
    name: string;
}
interface CategoriesResponse {
    data: CategoriesData[];
}
const Categories = () => {
    const token = localStorage.getItem('user');
    const getCategories = async (): Promise<CategoriesData[]> => {
        const { data } = await axios.get<CategoriesResponse>('https://ecommerce.routemisr.com/api/v1/categories')
        return data.data;
    }

    const { data, isLoading, error } = useQuery<CategoriesData[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    if (isLoading) return <Loading />
    if (error) return <div>Something went wrong</div>

    return (
        <div className="container mx-auto">
            <h1 className="head">All Categories</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 my-10">
                {data?.map((category) => (
                    <Link to={!token ? `/auth/sign-in` : `/category/${category._id}`} key={category._id}>
                        <motion.div whileHover={{ scale: 1.1, color: "#212121" }} transition={{ duration: 0.3 }} className="flex flex-col gap-2.5 h-full w-full shadow-lg rounded-lg p-5 text-[#5c6c75]  overflow-hidden text-center cursor-pointer" >
                            <img src={category.image} className="w-full h-full object-cover" alt="categoryImage" />
                            <h2 className="font-semibold text-xl ">{category.name}</h2>
                        </motion.div>
                    </Link>
                ))
                }
            </div >
        </div >
    )
}

export default Categories