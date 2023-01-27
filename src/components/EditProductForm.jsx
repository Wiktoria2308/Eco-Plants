import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const EditProductForm = ({ product }) => {
  const [photo, setPhoto] = useState(false);

  const [priceIdInfo, setPriceIdInfo] = useState("");

  const handlePhotoChange = (e) => {
    if (!e.target.files.length) {
      setPhoto(null);
      return;
    }
    setPhoto(e.target.files[0]);
  };

  const { handleSubmit, register } = useForm();

  const onEdit = async (data) => {

    if (data.price) {
		if(data.price_id === ""){
			setPriceIdInfo("Please enter the price ID from Stripe.");
			return;
		}
      
    }

    if (photo) {
      const fileRef = ref(
        storage,
        `products_photos/${data.name}/${photo.name}`
      );
      const uploadResult = await uploadBytes(fileRef, photo);

      const photoURL = await getDownloadURL(uploadResult.ref);

      let newData = {
        name: data.name || product.name,
        description: data.description || product.description,
        category: data.category || product.category,
        type: data.type || product.type,
        height: data.height || product.height,
        location: data.location || product.location,
        photoURL: photoURL || product.photoURL,
        pot_size: data.pot_size || product.pot_size,
        price: data.price || product.price,
        price_id: data.price_id || product.price_id,
        quantity: data.quantity || product.quantity,
      };
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, newData);

      toast.success("Product updated!");
    } else {
      let newData = {
        name: data.name || product.name,
        description: data.description || product.description,
        category: data.category || product.category,
        type: data.type || product.type,
        height: data.height || product.height,
        location: data.location || product.location,
        photoURL: product.photoURL,
        pot_size: data.pot_size || product.pot_size,
        price: data.price || product.price,
        price_id: data.price_id || product.price_id,
        quantity: data.quantity || product.quantity,
      };
      const docRef = doc(db, "products", product.id);
      await updateDoc(docRef, newData);

      toast.success("Product updated!");
    }
  };

  return (
    <>
      {product ? (
        <Card>
          <Card.Body>
            <Card.Title>Edit a product:</Card.Title>

            <Form onSubmit={handleSubmit(onEdit)} noValidate>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name </Form.Label>
                <Form.Control
                  defaultValue={product.name}
                  type="text"
                  {...register("name")}
                />
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description </Form.Label>
                <Form.Control
                  defaultValue={product.description}
                  className="pb-5"
                  type="text"
                  {...register("description")}
                />
              </Form.Group>

              <Form.Group controlId="category" className="mb-3">
                <Form.Label>Category </Form.Label>
                <Form.Text> (Current category: {product.category})</Form.Text>
                <Form.Select className="" {...register("category")}>
                  <option></option>
                  <option value="Houseplants">Houseplants</option>
                  <option value="Garden plants">Garden plants</option>
                  <option value="Seeds">Seeds</option>
                  <option value="Accessories">Accessories</option>
                </Form.Select>
              </Form.Group>

              {product.category === "Houseplants" ? (
                <>
                  <Form.Group controlId="type" className="mb-3">
                    <Form.Label>Type </Form.Label>
                    <Form.Text> (Current type: {product.type})</Form.Text>
                    <Form.Select className="" {...register("type")}>
                      <option></option>
                      <option value="Orchids">Orchid</option>
                      <option value="Succulents">Succulent</option>
                      <option value="Cactuses">Cactus</option>
                    </Form.Select>
                  </Form.Group>{" "}
                </>
              ) : null}

              {product.category === "Garden plants" ? (
                <Form.Group controlId="type" className="mb-3">
                  <Form.Label>Type </Form.Label>
                  <Form.Text> (Current type: {product.type})</Form.Text>
                  <Form.Select className="" {...register("type")}>
                    <option></option>
                    <option value="Berry bushes">Berry bush</option>
                    <option value="Ornamental shrubs">Ornamental shrub</option>
                  </Form.Select>
                </Form.Group>
              ) : null}

              {product.category === "Seeds" ? (
                <Form.Group controlId="type" className="mb-3">
                  <Form.Label>Type </Form.Label>
                  <Form.Text> (Current type: {product.type})</Form.Text>
                  <Form.Select className="" {...register("type")}>
                    <option></option>
                    <option value="Vegetable seeds">Vegetable seeds</option>
                    <option value="Herbs seeds">Herbs seeds</option>
                    <option value="Flower seeds">Flower seeds</option>
                  </Form.Select>
                </Form.Group>
              ) : null}

              {product.category === "Accessories" ? (
                <Form.Group controlId="type" className="mb-3">
                  <Form.Label>Type </Form.Label>
                  <Form.Text> (Current type: {product.type})</Form.Text>
                  <Form.Select className="" {...register("type")}>
                    <option></option>
                    <option value="Pots">Pot</option>
                    <option value="Watering cans">Watering can</option>
                    <option value="Soil">Soil</option>
                  </Form.Select>
                </Form.Group>
              ) : null}

              {product.category === "Garden plants" ||
              product.category === "Houseplants" ? (
                <Form.Group controlId="height" className="mb-3">
                  <Form.Label>Height {"(cm)"} </Form.Label>
                  <Form.Control
                    min={1}
                    defaultValue={product.height}
                    type="number"
                    {...register("height")}
                  />
                </Form.Group>
              ) : null}

              {product.category === "Garden plants" ||
              product.category === "Houseplants" ? (
                <Form.Group controlId="pot_size" className="mb-3">
                  <Form.Label>Pot size {"(cm)"}</Form.Label>
                  <Form.Control
				    min={1}
                    defaultValue={product.pot_size}
                    type="number"
                    {...register("pot_size")}
                  />
                </Form.Group>
              ) : null}

              {product.category === "Garden plants" ||
              product.category === "Houseplants" ? (
                <Form.Group controlId="location" className="mb-3">
                  <Form.Label>Location </Form.Label>
                  <Form.Text> (Current location: {product.location})</Form.Text>
                  <Form.Select className="" {...register("location")}>
                    <option></option>
                    <option value="Sun">Sun</option>
                    <option value="Partial sun">Partial sun</option>
                    <option value="(Half) shade">{"(Half)"} shade </option>
                  </Form.Select>
                </Form.Group>
              ) : null}

              {product.category === "Seeds" ||
              product.category === "Accessories" ? (
                <Form.Group controlId="height" className="mb-3">
                  <Form.Label>Height {"(cm)"}</Form.Label>
                  <Form.Control
                    min={1}
                    defaultValue={product.height}
                    type="number"
                    {...register("height")}
                  />
                </Form.Group>
              ) : null}

              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price {"(SEK)"} </Form.Label>
                <Form.Control
				  min={1}
                  defaultValue={product.price}
                  type="number"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
              </Form.Group>

              <Form.Group controlId="price_id" className="mb-3">
                <Form.Label>Price Stripe ID</Form.Label>
                <Form.Control
                  type="text"
                  {...register("price_id")}
                />
                <Form.Text>
                  <p className="error-message">{priceIdInfo}</p>
                </Form.Text>{" "}
              </Form.Group>

              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity </Form.Label>
                <Form.Control
				  min={0}
                  type="number"
                  defaultValue={product.quantity}
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                />
              </Form.Group>

              <Form.Group id="photo" className="mb-3">
                <Form.Label id="photo-label">Photo</Form.Label>
                <Form.Control
                  aria-labelledby="photo-label"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <Form.Text>
                  {photo
                    ? `${photo.name} (${Math.round(photo.size / 1024)} kB)`
                    : null}
                </Form.Text>
              </Form.Group>

              <Button className="custom-button" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );
};

export default EditProductForm;
