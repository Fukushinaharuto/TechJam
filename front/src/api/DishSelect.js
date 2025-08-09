import axios from "axios";
import Cookies from "js-cookie";

export async function DishSelect(){
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/dish/select`;
    const authToken = Cookies.get("authToken");
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return{
            success: false,
        };
    }
}