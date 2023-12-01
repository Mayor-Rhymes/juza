import { View, Text, StyleSheet, TextInput } from "react-native";
import { useUserStore } from "../lib/store/user-store";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase/main";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [borderColor, setBorderColor] = useState("");

  const user = useUserStore((state: any) => state.user);

  console.log(user);
  const updateUser = useUserStore((state: any) => state.updateUser);

  const handleSignup = async () => {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(data);
      console.log("problem don dey");
      return;
    }

    updateUser(data.user);
    router.replace("/");
  };

  const handleFocus = () => {
    setBorderColor("#6173F3");
  };
  const handleBlur = () => {
    setBorderColor("lightgray");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Ionicons name="log-in-outline" size={30} />
        <Text style={styles.loginText}>Signup</Text>
      </View>

      <View style={styles.formStyle}>
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
});

export default Page;
