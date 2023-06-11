import { SlArrowDown } from "react-icons/sl";
import { NavDropdown, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const categoryData = [
  {
    title: "HousePlants",
    path: "/house-plants",
    items: [
      { title: "All houseplants", path: "/house-plants" },
      { title: "Cactus", path: "/house-plants/cactuses" },
      { title: "Succulents", path: "/house-plants/succulents" },
      { title: "Orchids", path: "/house-plants/orchids" },
    ],
  },
  {
    title: "Garden Plants",
    path: "/garden-plants",
    items: [
      { title: "All garden plants", path: "/garden-plants" },
      { title: "Berry bushes", path: "/garden-plants/berry-bushes" },
      { title: "Ornamental shrubs", path: "/garden-plants/ornamental-shrubs" },
    ],
  },
  {
    title: "Seeds",
    path: "/seeds",
    items: [
      { title: "All seeds", path: "/seeds" },
      { title: "Vegetable seeds", path: "/seeds/vegetable-seeds" },
      { title: "Herbs seeds", path: "/seeds/herbs-seeds" },
      { title: "Flower seeds", path: "/seeds/flower-seeds" },
    ],
  },
];

const PlantsDropdown = () => {
  return (
    <>
      {categoryData.map((category, index) => (
        <NavDropdown
          key={index}
          className="nav-color line-style line-style-link products-dropdown"
          title={
            <>
              <span className="nav-color">{category.title}</span>
              <SlArrowDown className="arrow-down" />
            </>
          }
        >
          {category.items.map((item, itemIndex) => (
            <Dropdown.Item
              key={itemIndex}
              as={NavLink}
              to={item.path}
              className="categories-item"
            >
              {item.title}
            </Dropdown.Item>
          ))}
        </NavDropdown>
      ))}
    </>
  );
};

export default PlantsDropdown;
