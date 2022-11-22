import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      backgroundColor="gray.700"
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={20}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Input type="text" placeholder="Nome" />
          <Input
            type="text"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            autoCorrect={false}
          />
          <Input type="password" placeholder="Senha" secureTextEntry />
          <Input
            type="password"
            placeholder="Confirme a Senha"
            secureTextEntry
          />

          <Button title="Criar e acessar" />
        </Center>

        <Button title="Voltar para o login" variant="outline" mt={20}></Button>
      </VStack>
    </ScrollView>
  );
}
