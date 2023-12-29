import { View, Text, StyleSheet, TextInput } from "react-native";
import {useState, useEffect} from "react";
import { useUserStore } from "../../lib/store/user-store";
import { supabase } from "../../lib/supabase/main";
// import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "../../components/ProductItem";
import { FlashList } from "@shopify/flash-list";
// import { products } from "../../lib/mock/fakeData";

import Animated, { FadeIn, FadeInLeft, FadeOut } from "react-native-reanimated";
const Page = () => {
  const user = useUserStore((state: any) => state.user);
  const [products, setProducts] = useState<any>([])

  const getProducts = async () => {

    let {data: products, error} = await supabase.from("products").select('*');
    if(!error){
      console.log(20, products?.length);
      setProducts(products);
    }
    
  }

  console.log(25, products);
  useEffect(() => {
    if(products.length === 0){
      getProducts();
    }
    

  }, [])
  console.log(34, user);
  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOut} style={styles.container}>
      <View style={styles.userPane}>
        <Text>Hello {user.email}</Text>
      </View>

      <View
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
      </View>

      {products.length > 0 && <FlashList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        estimatedItemSize={products.length}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        centerContent={true}
        ItemSeparatorComponent={() => <View style={{width: 30, height: 30}}/>}
        
      />}
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
