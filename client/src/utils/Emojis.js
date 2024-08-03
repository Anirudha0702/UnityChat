import axios from 'axios';
export const fetchEmojis = async () => {
    try {
        const response = await axios.get(`https://emoji-api.com/emojis?access_key=${import.meta.env.VITE_emojiAPI}`);
        // return response.data;
        localStorage.setItem('emojis', JSON.stringify(response.data));
    } catch (error) {
        console.error(error);
    }
    

}