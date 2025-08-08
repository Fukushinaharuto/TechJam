import axios from "axios";
import Cookies from "js-cookie";

export async function DishStore({ dish, price, placeId, lat, lng, restaurantId, restaurant }) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/dish/store`;
    const authToken = Cookies.get("authToken");
    console.log(dish, price, placeId, lat, lng, restaurantId, restaurant )
    try {
        const response = await axios.post(
            apiUrl,
            {
                dish,
                price,
                placeId,
                lat,
                lng,
                restaurant,
                restaurantId,
            },
            {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            }
        );
        return response.data;
    } catch (error) {
        console.error("料理追加失敗:", error.response?.data.message);
        return { success: false };
    }
}  