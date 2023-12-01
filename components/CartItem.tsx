import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ProductTrack } from "../lib/store/cart-store";
import { Ionicons, AntDesign} from "@expo/vector-icons";
import { useCartStore } from "../lib/store/cart-store";


interface ItemProps {
  product: ProductTrack;
}

const CartItem = ({ product }: ItemProps) => {

  const {addToCart, removeFromCart} = useCartStore() as any;

  

  return (
    <View style={styles.container}>
      <Image
        source={product.imagePath}
        style={{ height: 80, width: 80, borderRadius: 20 }}
      />
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 15, textTransform: "capitalize", fontWeight: "500" }}>
          {product.name}
        </Text>
        <Text style={{fontSize: 25}}>{(product.price * product.count).toPrecision(5)}</Text>
      </View>

      <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
        <Ionicons name="add" size={20} color={"black"} onPress={() => addToCart(product)}/>
        <Text style={{ alignSelf: "flex-end", fontSize: 20 }}>{product.count}</Text>
        <AntDesign name="minus" size={20} color={"black"} onPress={() => removeFromCart(product)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 20,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7CB9E8",
    borderRadius: 30,
    elevation: 2,
    justifyContent: "space-evenly",

  },
});

export default CartItem;
