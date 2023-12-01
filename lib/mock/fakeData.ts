import { ImageProps } from "react-native";

export type ProductType = {
  id: number | string;
  name: string;
  price: number;
  imagePath: ImageProps;
};

export const products = [
    {
        id: 1,
        name: "coke gas 18kg",
        price: 90.98,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 2,
        name: "fanta gas 5kg",
        price: 5.78,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 3,
        name: "ulta gas 20kg",
        price: 90.45,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
];
