import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {



    function getRecentProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    // BTW : useQuert be defualt can control the compponent did mount , .... 
    let response = useQuery({
        queryKey: ['recentProducts'], /// name of the request
        queryFn: getRecentProducts, /// get data
        // gcTime: 3000,
        
        // staleTime: 10000
        // refetchInterval: 1000
        select: (data) => data.data.data 
    })
    return response;
}