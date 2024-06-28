import { uploadPhotosService } from '@services/uploadPhotosService';
import { useEffect, useState } from 'react';

export const usePhotoFiles = (initialUrls: string[] = []) => {
    const [photoFiles, setPhotoFiles] = useState<File[]>([]);
    const [photoUrls, setPhotoUrls] = useState<string[]>(initialUrls);

    useEffect(() => {
        setPhotoUrls(initialUrls);
    }, []);

    useEffect(() => {
        console.log("Updated photoFiles:", photoFiles);
        console.log('Updated photoUrls:', photoUrls);

    }, [photoFiles, photoUrls])

    const handlePhotoChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            setPhotoFiles(prevFiles => [...prevFiles, ...newFiles]);
            setPhotoUrls(prevUrls => [...prevUrls,
            ...newFiles.map(file => URL.createObjectURL(file))]);

        }
    };

    const uploadPhotosHandler = async (): Promise<string[]> => {
        try {
            const urls = uploadPhotosService(photoFiles);
            return urls;
        } catch (error: any) {
            throw new Error("Error uploading photos: " + error.message);
        }
    }

    return {
        photoUrls,
        setPhotoFiles,
        setPhotoUrls,
        handlePhotoChange,
        uploadPhotosHandler
    };
};
