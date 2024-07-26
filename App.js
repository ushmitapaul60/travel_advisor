import React, {useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from './api';
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
// import Place_details from "./Components/Place_details/Place_details";

const App = () => {

const [places, setPlaces] = useState([]);
const [weatherData, setWeatherData] = useState([]);
const [filteredPlaces, setFilteredPlaces]= useState([]);
const [childClicked, setChildClicked] = useState(null);
    
const [coordinates, setCoordinates] = useState({lat:0,lng:0});
const [bounds, setBounds]= useState({sw:0, ne:0});
const [isLoading, setIsLoading] = useState(false);
const [type, setType]=useState('restaurants');
const [rating, setRating]= useState('');

useEffect(()=>{
  navigator.geolocation.getCurrentPosition(({coordinates:{ latitude,longitude }})=>{
    setCoordinates({ lat: latitude, lng: longitude});
  });

},[]);

useEffect(()=>{
  const filteredPlaces = places.filter((place)=> place.rating>rating)
  setFilteredPlaces(filteredPlaces);
},[rating]);

  useEffect(()=>{
    if(bounds.sw && bounds.ne){
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
      .then((data)=> setWeatherData(data))

    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data)=>{
      console.log(data);
      setPlaces(data?.filter((place)=> place.name && place.num_reviews >0));
      setIsLoading(false);
    })
  }
  }, [type, coordinates, bounds]);

  console.log(places)
  console.log(filteredPlaces)

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length ?filteredPlaces:places}
          setChildClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={places}
          setChildClicked={setChildClicked}
          weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
