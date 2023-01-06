import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";


const CreateProductForm = () => {

	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
        watch,
	} = useForm();
    
    const watchAllFields = watch();


	const onCreate = async (data) => {
	
		await addDoc(collection(db, "products"), {
			...data,
		});

		toast.success("Product added!");
		reset();
	};
 

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="mb-4 mt-2">Create a new product</Card.Title>

					<Form onSubmit={handleSubmit(onCreate)} noValidate>
						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Name *</Form.Label>
							<Form.Control
								type="text"
								{...register("name", {
									required: "Please enter the name of the product.",
								})}
							/>
							{errors.name ? <div className="error-message">{errors.name.message}</div> : null}
						</Form.Group>

						<Form.Group controlId="description" className="mb-3">
							<Form.Label>Description *</Form.Label>
							<Form.Control
								className="pb-5"
								type="text"
								{...register("description", {
									required: "Please fill in the description.",
								})}
							/>
							{errors.description ? <div className="error-message">{errors.description.message}</div> : null}
						</Form.Group>

						<Form.Group controlId="category" className="mb-3">
							<Form.Label>Category *</Form.Label>

							<Form.Select
								className=""
								{...register("category", {
									required: "Please select category.",
								})}
							>
								<option></option>
								<option name="houseplants" value="Houseplants">Houseplants</option>
								<option value="Outdoor plants">Outdoor plants</option>
								<option value="Seeds">Seeds</option>
								<option value="Accessories">Accessories</option>
							</Form.Select>
							{errors.category ? <div className="error-message">{errors.category.message}</div> : null}
						</Form.Group>

						{ watchAllFields.category === "Houseplants" ? <Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please select type.",
								})}
							>
								<option></option>
								<option value="Orchids">Orchids</option>
								<option value="Cactus">Cactus</option>
							</Form.Select>
							{errors.type ? <div className="error-message">{errors.type.message}</div> : null}
						</Form.Group> : null }

                        { watchAllFields.category === "Outdoor plants" ? <Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please select type.",
								})}
							>
								<option></option>
								<option value="Berry bushes">Berry bushes</option>
								<option value="Ornamental shrubs">Ornamental shrubs</option>
							</Form.Select>
							{errors.type ? <div className="error-message">{errors.type.message}</div> : null}
						</Form.Group> : null }

                        { watchAllFields.category === "Seeds" ? <Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please select type.",
								})}
							>
								<option></option>
								<option value="Vegetable seeds">Vegetable seeds</option>
								<option value="Herbs seeds">Herbs seeds</option>
                                <option value="Flower seeds">Flower seeds</option>
							</Form.Select>
							{errors.type ? <div className="error-message">{errors.type.message}</div> : null}
						</Form.Group> : null }

                        { watchAllFields.category === "Accessories" ? <Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please select type.",
								})}
							>
								<option></option>
								<option value="Pots">Pots</option>
								<option value="Watering cans">Watering cans</option>
                                <option value="Soil">Soil</option>
							</Form.Select>
							{errors.type ? <div className="error-message">{errors.type.message}</div> : null}
						</Form.Group> : null }

                        { watchAllFields.category === "Outdoor plants" ||  watchAllFields.category === "Houseplants" ?  <Form.Group controlId="height" className="mb-3">
							<Form.Label>Height *</Form.Label>
							<Form.Control
								type="number"
								{...register("height", {
									required: "Please enter the height.",
								})}
							/>
							{errors.height ? <div className="error-message">{errors.height.message}</div> : null}
						</Form.Group> : null }

                        { watchAllFields.category === "Seeds" ||  watchAllFields.category === "Accessories" ?  <Form.Group controlId="height" className="mb-3">
							<Form.Label>Height</Form.Label>
							<Form.Control
								type="number"
								{...register("height")}
							/>
						</Form.Group> : null }
                        

                        <Form.Group controlId="price" className="mb-3">
							<Form.Label>Price *</Form.Label>
							<Form.Control
								type="number"
								{...register("price", {
									required: "Please enter the price.",
								})}
							/>
							{errors.price ? <div className="error-message">{errors.price.message}</div> : null}
						</Form.Group>

                        <Form.Group controlId="quantity" className="mb-3">
							<Form.Label>Quantity *</Form.Label>
							<Form.Control
								type="number"
								{...register("quantity", {
									required: "Please enter the quantity of products.",
								})}
							/>
							{errors.quantity ? <div className="error-message">{errors.quantity.message}</div> : null}
						</Form.Group>


						<Button className="custom-button" type="submit">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
};

export default CreateProductForm;
