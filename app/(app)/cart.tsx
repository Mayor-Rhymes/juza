import { View, Text, StyleSheet, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProductTrack, useCartStore } from "../../lib/store/cart-store";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { Link } from "expo-router";


const cartImage = require("../../assets/images/empty-cart.png");


const Page = () => {

  const { cart } = useCartStore() as { cart: ProductTrack[] };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image source={cartImage} style={{height: 300, width: 300,}} />
        <Text style={{fontSize: 20}}>Your Cart is empty 🥲</Text>
        <Link href="/" asChild>
          <Button style={styles.buyButton}>
            <Text style={{ color: "white", fontSize: 20 }}>Go to Store</Text>
          </Button>
        </Link>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlashList
        data={cart}
        renderItem={({ item }) => <CartItem product={item} />}
        estimatedItemSize={cart.length}
        contentContainerStyle={{ padding: 10 }}
        centerContent={true}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
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
});

export default Page;
