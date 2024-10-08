import { icons, images } from "@/constants";
import { Image, ScrollView, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/custom/InputField";
import CustomButton from "@/components/custom/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/custom/OAuth";

export default function SignIn() {
  const userSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(18, { message: "Password must be of 8 characters" }),
  });

  type UserFormType = z.infer<typeof userSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    console.log(data);
  };

  return (
    <ScrollView className="bg-white flex-1 ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <View className=" absolute bottom-5 left-5 tracking-wide flex items-center justify-center flex-row gap-2">
            <Text className="text-black text-2xl font-JakartaSemiBold">
              Login to your account
            </Text>
            <FontAwesome name="long-arrow-right" size={16} color="black" />
          </View>
          {/* Sign up from  */}
          <View className="p-5 ">
            {/* <Controller
              name={"name"}
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <InputField
                    label={"Name"}
                    placeholder="Enter your name"
                    placeholderTextColor={"#a3a3a3"}
                    icon={icons.person}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.name && (
              <Text style={{ color: "#ff8566" }}>{errors.name.message}</Text>
            )} */}
            <Controller
              name="email"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <InputField
                    label={"Email"}
                    placeholder="Enter your email"
                    placeholderTextColor={"#a3a3a3"}
                    icon={icons.email}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text style={{ color: "#ff8566" }}>{errors.email.message}</Text>
            )}

            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <InputField
                    label={"Name"}
                    placeholder="Password"
                    placeholderTextColor={"#a3a3a3"}
                    icon={icons.lock}
                    onBlur={onBlur}
                    // value={value}
                    // onChangeText={onChange}
                    onChangeText={(text) => {
                      const parsed = parseInt(text, 10);
                      onChange(isNaN(parsed) ? "" : parsed);
                    }}
                    value={
                      value === null || value === undefined
                        ? ""
                        : value.toString()
                    }
                    secureTextEntry={true}
                    // keyboardType="numeric"
                  />
                </View>
              )}
            />
            {errors.password && (
              <Text style={{ color: "#ff8566" }}>
                {errors.password.message}
              </Text>
            )}
            <CustomButton
              title="submit"
              onPress={handleSubmit(onSubmit)}
              className="mt-8"
            />
          </View>
          {/* oauth */}
          <OAuth />
          <View className="flex justify-center flex-row items-center gap-1 mt-6">
            <Text className="text-center text-general-200 text-lg">
              If You don't have an account?{" "}
            </Text>
            <Link href={"/(auth)/sign-up"}>
              <Text className="text-primary-500 text-lg underline">
                Sign Up
              </Text>
            </Link>
          </View>
          {/* verification modal */}
        </View>
      </View>
    </ScrollView>
  );
}
