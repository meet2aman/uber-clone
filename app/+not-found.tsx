import { Link, Redirect, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { ThemedView } from "@/components/ThemedView";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" className="text-3xl font-semibold">
          This screen doesn't
          <Text className="line-through"> exist</Text>
        </ThemedText>

        <TouchableOpacity
          className="bg-neutral-500 rounded-full px-4 py-2"
          onPress={() => router.replace("/(root)/(tabs)/home")}
        >
          <View className="flex flex-row items-center gap-2">
            <Entypo name="home" size={22} color="white" />
            <Text className="text-white text-xl font-JakartaMedium">Home</Text>
          </View>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
