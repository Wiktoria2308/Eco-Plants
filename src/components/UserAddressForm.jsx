import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { useState, useEffect } from "react";

const UserAddressForm = ({ user, redirect, loading }) => {
  const [data, setData] = useState(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      let order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem('order')) : [];
     if(order){
      localStorage.setItem("order",  JSON.stringify([]));
      let orderArray = [];
      orderArray.push(data)
      localStorage.setItem("order", JSON.stringify(orderArray));
      redirect();
     }

    }
  }, [data]);

  const onCreate = async (data) => {
    if(user){
      data.uid = user.uid;
      data.email = user.email;
  
      if (data) {
        setData(data);
      }
    }
    else{
      if (data) {
        setData(data);
      }
    }
  
    reset();
  };

  return (
    <>
      <Card className="guest-address-form">
        <Card.Body>
          <Card.Title className="mb-3">Shipping adress</Card.Title>
          <span className="only-sweden">(Only in Sweden)</span>
          <Form onSubmit={handleSubmit(onCreate)} noValidate>
            <Form.Group controlId="first_name" className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                {...register("first_name", {
                  required: "Please enter your First name.",
                })}
              />
              {errors.first_name && (
                <div className="error-message">{errors.first_name.message}</div>
              )}
            </Form.Group>

            <Form.Group controlId="last_name" className="mb-3">
              <Form.Label>Last name *</Form.Label>
              <Form.Control
                type="text"
                {...register("last_name", {
                  required: "Please enter your Last name.",
                })}
              />
              {errors.last_name && (
                <div className="error-message">{errors.last_name.message}</div>
              )}
            </Form.Group>

            { !user ?   <Form.Group controlId="e_mail" className="mb-3">
              <Form.Label>E-mail *</Form.Label>
              <Form.Control
                type="text"
                {...register("e_mail", {
                  required: "Please enter Email.",
                })}
              />
              {errors.e_mail && (
                <div className="error-message">{errors.e_mail.message}</div>
              )}
            </Form.Group> : null}

            <Form.Group controlId="tel" className="mb-3">
              <Form.Label>Telephone *</Form.Label>
              <PhoneInputWithCountry
                defaultCountry="SE"
                name="tel"
                control={control}
                rules={{ required: "Please enter Telephone number." }}
              />
              {errors.tel && (
                <div className="error-message">{errors.tel.message}</div>
              )}
            </Form.Group>

            <Form.Group controlId="street_address" className="mb-3">
              <Form.Label>Street address *</Form.Label>
              <Form.Control
                type="text"
                {...register("street_address", {
                  required: "Please enter Street address.",
                })}
              />
              {errors.street_address && (
                <div className="error-message">
                  {errors.street_address.message}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                {...register("city", {
                  required: "Please enter City.",
                })}
              />
              {errors.city && (
                <div className="error-message">{errors.city.message}</div>
              )}
            </Form.Group>

            <Button
              className="go-to-payment-button"
              type="submit"
              // onClick={redirect}
              disabled={loading}
            >
              {loading ? "Loading..." : "Go to payment"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserAddressForm;
