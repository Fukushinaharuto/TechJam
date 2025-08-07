import axios from "axios";

export async function Login({ name, password }) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`;

    return await axios
        .post(apiUrl, {
            name: name,
            password: password,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.warn(error);
            return {
                success: false,
                messages: error.response?.data.messages || ["エラーが発生しました"],
            };
        }
    );
}
