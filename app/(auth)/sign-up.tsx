import * as React from "react";
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
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import ReactNativeModal from "react-native-modal";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [verfication, setVerification] = React.useState({
    state: "fending",
    error: "",
    code: "",
  });

  const userSchema = z.object({
    name: z
      .string()
      .min(5, { message: "Username must be at least 5 characters." })
      .max(30, { message: "Username must be at most 30 characters." }),
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

  const onSubmit: SubmitHandler<UserFormType> = async (data: UserFormType) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verfication,
        state: "pending",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verfication.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verfication,
          state: "success",
        });
        router.replace("/");
      } else {
        setVerification({
          ...verfication,
          state: "failed",
          error: "Verification failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verfication,
        state: "failed",
        error: err.errors[0].longMessage,
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="bg-white flex-1 ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <View className=" absolute bottom-5 left-5 tracking-wide flex items-center justify-center flex-row gap-2">
            <Text className="text-black text-2xl font-JakartaSemiBold">
              Create Account
            </Text>
            <FontAwesome name="long-arrow-right" size={16} color="black" />
          </View>
          {/* Sign up from  */}
          <View className="p-5 ">
            <Controller
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
            )}
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
              className="mt-4"
            />
          </View>
          {/* oauth */}
          <OAuth />
          <View className="flex justify-center flex-row items-center gap-1 mt-6">
            <Text className="text-center text-general-200 text-lg">
              If You have an account?{" "}
            </Text>
            <Link href={"/(auth)/sign-in"}>
              <Text className="text-primary-500 text-lg underline">Log In</Text>
            </Link>
          </View>
          {/* verification modal */}
          <ReactNativeModal isVisible={verfication.state === "success"}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />
              <Text className="text-3xl font-JakartaBold text-center tracking-wide">
                {" "}
                Verified
              </Text>
              <Text className="text-gray-400 text-[15px] font-Jakarta text-center mt-2">
                You have successfully verified your account.
              </Text>
              <CustomButton
                className="text-md px-4 py-2 mt-5"
                title={"Browse Home"}
                onPress={() => router.replace("/(root)/(tabs)/home")}
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
}
