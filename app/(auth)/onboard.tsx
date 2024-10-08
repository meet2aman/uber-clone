import CustomButton from "@/components/custom/CustomButton";
import { onboarding } from "@/constants";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

export default function Onboard() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const router = useRouter();
  const handleOnPress = () => {
    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={handleOnPress}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] mx-1 bg-[#E2E8F0] h-[4px] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] mx-1 bg-[#0286FF] h-[4px] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              className="w-full h-[300px]"
              source={item.image}
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="!text-[15px] font-JakartaSemiBold text-center text-[#858585] mx-10 my-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={`${isLastSlide ? "Get Started" : "Next"}`}
        onPress={() =>
          isLastSlide
            ? router.replace(`/(auth)/sign-up`)
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 t-10"
      />
    </SafeAreaView>
  );
}
