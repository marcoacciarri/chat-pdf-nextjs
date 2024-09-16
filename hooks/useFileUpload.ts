import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
//import { useRouter } from 'next/navigation';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { v4 as uuid } from 'uuid';

export enum StatusText {
    UPLOADING = 'Uploading..',
    UPLOADED = 'Uploaded.',
    SAVING = 'Saving..',
    GENERATING = 'Generating AI embeding..',
}

export type Status = StatusText[keyof StatusText];

export default function useFileUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const { user } = useUser();
    //const router = useRouter();

    const handleUpload = async (file: File) => {
        if (!file || !user) {
            return;
        }

        //TODO: FREE or PRO Logic

        const fileIdToUploadTo = uuid(); //example: 1234-5678-9012-3456
        const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setStatus(StatusText.UPLOADING);
            setProgress(percent);
        }, (error) => {
            console.error(error);
        }, async () => {
            setStatus(StatusText.UPLOADED);

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            setStatus(StatusText.SAVING);
            await setDoc(doc(db, 'users', user.id, 'files', fileIdToUploadTo), {
                name: file.name,
                size: file.size,
                type: file.type,
                downloadURL: downloadURL,
                ref: uploadTask.snapshot.ref.fullPath,
                createAt: new Date(),
            });

            setStatus(StatusText.GENERATING);
            //Generating AI Embeding

            setFileId(fileIdToUploadTo);
        });
    };

    return { progress, status, fileId, handleUpload };

}
