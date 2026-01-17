import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

    export default function BrandDetails({ isOpen, onClose, id }) {
    async function getBrandDetails() {
        const response = await axios(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
        );
        return response.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["brandDetails", id],
        queryFn: getBrandDetails,
        enabled: !!id,
    });

    if (!isOpen) return null;

    return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
            className="relative w-1/2 min-h-[300px] bg-[#222] bg-opacity-95 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto">
            
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-main duration-300">✕</button>
            {isLoading ? (
                <Loading />
            ) : (
                <img
                src={data?.data?.image}
                alt={data?.data?.name}
                className="max-h-[300px] object-contain"
                />
            )}
            </div>
        </div>
        </>
    );
}
