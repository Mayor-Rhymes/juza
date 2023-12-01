import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ProductTrack } from "../lib/store/cart-store";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useCartStore } from "../lib/store/cart-store";

interface ItemProps {
  product: ProductTrack;
}

const CartItem = ({ product }: ItemProps) => {
  const { addToCart, removeFromCart, deleteFromCart } = useCartStore() as any;

  return (
    <View style={styles.container}>
      <Image
        source={product.imagePath}
        style={{ height: 100, width: 100, borderRadius: 20 }}
      />
      <View style={{ gap: 10 }}>
        <Text
          style={{
            fontSize: 15,
            textTransform: "capitalize",
            fontWeight: "500",
          }}
        >
          {product.name}
        </Text>
        <Text style={{ fontSize: 16 }}>
          UGX {(product.price * product.count).toPrecision(5)}
        </Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <AntDesign
            name="minus"
            size={10}
            color={"white"}
            onPress={() => removeFromCart(product)}
            style={styles.itemCountButton}
          />
          <Text style={{ alignSelf: "flex-end", fontSize: 20 }}>
            {product.count}
          </Text>

          <Ionicons
            name="add"
            size={10}
            color={"white"}
            onPress={() => addToCart(product)}
            style={styles.itemCountButton}
          />
        </View>
      </View>

      <Ionicons
        name="trash"
        size={20}
        color="#ED2939"
        onPress={() => deleteFromCart(product)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 20,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 5,
    justifyContent: "space-evenly",
  },

  itemCountButton: {
    backgroundColor: "#6173F3",
    padding: 4,
    borderRadius: 5,
  },
});

export default CartItem;
