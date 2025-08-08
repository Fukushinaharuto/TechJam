"use client";

import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Footer } from "@/components/Footer";
import { Head } from "@/components/Head";
import { PlacesApi } from "@/api/PlacesApi";
import { DishStore } from "@/api/DishStore";
import { RestaurantSelect } from "@/api/RestaurantSelect";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 35.1706431,
  lng: 136.8816945,
};

const libraries = ["places"];
export default function Page() {
  const [restaurant, setRestaurant] = useState("");
  const [dish, setDish] = useState("");
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [marker, setMarker] = useState(null);
  const [placeId, setPlaceId] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [select, setSelect] = useState(null);

  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const Index = async() => {
      const response = await RestaurantSelect(); 
      console.log(response.restaurants);
      setSelect(response.restaurants);
    }
    Index()
  }, []);

  const handleSubmit = async () => {
    let dataToSend;
  
    if (isOpen) {
      // isOpenがtrueのとき、たとえば店舗が存在しない場合にplaceIdや座標を使う例
      dataToSend = {
        dish,
        price,
        placeId,
        restaurant,
        lat,
        lng,
        restaurantId: null, // または不要なら送らない
      };
    } else {
      // isOpenがfalseのとき、既存店舗のIDなどで送る例
      dataToSend = {
        dish,
        price,
        placeId: "",
        restaurant: "", // placeIdは送らないか空文字に
        lat: null,
        lng: null,
        restaurantId, // 既存の店舗IDを使う
      };
    }
  
    const response = await DishStore(dataToSend);
  
    if (!response.success) {
      alert("成功");
    } else {
      alert("失敗");
    }
  };
  

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
    language: "ja",
  });

  const onMapClick = async (e) => {
    const placeId = e.placeId;
    if (!placeId) {
      alert("Place IDが取得できませんでした。");
      return;
    }
  
    const fields = "geometry,name";
    const data = await PlacesApi({ placeId, fields });
  
    if (data) {
      setRestaurant(data.name);
      const lat = data.geometry?.location?.lat || null;
      const lng = data.geometry?.location?.lng || null;
      console.log(lat,lng)
      setLat(lat);
      setLng(lng);
      setPlaceId(placeId);
      setMarker({ lat, lng });
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
      }
    } else {
      alert("座標情報が取得できませんでした。");
    }
  };
  
  

  const onPlacesChanged = async () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;
  
    const place = places[0];
    const placeId = place.place_id;
    const location = place.geometry?.location;
  
    if (placeId && location) {
      const lat = location.lat();
      const lng = location.lng();
      const fields = "geometry,name";
      const data = await PlacesApi({ placeId, fields });
      setRestaurant(data.name);
      setLat(lat);
      setLng(lng);
      setPlaceId(placeId);
      setMarker({ lat, lng });
      mapRef.current.panTo({ lat, lng });
    } else {
      alert("Place ID または 座標が取得できませんでした。");
    }
  };
  

  return (
    <div>
      <Head title={"料理追加"} />

      {/* Dish Input */}
      <div className="px-4">
        <div className="grid grid-cols-3 w-full bg-[#FFF4E6] p-3 rounded-xl my-5">
          <div className="text-center col-span-1 text-2xl">
            料理名<span className="text-[#ff0000]">*</span>
          </div>
          <input
            type="text"
            className="bg-[#FF8A65] col-span-2 rounded-md px-4"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
        </div>
      </div>

      {/* Price Input */}
      <div className="px-4">
        <div className="grid grid-cols-3 w-full bg-[#FFF4E6] p-3 rounded-xl my-5">
          <div className="text-center col-span-1 text-2xl">
            値段<span className="text-[#ff0000]">*</span>
          </div>
          <input
            type="number"
            className="bg-[#FF8A65] col-span-2 rounded-md px-4"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Restaurant Select or Display */}
      {!isOpen ? (
        <div className="px-4">
          <div className="grid grid-cols-3 w-full bg-[#FFF4E6] p-3 rounded-xl my-5">
            <div className="text-center col-span-1 text-2xl">
              店舗名<span className="text-[#ff0000]">*</span>
            </div>
            <select
              className="bg-[#FF8A65] col-span-2 rounded-2xl px-4 py-1"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
            >
              <option value="" disabled hidden>店舗を選択</option>
              {select && select.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <div className="grid grid-cols-3 w-full bg-[#FFF4E6] p-3 rounded-xl my-5">
            <div className="flex items-center justify-center col-span-1 text-2xl">
              店舗名<span className="text-[#ff0000]">*</span>
            </div>
            <div className="col-span-2 rounded-2xl px-4 py-1">
              {restaurant}
            </div>
          </div>
        </div>
      )}

      {/* 店舗が存在しない場合の切替ボタン */}
      <div className="flex justify-end items-center pr-6 mt-5">
        <button
          className="px-5 py-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white text-lg transition-colors mb-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          店舗が存在しない
        </button>
      </div>

      {/* Google Map */}
      {isLoaded && isOpen && (
        <div className="px-4">
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="レストランを検索"
              className="w-full p-2 border mb-2"
            />
          </StandaloneSearchBox>

          <GoogleMap
            onClick={(e) =>onMapClick(e)}
            mapContainerStyle={containerStyle}
            center={marker || center}
            zoom={15}
            onLoad={(map) => (mapRef.current = map)}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </div>
      )}
      <div className="flex justify-center my-6">
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg"
          onClick={handleSubmit}
        >
          料理を追加
        </button>
      </div>
      <div className="mb-20"></div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </div>
  );
}
