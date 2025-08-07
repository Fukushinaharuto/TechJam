import axios from "axios";
import Cookies from "js-cookie";

export async function MypageIndex(){
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;
    const authToken = Cookies.get("authToken");
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return{
            success: false,
        };
    }
}