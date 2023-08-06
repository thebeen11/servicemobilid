import { doc, updateDoc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export const  updatePackagePhoto = async (photo: File, fileName: string) => {
    if (photo) {
        const storageRef = ref(firebaseStorage, `medias/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const docRef = doc(firestoreDb, "package", fileName);
                    updateDoc(docRef, {
                        "photo_url": downloadURL,
                    }).then(() => {
                      console.log('error');
                      
                    });
                });
            }
        );
    }
}

export const  updateAvatarPhoto = async (photo: File, fileName: string) => {
    if (photo) {
        const storageRef = ref(firebaseStorage, `avatar/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const docRef = doc(firestoreDb, "user_account", fileName);
                    updateDoc(docRef, {
                        "photo_url": downloadURL,
                    }).then(() => {
                      console.log('error');
                      
                    });
                });
            }
        );
    }
}