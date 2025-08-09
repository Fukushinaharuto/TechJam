'use client';
import { Footer } from '@/components/Footer';
import { ReviewContext } from '@/components/ReviewContext';
import { SearchBox } from '@/components/SearchBox';
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { RestaurantIndex } from '@/api/RestaurantIndex'; // ← API呼び出しモジュール
import { PlacesApi } from '@/api/PlacesApi';
import { RestaurantShow } from '@/components/RestaurantShow';

export default function Page() { 
    const [searchOpen, setSearchOpen] = useState(false); 
    const [restaurants, setRestaurants] = useState([]);
    const [placeDetails, setPlaceDetails] = useState({
        name: "",
        address: "",
        phone: "",
        openingHours: null,
        website: "",
      });


    useEffect(() => {
        const Index = async () => {
        const response = await RestaurantIndex();
        if (response) {
            setRestaurants(response.restaurants);
            console.log(response.restaurants)
        }
        };
        
        Index();
    }, []);

    const ICONS = {
        restaurant: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        park: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: ['places'],
        language: 'ja',
    });

    const onMapClick = async (placeId) => {
        if (!placeId) {
            alert("Place IDが取得できませんでした。");
            return;
        }
        
        const fields = "name,formatted_address,formatted_phone_number,opening_hours,website,geometry";
        const data = await PlacesApi({ placeId, fields });
        
    if (data) {
        setPlaceDetails({
            name: data.name || "",
            address: data.formatted_address || "",
            phone: data.formatted_phone_number || "",
            openingHours: data.opening_hours || null,
            website: data.website || "",
        });
        console.log(data)
    } else {
        alert("座標情報が取得できませんでした。");
    }
    };

    const center = { lat: 35.1744608, lng: 136.8793602 };

    return ( 
        <div className='mb-6'>
        {/* <Header/> */}
        <button onClick={() => setSearchOpen(!searchOpen)}>開く</button>

        {isLoaded && (
            <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={15}
            >
            {restaurants.map((r) => (
            <Marker
                key={r.id}
                position={{
                lat: parseFloat(r.latitude),
                lng: parseFloat(r.longitude),
                }}
                icon={ICONS['restaurant']}
                onClick={() => onMapClick(r.place_id)}
            />
            ))}
            </GoogleMap>
        )}

        <div className='p-4'>
            
            {searchOpen && (
            <div>
                <SearchBox setSearchOpen={setSearchOpen} />
            </div>
            )}
            <ReviewContext 
            name={'料理名'}
            userImage={'/icon.svg'}
            dishImage={'/test.png'}
            />
            <RestaurantShow
                placeDetails={placeDetails}
            />
        </div>

        <div className='fixed bottom-0 left-0 w-full z-50'>
            <Footer/>
        </div> 
        </div>   
    );
}
