import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ProductType2 } from "../lib/mock/fakeData";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

interface ProductItemProps {
  product: ProductType2;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();

  const handleMove = () => {
    router.push(`/(app)/${product.id}`);
  };

  
  return (
    <Pressable style={{ gap: 5 }} onPress={handleMove}>
      <Animated.Image
        sharedTransitionTag="productImage"
        source={{uri:product.image}}
        style={{ height: 150, width: 150, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "300", textTransform: "capitalize" }}>{product.name}</Text>
      <Text style={{ fontWeight: "400" }}>UGX {product.price}</Text>
    </Pressable>
  );
};

export default ProductItem;
