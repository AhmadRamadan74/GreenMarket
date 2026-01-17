import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function getCategories() {
        try {
            setIsLoading(true);
            let { data } = await api.get('/categories');
            console.log('Categories data:', data.data); 
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategoryClick = (categoryId, categoryName) => {
        navigate(`/subcategories/${categoryId}`, { 
            state: { categoryName } 
        });
    };

    if (isLoading) {
        return (
                <Loading />
      
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                All <span className="text-green-600">Categories</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id, category.name)}
                        className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
                    >
                        <div className="relative overflow-hidden h-80">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                crossOrigin="anonymous"
                                loading="lazy"
                                onLoad={() => console.log('Image loaded:', category.name)}
                                onError={(e) => {
                                    console.error('Image failed to load:', category.name, category.image);
                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 text-center group-hover:text-green-600 transition-colors">
                                {category.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}