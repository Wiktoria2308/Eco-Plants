import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { NavDropdown, Dropdown, DropdownButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PlantsDropdown = () => {
  return (
    <>
      <NavDropdown
        className="nav-color line-style line-style-link products-dropdown"
        title={
          <>
            <span className="nav-color">HousePlants</span>
            <SlArrowDown className="arrow-down" />
          </>
        }
      >
          <Dropdown.Item
          as={NavLink}
          to="/house-plants"
          className="categories-item"
        >
          All houseplants
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/house-plants/cactus"
          className="categories-item"
        >
          Cactus
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/house-plants/orchids"
          className="categories-item"
        >
          Orchids
        </Dropdown.Item>
      </NavDropdown>
      <NavDropdown
        className="nav-color line-style line-style-link products-dropdown"
        title={
          <>
            <span className="nav-color">Garden Plants</span>
            <SlArrowDown className="arrow-down" />
          </>
        }
      >
        <Dropdown.Item
          as={NavLink}
          to="/garden-plants"
          className="categories-item"
        >
          All garden plants
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/garden-plants/patio"
          className="categories-item"
        >
          Patio plants
        </Dropdown.Item>
      </NavDropdown>
      <NavDropdown
        className="nav-color line-style line-style-link products-dropdown"
        title={
          <>
            <span className="nav-color">Seeds</span>
            <SlArrowDown className="arrow-down" />
          </>
        }
      >
         <Dropdown.Item
          as={NavLink}
          to="/seeds"
          className="categories-item"
        >
          All seeds
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/seeds/vegetable"
          className="categories-item"
        >
          Vegetable seeds
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/seeds/herbs"
          className="categories-item"
        >
          Herbs seeds
        </Dropdown.Item>
        <Dropdown.Item
          as={NavLink}
          to="/seeds/flower"
          className="categories-item"
        >
          Flower seeds
        </Dropdown.Item>
      </NavDropdown>
    </>
  );
};
export default PlantsDropdown;
