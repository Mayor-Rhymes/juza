import { View, Text, StyleSheet, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProductTrack, useCartStore } from "../../lib/store/cart-store";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
} from "react-native-reanimated";

const cartImage = require("../../assets/images/empty-cart.png");

const Page = () => {
  const { cart, resetCart } = useCartStore() as {
    cart: ProductTrack[];
    resetCart: () => void;
  };

  const getTotal = () => {
    let total = 0;
    for (let i of cart) {
      total += i.count * i.price;
    }

    return total;
  };
  if (cart.length === 0) {
    return (
      <Animated.View
        entering={FadeInUp}
        exiting={FadeOut}
        style={styles.emptyContainer}
      >
        <Image source={cartImage} style={{ height: 300, width: 300 }} />
        <Text style={{ fontSize: 20 }}>Your Cart is empty 🥲</Text>
        <Link href="/" asChild>
          <Button style={styles.buyButton}>
            <Text style={{ color: "white", fontSize: 20 }}>Go to Store</Text>
          </Button>
        </Link>
      </Animated.View>
    );
  }
  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.container}
    >
      <FlashList
        data={cart}
        renderItem={({ item }) => <CartItem product={item} />}
        estimatedItemSize={cart.length}
        contentContainerStyle={{ padding: 10 }}
        centerContent={true}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      />

      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, color: "black", fontWeight: "600" }}>
          Total
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "#228b22" }}>
          UGX {getTotal().toPrecision(5)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Button
          style={[styles.emptyButtonStyle, { flex: 1 }]}
          onPress={resetCart}
        >
          <Text style={styles.buyButtonText}>Empty Cart</Text>
        </Button>
        <Button style={[styles.buyButtonStyle, { flex: 1 }]}>
          <Text style={styles.buyButtonText}>Checkout</Text>
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    position: "relative",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  buyButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#007FFF",
  },

  emptyButtonStyle: {
    padding: 20,
    backgroundColor: "#ED2939",
    alignItems: "center",
    borderRadius: 30,
  },
  buyButtonStyle: {
    padding: 20,
    backgroundColor: "#6173F3",
    alignItems: "center",
    borderRadius: 30,
  },

  buyButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  addToCartButton: {
    borderRadius: 400,
  },
});

export default Page;
