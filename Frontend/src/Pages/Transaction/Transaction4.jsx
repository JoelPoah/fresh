import React, { useState } from "react";
import Select from "react-select";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import './Transaction.css'
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Button,
  Heading,
  Card,
  CardBody
} from "@chakra-ui/react";

export default function Transaction() {
  var navigate = useNavigate()
  const Genderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unisex", label: "Unisex" },
  ];

  const Categoryoptions = [
    { value: "Shirt", label: "Shirt" },
    { value: "Pants", label: "Pants" },
    { value: "Others", label: "Others" },
  ];

  const [product_name, setName] = useState('')
  const [product_gender, setGender] = useState('')
  const [product_category, setCategory] = useState('')
  const [product_size, setSize] = useState('')
  const [product_description, setDescription] = useState('')
  const [front_img, setFrontimg] = useState('')
  const [back_img, setBackimg] = useState('')
  const [checkoutError, setCheckoutError] = useState('')
  const [checkoutSuccess, setCheckoutSuccess] = useState('')

  const handleCheckout = async (e) => {
    e.preventDefault()
    var formData = new FormData();
    formData.append('front_img', front_img);
    formData.append('back_img', back_img);
    console.log(formData)
    // {product_name, product_gender, product_category, product_size, product_description, formData}
    try {
      await axios.put(`http://localhost:8081/image/checkout/4`, formData).then((response) => {
        const {result} = response.data
        setCheckoutSuccess(result)
        setCheckoutError('')
      })
    } catch (error) {
      setCheckoutSuccess('')
      setCheckoutError(error.response.data.result)
    }


    try {
      await axios.put(`http://localhost:8081/locker/checkout/4`, {product_name, product_gender, product_category, product_size, product_description}).then((response) => {
        const {result} = response.data
        setCheckoutSuccess(result)
        setCheckoutError('')
        navigate("/")
      })
    } catch (error) {
      setCheckoutSuccess('')
      setCheckoutError(error.response.data.result)
    }
  }

  return (
    <Card maxW="sm" style={{backgroundColor: 'lightgrey'}} pl={25} pr={25}>
      <CardBody>
    <div>
      <Heading>Checkout Details</Heading>
      <form action="">
        <FormControl isRequired>
          <FormLabel>Product name</FormLabel>
          <Input onChange={(e) => {setName(e.target.value)}} placeholder="Jacket" style={{backgroundColor: 'white'}}/>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Gender"
            noOptionsMessage={() => "No gender found"}
            options={Genderoptions}
            onChange={setGender}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Category"
            noOptionsMessage={() => "No category found"}
            options={Categoryoptions}
            onChange={setCategory}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Size</FormLabel>
          <Input onChange={(e) => setSize(e.target.value)} placeholder="M / UK40" style={{backgroundColor: 'white'}}/>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input onChange={(e) => {setDescription(e.target.value)}} type="text"  style={{backgroundColor: 'white'}}/>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Upload front of the clothes</FormLabel>
          <Input onChange={(e) => {setFrontimg(e.target.files[0])}} type="file" pt={1}  style={{backgroundColor: 'white'}}/>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Upload back of the clothes</FormLabel>
          <Input onChange={(e) => {setBackimg(e.target.files[0])}} type="file" pt={1}  style={{backgroundColor: 'white'}}/>
        </FormControl>

        <Button onClick={handleCheckout} colorScheme='blue' mt={5}>Submit</Button>
        <p>{checkoutError}</p>
        <p>{checkoutSuccess}</p>
      </form>
    </div>
    </CardBody>
    </Card>
  );
}
