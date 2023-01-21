import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";

import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
{
  /* <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/> */
}

export default function Catalog() {
  const [itemdetail, setItemdetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8081/catalog").then((response) => {
      const { result } = response.data;
      // for (var i = 0; i < result.length; i++) {
      //   lockerId.push({
      //     label: result[i].product_name,
      //     value: result[i].product_gender,
      //   });
      //   console.log(result[0])
      // }

      setItemdetail(result);
      // console.log(itemdetail[0][1].locker_id)
      // console.log(result[1].locker_id)
      // setAirports(airportNames);
    });
  }, []);

  useEffect(() => {
    console.log(itemdetail);
  });

  const handleSwitch1 = async (e) => {
    e.preventDefault();
    navigate('/checkout/1')
  };

  const handleSwitch2 = async (e) => {
    e.preventDefault();
    navigate('/checkout/2')
  };

  return (
    <div>
      <div>
        <Card maxW="sm" backgroundColor="grey">
          <CardBody>
            <Carousel variant="dark">
              <Carousel.Item>
                <Image
                  boxSize="350px"
                  src={"http://localhost:8081/" + itemdetail[0]?.front_img}
                  alt="front image"
                  borderRadius="lg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  boxSize="350px"
                  src={"http://localhost:8081/" + itemdetail[0]?.back_img}
                  alt="back image"
                  borderRadius="lg"
                />
              </Carousel.Item>
            </Carousel>

            <Stack mt="6" spacing="3">
              <Heading size="md">
                {itemdetail[0]?.product_gender} {itemdetail[0]?.product_name}
              </Heading>
              <Text>Size: {itemdetail[0]?.product_size}</Text>
              <Text>Category: {itemdetail[0]?.product_category}</Text>

              <Text>{itemdetail[0]?.product_description}</Text>

              <Text color="blue.600" fontSize="2xl">
                Locker number: {itemdetail[0]?.locker_id}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button onClick={handleSwitch1} variant="solid" colorScheme="blue">
                Switch
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card maxW="sm">
          <CardBody>
            <Carousel variant="dark">
              <Carousel.Item>
                <Image
                  boxSize="350px"
                  src={"http://localhost:8081/" + itemdetail[1]?.front_img}
                  alt="front image"
                  borderRadius="lg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  boxSize="350px"
                  src={"http://localhost:8081/" + itemdetail[1]?.back_img}
                  alt="back image"
                  borderRadius="lg"
                />
              </Carousel.Item>
            </Carousel>

            <Stack mt="6" spacing="3">
              <Heading size="md">
                {itemdetail[1]?.product_gender} {itemdetail[1]?.product_name}
              </Heading>
              <Text>Size: {itemdetail[1]?.product_size}</Text>
              <Text>Category: {itemdetail[1]?.product_category}</Text>

              <Text>{itemdetail[1]?.product_description}</Text>

              <Text color="blue.600" fontSize="2xl">
                Locker number: {itemdetail[1]?.locker_id}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button onClick={handleSwitch2} variant="solid" colorScheme="blue">
                Switch
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
