import { Select } from "@chakra-ui/react";
import { FC } from "react";

const Seasons = [
  {
    id: 1,
    name: "Winter",
  },
  {
    id: 2,
    name: "Spring",
  },
  {
    id: 3,
    name: "Summer",
  },
  {
    id: 4,
    name: "Fall",
  },
  {
    id: 5,
    name: "All",
  },
];

const WomanCategories = [
  {
    id: 1,
    name: "Tops & T-shirts",
  },

  {
    id: 2,
    name: "Sweaters & Hoodies",
  },

  {
    id: 3,
    name: "Bottoms & Leggings",
  },

  { id: 4, name: "Jumpsuits & Dresses" },

  {
    id: 5,
    name: "Jackets & Coats",
  },

  {
    id: 6,
    name: "Shorts & Skirts",
  },

  {
    id: 7,
    name: "Shoes & Socks",
  },
  { id: 8, name: "Suit" },
  {
    id: 9,
    name: "Accessories",
  },

  {
    id: 10,
    name: "Other",
  },
];

const CreateItem: FC = () => {
  return (
    <div style={{ display: "grid", gap: "35px" }}>
      <Select placeholder="Select Season">
        {Seasons.map((season: any) => (
          <option key={season.id} value={season.name}>
            {season.name}
          </option>
        ))}
      </Select>
      <Select placeholder="Select Category">
        {WomanCategories.map((category: any) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  );
};
export default CreateItem;
