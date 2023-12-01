import { View, Text, StyleSheet, TextInput } from "react-native";
import { useUserStore } from "../lib/store/user-store";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase/main";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);


const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state: any) => state.user);

  console.log(user);
  const updateUser = useUserStore((state: any) => state.updateUser);

  const handleSignup = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(data);
      console.log("problem don dey");
      setLoading(false);
      return;
    }

    updateUser(data.user);
    router.replace("/");
  };

  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

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
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Ionicons name="log-in-outline" size={30} />
        <Text style={styles.loginText}>Signup</Text>
      </View>

      <View style={styles.formStyle}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            fontWeight: "600",
            color: "#6173F3",
          }}
        >
          JUZA
        </Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          style={styles.inputStyle}
          placeholder="Please enter your name"
          value={name}
          inputMode="text"
        />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.inputStyle}
          placeholder="Please enter your email address"
          value={email}
          inputMode="email"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.inputStyle}
          placeholder="Please enter your password"
          value={password}
          secureTextEntry={true}
        />
        <Button onPress={handleSignup} style={styles.loginButtonStyle}>
          <Text style={styles.loginButtonText}>Signup</Text>
        </Button>

        <Text style={styles.suggestionText}>
          Already have an account?{" "}
          <Link href="/login" asChild>
            <Text style={styles.linkerText}>Log in</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 50,
  },

  loginText: {
    fontSize: 30,
    fontWeight: "normal",
  },

  titleView: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },

  formStyle: {
    gap: 30,
    flex: 1,

    justifyContent: "center",
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

  loginButtonStyle: {
    padding: 20,
    backgroundColor: "#6173F3",
    alignItems: "center",
    borderRadius: 10,
  },

  loginButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },

  suggestionText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },

  linkerText: {
    fontWeight: "500",
    color: "black",
  },

  box: {
    height: 120,
    width: 120,
    backgroundColor: "#6173F3",
    borderRadius: 50,
  },
});

export default Page;
