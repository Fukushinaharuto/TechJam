'use client';
import { useRouter } from 'next/navigation';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
// import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReviewContext } from '@/components/ReviewContext';
import { SearchBox } from '@/components/SearchBox';
import { useState } from 'react';

export default function Page() { 
    const [searchOpen, setSearchOpen] = useState(false); 
    const router = useRouter();
    const pins = [
        { id: 'a', type: 'restaurant', position: { lat: 35.657, lng: 139.738 }, link: '/detail/restaurant-a' },
        { id: 'b', type: 'park', position: { lat: 35.658, lng: 139.736 }, link: '/detail/park-b' },
    ];
    const ICONS = {
        restaurant: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        park: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    };
    return ( 
        <div>
            {/* <Header/> */}
            <button onClick={() => setSearchOpen(!searchOpen)}>開く</button>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <Map        
                    style={{ width: '100%', height: '300px' }}
                    defaultZoom={15}        
                    defaultCenter={{ lat: 35.656, lng: 139.737 }}
                >        
                    {pins.map(pin => (
                        <Marker            
                            key={pin.id}           
                            position={pin.position}            
                            icon={ICONS[pin.type]}            
                            onClick={() => router.push(pin.link)}          
                        />        
                    ))}      
                </Map>   
            </APIProvider>
            <div className='p-4'>
                {searchOpen &&
                    <div>
                        <SearchBox
                            setSearchOpen={setSearchOpen}
                        />
                    </div>
                }
                <ReviewContext 
                    name={'料理名'}
                    userImage={'/icon.svg'}
                    dishImage={'/test.png'}
                />
            </div>
            <div className='fixed bottom-0 left-0 w-full z-50'>
                <Footer/>
            </div> 
            
        </div>   
    );
};