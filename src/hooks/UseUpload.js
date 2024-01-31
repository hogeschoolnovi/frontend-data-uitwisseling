import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
    const [image, setImage] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [studentNumber, setStudentNumber] = useState(0);

    const handleImageChange = (e) => {
        const uploadedImage = e.target.files[0];
        setImage(uploadedImage);
        setPreviewUrl(URL.createObjectURL(uploadedImage));
    };

    const sendImage = async (url) => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const result = await axios.post(`${url}/photo`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    const sendDiploma = async (url) => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const result = await axios.post(`${url}/diploma`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleStudentNumber = (e) => {
        e.preventDefault();
        setStudentNumber(e.target.value);
    };

    return { previewUrl, studentNumber, handleImageChange, sendImage, sendDiploma, handleStudentNumber };
};

export default useImageUpload;