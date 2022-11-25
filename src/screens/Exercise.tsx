import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Icon,
  Text,
  Heading,
  HStack,
  Image,
  Center,
  Box,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleBackToHome() {
    navigation.navigate("home");
  }

  return (
    <VStack flex={1}>
      <VStack bg="gray.600" pt={12} px={8}>
        <TouchableOpacity onPress={handleBackToHome}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading fontSize="lg" color="gray.100" fontFamily="heading">
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text ml={1} color="gray.100">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
            }}
            alt="Nome do exercício"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" p={5} rounded="md">
            <HStack
              px={5}
              pb={5}
              justifyContent="space-between"
              alignContent="center"
            >
              <HStack alignItems="center">
                <SeriesSvg />

                <Text ml={2} color="gray.200">
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />

                <Text ml={2} color="gray.200">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
