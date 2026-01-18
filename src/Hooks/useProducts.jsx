import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
    function getRecentProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let response = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts,
        select: (data) => data.data.data,
        
        // Performance optimizations:
        staleTime: 5 * 60 * 1000, // fresh for 5 minutes (no refetch)
        gcTime: 10 * 60 * 1000, // Cache 10 minutes (cacheTime)
        refetchOnWindowFocus: false, // Don't refetch when user returns to tab
        refetchOnMount: false, // Don't refetch 
    })
    return response;
}