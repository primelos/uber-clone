import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const Confirm = () => {
  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const getPickCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token: token,
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token: token,
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("newData", data);

        setDropoffCoordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    if (getPickCoordinates[0] !== 0 && getDropoffCoordinates[0] !== 0) {
      getPickCoordinates(pickup);
      getDropoffCoordinates(dropoff);
    }
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>

      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideContainer>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm UberX</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
flex h-screen flex-col relative z-0
`;

const RideContainer = tw.div`
  flex-1 flex-col flex h-1/2
`;

const ConfirmButtonContainer = tw.div`
  border-t-2
`;

const ConfirmButton = tw.div`
  bg-black text-white my-4 mx-4 py-4 text-center text-xl
`;

const ButtonContainer = tw.div`
  left-4 absolute top-5 z-10 opacity-80
`;

const BackButton = tw.img`
 h-full cursor-pointer  bg-gray-100 rounded-full pos shadow-md
`;
