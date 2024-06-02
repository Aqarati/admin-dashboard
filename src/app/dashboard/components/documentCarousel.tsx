"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

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
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            let token = getCookie('token');
            console.log(token);

            try {
                const response = await axios.get(`http://localhost/document/admin?filter=${filter}`, {
                    headers: {
                        'Authorization': "Bearer " + token
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

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (imgUrl: string) => {
        setSelectedImage(imgUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const updateDocumentStatus = async (id: number, status: string) => {
        let token = getCookie('token');
        try {
            await axios.put('http://localhost:8888/document/admin',
                { id: id.toString(), status: status },
                {
                    headers: {
                        'Authorization': "Bearer " + token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            // Remove the updated document from the list
            setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.id !== id));
            // Show notification
            setNotification(`Document ${id} has been ${status.toLowerCase()}.`);
            // Hide notification after 3 seconds
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error(`Error updating document status to ${status}:`, error);
        }
    };

    const deleteDocument = async (id: number) => {
        let token = getCookie('token');
        try {
            await axios.delete(`http://localhost:8888/document/admin?id=${id}`, {
                headers: {
                    'Authorization': "Bearer " + token
                }
            });
            // Remove the deleted document from the list
            setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.id !== id));
            // Show notification
            setNotification(`Document ${id} has been deleted.`);
            // Hide notification after 3 seconds
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <>
            <div className="flex p-1 items-center justify-center">
                <button onClick={() => handleFilterChange('PENDING')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Pending</button>
                <button onClick={() => handleFilterChange('APPROVED')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">Approved</button>
                <button onClick={() => handleFilterChange('DENIED')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2">Denied</button>
            </div>

            {notification && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded">
                    {notification}
                </div>
            )}

            <div className="flex justify-center items-center">
                <div className="flex items-center justify-center">
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {documents.map((document, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col items-center justify-center p-6">
                                                <img
                                                    src={document.imgUrl}
                                                    alt={`Document ${document.id}`}
                                                    className="w-full h-auto mb-4 cursor-pointer"
                                                    onClick={() => handleImageClick(document.imgUrl)}
                                                />
                                                <span className="text-xl font-semibold">{`Document ID: ${document.id}`}</span>
                                                <span className="text-m text-gray-600">{`Status: ${document.status}`}</span>
                                                <span className="text-sm text-gray-500">{`Property ID: ${document.propertyId}`}</span>
                                                <span className="text-sm text-gray-500">{`User ID: ${document.userId}`}</span>
                                                <div className="mt-4 flex justify-center items-center">
                                                    <button onClick={() => updateDocumentStatus(document.id, 'APPROVED')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Approve</button>
                                                    <button onClick={() => updateDocumentStatus(document.id, 'DENIED')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Deny</button>
                                                    <button onClick={() => deleteDocument(document.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                                </div>
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
            </div>
            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-lg w-full bg-white p-8 rounded-lg">
                        <img src={selectedImage} alt="Selected Document" className="w-full h-auto" />
                        <button onClick={handleCloseModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DocumentCarousel;
