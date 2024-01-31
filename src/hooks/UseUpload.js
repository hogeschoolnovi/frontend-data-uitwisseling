import { useState } from 'react';
import axios from 'axios';

const UseUpload = (url) => {
    const [image, setImage] = useState([]);
    const [previewUrlPhoto, setPreviewUrlPhoto] = useState('');
    const [previewUrlDiploma, setPreviewUrlDiploma] = useState('');
    const [studentNumber, setStudentNumber] = useState(0);

    const handleImageChange = (e, path) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        setImage(uploadedImage);

        if (path === 'photo'){
            setPreviewUrlPhoto(URL.createObjectURL(uploadedImage));
        } else{
            setPreviewUrlDiploma(URL.createObjectURL(uploadedImage))
        }
    };

    const sendUpload = async (id, path) => {
        try {
            const formData = new FormData();
            formData.append("file", image);

            const result = await axios.post(`${url}${id}/${path}`, formData, {
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
        console.log(e.target.value)
    };

    return { previewUrlPhoto, previewUrlDiploma, studentNumber, handleImageChange, sendUpload, handleStudentNumber };
};

export default UseUpload;