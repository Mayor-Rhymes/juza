import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useUserStore } from "../../lib/store/user-store";
import { supabase } from "../../lib/supabase/main";
// import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "../../components/ProductItem";
import { FlashList } from "@shopify/flash-list";
// import { products } from "../../lib/mock/fakeData";

import Animated, { FadeIn, FadeInLeft, FadeOut } from "react-native-reanimated";
import { ProductType2 } from "../../lib/mock/fakeData";
import RefillProductItem from "../../components/RefillProductItem";
import Button from "../../components/Button";
const Page = () => {
  const user = useUserStore((state: any) => state.user);
  const [products, setProducts] = useState<ProductType2[]>([]);
  const [refillProducts, setRefillProducts] = useState<ProductType2[]>([]);
  const [showRefill, setShowRefill] = useState(true);

  const getProducts = async () => {
    let { data: products, error } = await supabase.from("Products").select("*");
    if (!error) {
      console.log(20, products?.length);
      setProducts(products);
    }
  };

  const getRefillProducts = async () => {
    let { data: refills, error } = await supabase.from("Refill").select("*");
    if (!error) {
      console.log(30, refills?.length);
      setRefillProducts(refills);
    }
  };


  
  console.log(25, products);
  useEffect(() => {
    if (products.length === 0 && refillProducts.length === 0) {
      getProducts();
      getRefillProducts()
    }
  }, []);
  console.log(34, user);
  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.userPane}>
        <Text>Hello</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", gap: 10 }}>
        <Button style={{flex: 1, flexDirection: "row", justifyContent: "center", padding: 10, borderRadius: 5, backgroundColor: `${showRefill ? "#9173FF" : "whitesmoke"}`}} onPress={() => setShowRefill(true)}><Text>Refill</Text></Button>
        <Button style={{flex: 1, flexDirection: "row", justifyContent: "center", padding: 10, borderRadius: 5, backgroundColor: `${!showRefill ? "#9173FF" : "whitesmoke"}`}} onPress={() => setShowRefill(false)}><Text>Purchase</Text></Button>
        
      </View>

      {/* <View
        style={[
          styles.userPane,
          {
            elevation: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          style={styles.inputStyle}
          placeholder="Search For Products..."
          value=""
          inputMode="email"
        />
        <Ionicons name="filter" size={20} color="#6173F3" style={{ flex: 1 }} />
      </View> */}

      {showRefill && (refillProducts.length > 0 && (
        <FlashList
          data={refillProducts}
          renderItem={({ item }) => <RefillProductItem product={item} />}
          estimatedItemSize={refillProducts.length}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          centerContent={true}
          ItemSeparatorComponent={() => (
            <View style={{ width: 30, height: 30 }} />
          )}
        />
        ))}
      {!showRefill && (products.length > 0 && (
        <FlashList
          data={products}
          renderItem={({ item }) => <ProductItem product={item} />}
          estimatedItemSize={products.length}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{ padding: 10 }}
          centerContent={true}
          ItemSeparatorComponent={() => (
            <View style={{ width: 30, height: 30 }} />
          )}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 20,
    backgroundColor: "white",
  },

  inputStyle: {
    height: 60,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 20,
    fontSize: 16,
    flex: 4,
  },

  userPane: {
    borderRadius: 20,
    backgroundColor: "whitesmoke",
    padding: 20,
    // elevation: 5,
  },
});

export default Page;
