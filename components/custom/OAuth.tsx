import { Image, Text, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

export default function OAuth() {
  const handleGoogleLogin = () => {};
  return (
    <View className="px-5">
      <View className="flex flex-row items-center justify-center gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg ">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title={"Login With Google"}
        className="mt-5 w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="size-4 h-5 w-5 mx-2"
          />
        )}
        onPress={handleGoogleLogin}
      />
    </View>
  );
}
