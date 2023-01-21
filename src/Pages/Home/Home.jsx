import React, { useEffect, useState } from "react";
import axios from "axios";
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

export default function Catalog() {
  const [itemdetail, setItemdetail] = useState([]);

  useEffect(() => {
    axios.get("https://k5ywx4t39h.execute-api.us-east-1.amazonaws.com/dev/catalog").then((response) => {
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

  return (
    <div>
      <div>
        {itemdetail.map((i) => (
          <div key={i.locker_id}>
            {/* <p>{i.product_name}</p>
            <p>{i.product_gender}</p>
            <p>{i.front_img}</p> */}
            {/* <Box boxSize="sm">
              <Image src={"http://localhost:8081/" + i.front_img} alt="" />
            </Box> */}
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={"https://k5ywx4t39h.execute-api.us-east-1.amazonaws.com/dev/" + i.front_img}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{i.product_gender} {i.product_name}</Heading>
                  <Text>
                    Size: {i.product_size}
                  </Text>
                  <Text>
                    Category: {i.product_category}
                  </Text>

                  <Text>
                    {i.product_description}
                  </Text>

                  <Text color="blue.600" fontSize="2xl">
                    Locker number: {i.locker_id}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
