import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { ProductType2 } from "../lib/mock/fakeData";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import Button from "./Button";
import { supabase } from "../lib/supabase/main";
import { useUserStore } from "../lib/store/user-store";

interface ProductItemProps {
  product: ProductType2;
}

const RefillProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();
  const user = useUserStore((state: any) => state.user);

  const handleMove = () => {
    router.push(`/(app)/${product.id}`);
  };


  const handleRefill = async () => {

    const {data, error} = await supabase.from("refill_orders").insert([{
        information: JSON.stringify(product),
        user_info: user.email
    }])

    if(!error){
        console.log(data);
    } else {
        console.log(error);
    }
  }

  
  return (
    <Pressable style={{ gap: 5 }} onPress={handleMove}>
      <Animated.Image
        sharedTransitionTag="productImage"
        source={{uri:product.image}}
        style={{ height: 150, width: 150, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "300", textTransform: "capitalize" }}>{product.name}</Text>
      <Text style={{ fontWeight: "400" }}>UGX {product.price}</Text>
      <Button onPress={handleRefill} style={{padding: 10, backgroundColor: "#6173F3", borderRadius: 10, alignItems: "center"}}>
        <Text style={{color: "white"}}>Refill</Text>
      </Button>
    </Pressable>
  );
};

export default RefillProductItem;
