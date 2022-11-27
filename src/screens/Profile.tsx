import { useState } from "react";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

import { AppError } from "@utils/AppError";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import defaultUsePhotoImg from "@assets/userPhotoDefault.png";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirm: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  // email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  // old_password: yup.string().transform((value) => (!!value ? value : null)),
  password: yup
    .string()
    .min(6, "A senha deve ter ao menos 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  password_confirm: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação de senha.")
        .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, updateUserProfile } = useAuth();

  console.log(`${api.defaults.baseURL}/avatar/${user.avatar}`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  const toast = useToast();

  async function handleProfileUpdate({
    name,
    password,
    old_password,
  }: FormDataProps) {
    try {
      setIsUpdating(true);
      await api.put("/users", { name, password, old_password });

      const userUpdated = user;
      userUpdated.name = name;
      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso.",
        placement: "top",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível alterar o perfil. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!result.canceled) {
        const photoUri = result.assets[0].uri;
        const photoType = result.assets[0].type;
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Esta imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        } else {
          const fileExtension = photoUri.split(".").pop();

          const photoFile = {
            name: `${user.name}.${fileExtension}`
              .trim()
              .replaceAll(" ", "_")
              .toLowerCase(),
            uri: photoUri,
            type: `${photoType}/${fileExtension}`,
          } as any;

          const userPhotoUploadForm = new FormData();
          userPhotoUploadForm.append("avatar", photoFile);

          const response = await api.patch(
            "/users/avatar",
            userPhotoUploadForm,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const userUpdated = user;
          userUpdated.avatar = response.data.avatar;
          updateUserProfile(userUpdated);

          toast.show({
            title: "Foto atualizada",
            placement: "top",
            bgColor: "green.700",
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              zIndex={1}
              startColor="gray500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUsePhotoImg
              }
              alt="Foto do usuário"
              size={PHOTO_SIZE}
              mr={4}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              fontSize="md"
              fontWeight="bold"
              color="green.500"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                type="text"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                type="text"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                isDisabled
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                type="password"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                type="password"
                placeholder="Senha nova"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                type="password"
                placeholder="Confirma a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleProfileUpdate)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
