import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import BrandDetails from "../BrandDetails/BrandDetails";

    export default function Brands() {
    const [brandId, setBrandId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    async function getBrands() {
        const response = await axios(
        "https://ecommerce.routemisr.com/api/v1/brands?limit=50"
        );
        return response.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    function handleBrandClick(id) {
        setBrandId(id);
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
        setBrandId("");
    }

    if (isLoading) return <Loading />;

    return (
        <section className="brands py-20">
        <div className="container">
            <div className="row flex flex-wrap gap-y-6 py-6 justify-center">
            {data?.data?.map((brand) => (
                <div
                key={brand._id}
                className="w-full md:w-1/2 lg:w-1/4 min-w-[220px] px-4">
                <div
                    onClick={() => handleBrandClick(brand._id)}
                    className="cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[#222] duration-500 rounded-md overflow-hidden">
                    <div className="h-[300px] flex items-center justify-center">
                    <img src={brand.image} alt={brand.name} className="object-contain h-full"/>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>

        {isOpen && (
            <BrandDetails
            isOpen={isOpen}
            onClose={handleClose}
            id={brandId}
            />
        )}
        </section>
    );
}
