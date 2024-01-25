import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProductTrack, useCartStore } from "../../lib/store/cart-store";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { Link } from "expo-router";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { supabase } from "../../lib/supabase/main";
import { useRouter } from "expo-router";

import Animated, {
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
} from "react-native-reanimated";
import { useRef, useMemo, useCallback, useState } from "react";
import { useUserStore } from "../../lib/store/user-store";

const cartImage = require("../../assets/images/empty-cart.png");

const Page = () => {
  const { cart, resetCart } = useCartStore() as {
    cart: ProductTrack[];
    resetCart: () => void;
  };

  const router = useRouter();
  const user = useUserStore((state: any) => state.user);

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const getTotal = () => {
    let total = 0;
    for (let i of cart) {
      total += i.count * i.price;
    }

    return total;
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handlePurchase = async () => {
    if (phoneNumber && address) {
      const { data, error } = await supabase.from("Purchase_Orders").insert([
        {
          phone_number: phoneNumber,
          email: user.email,
          order_information: JSON.stringify(cart),
        },
      ]);

      if (error) {
        console.log("There was an error");
        return;
      }
      resetCart();
      router.replace("/");
    } else {
      console.log("Please enter credentials");
    }
  };

  //checkout button handler
  const handleCheckout = async () => {
    setBottomSheetVisible(true);
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
          UGX {getTotal()}
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
        <Button
          style={[styles.buyButtonStyle, { flex: 1 }]}
          onPress={handleCheckout}
        >
          <Text style={styles.buyButtonText}>Checkout</Text>
        </Button>
      </View>

      {bottomSheetVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Ready To Pay? 🎉</Text>
            <BottomSheetTextInput
              style={styles.inputStyle}
              placeholder="Please enter your address"
              value={address}
              onChangeText={setAddress}
            />
            <BottomSheetTextInput
              style={styles.inputStyle}
              placeholder="Please enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                gap: 10,
                alignItems: "center",
              }}
            > */}
            <Button style={[styles.buyButtonStyle]} onPress={handlePurchase}>
              <Text style={styles.buyButtonText}>Complete Your Purchase</Text>
            </Button>
            <Button
              style={[styles.emptyButtonStyle]}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={styles.buyButtonText}>Close Checkout Sheet</Text>
            </Button>
            {/* </View> */}
          </View>
        </BottomSheet>
      )}
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

  contentContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 20,
    elevation: 5,
    backgroundColor: "whitesmoke",
    height: 400,
    paddingVertical: 20,
  },

  inputStyle: {
    height: 60,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 7,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});

export default Page;
