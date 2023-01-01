import { useState, useEffect } from "react";
import axios from "axios";

// axios has to be installed first
// npm install axios
const useAxios = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        
        axios.get(url)
            .then(res => {
                const data = res.data;
                setData(data);
        })

    }, []);

    return [data]
}

export default useAxios