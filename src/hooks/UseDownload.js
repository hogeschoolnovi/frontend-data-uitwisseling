import { useState } from 'react';
import axios from 'axios';

const useDownload = (url) => {
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (id) => {
        try {
            setLoading(true);
            const download = await axios.get(`${url}/${id}`, { responseType: 'arraybuffer' });
            const blob = new Blob([download.data], { type: 'image/png' });
            const dataUrl = URL.createObjectURL(blob);
            setImageData(dataUrl);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    };

    return { imageData, loading, error, fetchData };
};

export default useDownload;