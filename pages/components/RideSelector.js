import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../../data/carList";
import uniqid from "uniqid";

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);
  useEffect(() => {
    const rideDuration = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?geometries=geojson&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.routes) setRideDuration(data.routes[0].duration / 100);
      });
  }, [pickupCoordinates, dropoffCoordinates]);

  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more info</Title>
      <CarList>
        {carList.map((car, i) => {
          car.id = uniqid();

          return (
            <Car key={car.id}>
              <CarImage src={car.imgUrl} />
              <CarDescription>
                <Service>{car.service}</Service>
                <Time>5 min away</Time>
              </CarDescription>
              <CarPrice>
                {"$" + (rideDuration * car.multiplier).toFixed(2)}
              </CarPrice>
            </Car>
          );
        })}
      </CarList>
    </Wrapper>
  );
};
// console.log(carList);
export default RideSelector;

const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
  text-gray-500 text-center text-xs py-2 border-b
`;
const CarList = tw.div`
  overflow-y-scroll
`;

const Car = tw.div`
  flex items-center p-4 items-center
`;

const CarImage = tw.img`
  h-14 mr-4
`;

const CarDescription = tw.div`
 flex-1
`;
const Service = tw.div`
  font-medium
`;

const Time = tw.div`
  text-xs text-blue-500
`;

const CarPrice = tw.div`
  text-sm
`;
