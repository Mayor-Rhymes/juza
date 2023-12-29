import { ImageProps } from "react-native";

export type ProductType2 = {
  id: number | string;
  name: string;
  price: number;
  image: string;
};
export type ProductType = {
  id: number | string;
  name: string;
  price: number;
  imagePath: ImageProps;
};

export const products = [
    {
        id: 1,
        name: "shell gas 12kg",
        price: 239000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 2,
        name: "shell gas 6kg",
        price: 143000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 3,
        name: "stabex gas 13kg",
        price: 221000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 4,
        name: "stabex gas 6kg",
        price: 135000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 5,
        name: "total gas 12kg",
        price: 350000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 6,
        name: "total gas 6kg",
        price: 170000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 7,
        name: "hose pipe 2m",
        price: 20000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 8,
        name: "grill",
        price: 15000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 9,
        name: "burner",
        price: 20000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 10,
        name: "regulator 27mm",
        price: 35000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 10,
        name: "regulator 20mm",
        price: 35000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 11,
        name: "single plate cooker",
        price: 100000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 12,
        name: "double plate cooker",
        price: 160000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
    {
        id: 12,
        name: "triple plate cooker",
        price: 175000,
        imagePath: require("../../assets/images/product_image.jpg"),
    },
];
