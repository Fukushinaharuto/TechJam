import axios from "axios";
import Cookies from "js-cookie";

export async function ReviewStore({ selectedStore, selectedDish, inputDescription, reviewScores, tags, imageFile }) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/review/store`;
    const authToken = Cookies.get("authToken");
    const data = {
        dish_id: selectedDish,
        name: selectedStore,
        description: inputDescription,
        like_count: 0,
        review_scores:reviewScores,
        tag_ids: tags,
    };
    const formData = new FormData();
    formData.append('imageUrl', imageFile);
    console.log( )
    try {
        const response = await axios.post(apiUrl, {
            imageFile: formData.get('imageUrl'),
            data,
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("料理追加失敗:", error.response?.data.message);
        return { success: false };
    }
}  