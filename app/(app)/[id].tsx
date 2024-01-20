import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ProductType2 } from "../../lib/mock/fakeData";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "../../lib/store/cart-store";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { supabase } from "../../lib/supabase/main";

const Page = () => {
  const { addToCart, cart } = useCartStore() as any;
  const [product, setProduct] = useState<ProductType2 | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();


  const getProduct = async () => {

    let {data: products, error} = await supabase.from("Products").select().eq('id', id);
    if(!error){
      console.log(23, products);
      setProduct(products![0])
    } else {
      console.log(error);
    }
    
  }
  console.log(id);
  console.log(12, Number(id));
  console.log(cart);
  useEffect(() => {
    if (!product) {
      getProduct();
    }
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Page {id}</Text>
        <Text>No Product found here</Text>
      </View>
    );
  }
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOut}
      style={styles.otherContainer}
    >
      <Animated.Image
        sharedTransitionTag="productImage"
        source={{uri:product.image}}
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
        <Button style={[styles.buyButtonStyle, { flex: 1 }]}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Button>
        <Button
          style={[styles.buyButtonStyle, styles.addToCartButton]}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" color="white" size={20} />
        </Button>
      </View>
    </Animated.View>
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
