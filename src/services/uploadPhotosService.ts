import { storage } from "src/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhotosService = async (files: File[]) => {
    try {
        const uploadPromises = files.map(async file => {
            const fileRef = ref(storage, `photos/${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        });

        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error: any) {
        throw new Error("Error uploading photos: " + error.message);
    }
}