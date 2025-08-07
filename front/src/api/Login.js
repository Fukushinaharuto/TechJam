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
            console.log(error.response?.data.message)
            return {
                success: false,
                messages: error.response?.data.message,
            };
        }
    );
}
