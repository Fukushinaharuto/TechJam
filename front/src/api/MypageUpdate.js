import axios from "axios";
import Cookies from "js-cookie";

export async function MypageUpdate({ editName, editImageFile }) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/user/update`;
    const authToken = Cookies.get("authToken");
    const formData = new FormData();
    formData.append('imageUrl', editImageFile);
    try {
        const response = await axios.post(apiUrl, {
            imageFile: formData.get('imageUrl'),
            name: editName,
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            messages: error.response?.data.message,
        };
    }
}
