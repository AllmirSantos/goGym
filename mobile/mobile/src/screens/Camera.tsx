import { useState, useEffect, useRef } from "react";
import { VStack, Text, Center, Button, HStack, Box, Image } from "native-base";
import { Modal } from "react-native";

import { Camera, CameraType } from "expo-camera";

import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";

import { ScreenHeader } from "@components/ScreenHeader";

export function Call() {
  const camRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState(null);

  const [capturePhoto, setCapturePhoto] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  });

  if (cameraPermission === null) {
    return <VStack />;
  }
  if (cameraPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturePhoto(data.uri);
      setOpen(true);
      console.log(data);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Camera" />
      <Box flex={1} pt={"30px"} pb={"0px"} pl={5} pr={5} bg={"gray.700"}>
        <Camera style={{ flex: 1 }} type={type} ref={camRef} />
        <Center>
          <HStack>
            <Button
              ml={"80px"}
              onPress={takePicture}
              w={"75px"}
              h={"75px"}
              rounded={"75px"}
              mt={"-105px"}
              mb={"45px"}
              bg={"#fff"}
            >
              <Feather name="camera" size={30} />
            </Button>
            <Button
              ml={"20px"}
              w={"60px"}
              h={"60px"}
              rounded={"60px"}
              mt={"-95px"}
              mb={"45px"}
              bg={"#fff"}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <MaterialIcons
                name="flip-camera-android"
                size={24}
                color="black"
              />
            </Button>
          </HStack>
        </Center>
      </Box>

      {capturePhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <Box flex={1} pt={"100px"} pb={"100px"} pl={5} pr={5} bg={"gray.700"}>
            <Image
              alt="Captura da camera"
              h={"100%"}
              w={"100%"}
              rounded={10}
              source={{ uri: capturePhoto }}
            />
            <Center>
              <Button
                w={"75px"}
                h={"75px"}
                rounded={"75px"}
                mt={"-105px"}
                mb={"45px"}
                bg={"#fff"}
                onPress={() => setOpen(false)}
              >
                <AntDesign name="close" size={35} color={"red"} />
              </Button>
            </Center>
          </Box>
        </Modal>
      )}
    </VStack>
  );
}
