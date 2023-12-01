import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ProductType } from "../lib/mock/fakeData";
import { useRouter } from "expo-router";

interface ProductItemProps {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();

  const handleMove = () => {
    router.push(`/(app)/${product.id}`);
  };

  console.log(product.imagePath);
  return (
    <Pressable style={{ gap: 5 }} onPress={handleMove}>
      <Image
        source={product.imagePath}
        style={{ height: 150, width: 150, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "300", textTransform: "capitalize" }}>{product.name}</Text>
      <Text style={{ fontWeight: "400" }}>UGX {product.price}</Text>
    </Pressable>
  );
};

export default ProductItem;
