"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

interface Document {
    id: number;
    userId: string;
    propertyId: string;
    imgUrl: string;
    status: string;
}

const DocumentCarousel = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [filter, setFilter] = useState<string>('PENDING'); // Default filter state

    useEffect(() => {
        const fetchData = async () => {
            let token = getCookie('token');
            console.log(token);

            try {
                const response = await axios.get(`http://localhost/document/admin?filter=${filter}`, {
                    headers: {
                        'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaGFtZGFoQG91dGxvb2suY29tIiwidWlkIjoiNjYxMTVkNWZkZDU2ZDA1ZjkyODM5OWYzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzMzk5NTIyLCJleHAiOjE3MTM0ODU5MjJ9.JCPMcm1OAkTjVXc_qN7um1fFKrYLr-w2KYpHV9X6i5M"
                    }
                });
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchData();
    }, [filter]);
    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    return (
        <>

            <div className="flex items-center justify-center">
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {documents.map((document, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col items-center justify-center p-6">
                                            <img src={document.imgUrl} alt={`Document ${document.id}`} className="w-full h-auto mb-4" />
                                            <span className="text-xl font-semibold">{`Document ID: ${document.id}`}</span>
                                            <span className="text-sm text-gray-500">{`Status: ${document.status}`}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>
            <div className="flex flex-col items-center justify-center">
                <button onClick={() => handleFilterChange('PENDING')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Pending</button>
                <button onClick={() => handleFilterChange('APPROVED')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">Approved</button>
                <button onClick={() => handleFilterChange('DENIED')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2">Denied</button>
            </div>
        </>

    );
};

export default DocumentCarousel;




