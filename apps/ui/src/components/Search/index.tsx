import {
  ActionIcon,
  Button,
  FileInput,
  Group,
  Text,
  Title,
} from "@mantine/core";
import classes from "./Search.module.css";
import {
  IconCamera,
  IconCameraRotate,
  IconCircle,
  IconSearch,
  IconChevronLeft,
} from "@tabler/icons-react";
import Webcam from "react-webcam";
import { useCamera } from "../../hooks/use-camera";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Results } from "../Results";
import { useScrollIntoView } from "@mantine/hooks";

export const Search = () => {
  const {
    permission,
    toogleDevice,
    onUserMedia,
    webcamRef,
    onUserMediaError,
    facingMode,
    getScreenshot,
  } = useCamera();
  const [type, setType] = React.useState<"camera" | "file">("file");
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const [data, setData] = React.useState<{
    ai: string;
    query: string;
    image: string;
    google: {
      title?: string;
      link?: string;
      displayLink?: string;
      snippet?: string;
    }[];
  }>();
  const form = useForm({
    initialValues: {
      image: null,
    },
    validate: {
      image: (value) => (!value ? "Image is required" : null),
    },
  });
  const generateRequest = async (values: any) => {
    const image_base64 = await toBase64(values.image);
    const data = {
      image_base64: image_base64,
    };

    const baseURL = import.meta.env.VITE_API_URL || "/api/v1";
    const response = await axios.post(`${baseURL}/guess`, data);

    return response.data;
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const { mutate: generate, isPending } = useMutation({
    mutationFn: generateRequest,
    onSuccess: (data) => {
      setType("file");
      setData(data);
      scrollIntoView();
    },
  });
  const generateCameraRequest = async () => {
    const screenshot = getScreenshot();
    if (screenshot) {
      const data = {
        image_base64: screenshot,
      };

      const baseURL = import.meta.env.VITE_API_URL || "/api/v1";
      const response = await axios.post(`${baseURL}/guess`, data);

      return response.data;
    }
    return Promise.reject();
  };
  const { mutateAsync: generateByScreenshot, isPending: isPendingScreenshot } =
    useMutation({
      mutationFn: generateCameraRequest,
      onSuccess: (data) => {
        setType("file");
        setData(data);
        scrollIntoView();
      },
    });
  return (
    <>
      <div className={classes.main}>
        {type === "file" && (
          <>
            <Title
              order={2}
              size="h2"
              style={{ marginBottom: 40, textAlign: "center" }}
              ta="center"
            >
              {"Explore the Depths of Knowledge Through Images"}
            </Title>{" "}
            <form onSubmit={form.onSubmit((values) => generate(values))}>
              <FileInput
                size="lg"
                placeholder="Upload image to search..."
                accept="image/jpeg, image/png, image/ppm, image/gif, image/tiff, image/bmp"
                required
                {...form.getInputProps("image")}
                rightSection={
                  <ActionIcon
                    type="button"
                    variant="transparent"
                    aria-label="Take a photo"
                    color="gray"
                    onClick={() => {
                      setData(undefined);
                      setType("camera");
                    }}
                  >
                    <IconCamera />
                  </ActionIcon>
                }
              />
              <Group my="md" justify="center">
                <Button
                  size={"compact-xl"}
                  leftSection={<IconSearch />}
                  color="teal"
                  loading={isPending}
                  type="submit"
                >
                  Search
                </Button>
              </Group>
            </form>
          </>
        )}
        {type === "camera" && (
          <>
            {permission === "prompt" && (
              <div>
                <Text size="xl">{"Waiting for camera permission"}</Text>
              </div>
            )}
            {permission === "granted" && (
              <div className={classes.camera}>
                <div className={classes.video}>
                  <Webcam
                    onUserMedia={onUserMedia}
                    width="100%"
                    audio={false}
                    onUserMediaError={onUserMediaError}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    mirrored={false}
                    videoConstraints={{
                      facingMode,
                    }}
                  />
                  <div className={classes.newcamera}>
                    <ActionIcon
                      my="md"
                      size="xl"
                      onClick={() => {
                        toogleDevice();
                      }}
                    >
                      <IconCameraRotate
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </div>
                </div>

                <Group justify="center" mt="xl">
                  <ActionIcon
                    onClick={() => {
                      setData(undefined);
                      setType("file");
                    }}
                    size={"xl"}
                    variant="transparent"
                  >
                    <IconChevronLeft size={40} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={async () => {
                      await generateByScreenshot();
                    }}
                    size={70}
                    radius={70}
                    color="teal"
                    loading={isPendingScreenshot}
                  >
                    <IconCircle
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </div>
            )}
            {permission === "denied" && (
              <div>
                <Text size="xl">
                  {"Please change your browser settings to allow camera access"}
                </Text>
                <Button
                  size={"compact-xl"}
                  leftSection={<IconChevronLeft />}
                  color="teal"
                  onClick={() => {
                    setData(undefined);
                    setType("file");
                  }}
                >
                  Back to file upload
                </Button>
              </div>
            )}
          </>
        )}
        <div ref={targetRef}>{data && <Results {...data} />}</div>
      </div>
    </>
  );
};
