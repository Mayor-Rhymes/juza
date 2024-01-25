import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductType2 } from "../../lib/mock/fakeData";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../../lib/store/cart-store";
import Animated, {
  Easing,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { supabase } from "../../lib/supabase/main";
const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const Page = () => {
  const { addToCart, cart } = useCartStore() as any;
  const [product, setProduct] = useState<ProductType2 | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams<{ id: string }>();
  const sv = useSharedValue(0);

  const getProduct = async () => {
    let { data: products, error } = await supabase
      .from("Products")
      .select()
      .eq("id", id);
    if (!error) {
      console.log(23, products);
      setProduct(products![0]);
      setLoading(false);
    } else {
      console.log(error);
    }
  };
  console.log(id);
  console.log(12, Number(id));
  console.log(cart);

  useEffect(() => {
    if (!product) {
      getProduct();
    }

    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  const handleAddToCart = () => {
    addToCart(product);
    ToastAndroid.show("Product has been added to cart", ToastAndroid.SHORT);
  };

  if (loading) {
    return (
      <Animated.View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Animated.View style={[styles.box, animatedStyle]} />
      </Animated.View>
    );
  }
  return (
    product && (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOut}
        style={styles.otherContainer}
      >
        <Animated.Image
          sharedTransitionTag="productImage"
          source={{ uri: product.image }}
          style={{ height: 400, width: "100%", borderRadius: 20 }}
        />
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textTransform: "capitalize",
              fontWeight: "700",
            }}
          >
            {product?.name}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            UGX {product?.price}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 6,
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 10,
            alignItems: "center",
          }}
        >
          {/* <Button style={[styles.buyButtonStyle, { flex: 1 }]}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </Button> */}
          <Button
            style={[styles.buyButtonStyle, { flex: 1 }]}
            onPress={handleAddToCart}
          >
            <Text style={{color: "white", fontWeight: "800",}}>Add To Cart</Text>
            <Ionicons name="cart" color="white" size={20} />
          </Button>
        </View>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  otherContainer: {
    flex: 1,
    padding: 5,
    gap: 20,
    backgroundColor: "white",
    position: "relative",
  },
  buyButtonStyle: {
    padding: 20,
    backgroundColor: "#6173F3",
    alignItems: "center",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  buyButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  addToCartButton: {
    borderRadius: 400,
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#6173F3",

    borderRadius: 50,
  },
});

export default Page;
