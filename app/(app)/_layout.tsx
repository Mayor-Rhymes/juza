import { StatusBar } from "react-native";
import { useUserStore } from "../../lib/store/user-store";
import { Redirect, Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const user = useUserStore((state: any) => state.user);

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginHorizontal: 5,
            paddingVertical: 20,
            height: 70,
            backgroundColor: "black",
            elevation: 10,
          },
          
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 13,
            },
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 13,
            },
            tabBarLabel: "Cart",
            unmountOnBlur: true,
          }}
        />

        <Tabs.Screen name="[id]" options={{ href: null, tabBarStyle: {display: "none"}, unmountOnBlur: true}} />
      </Tabs>
      <StatusBar hidden={true} />
    </>
  );
};

export default Layout;
