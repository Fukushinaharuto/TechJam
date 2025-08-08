"use server"
import axios from 'axios';

export async function PlacesApi({ placeId, fields }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&language=ja&key=${apiKey}`;

    try {
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.data.status !== 'OK') {
            console.error('API request failed:', response.data.status, response.data.error_message);
            return null;
        }

        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch place details', error);
        return null;
    }
}
