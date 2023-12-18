import {
  Button,
  Card,
  Center,
  Group,
  Image,
  Tabs,
  Text,
  rem,
} from "@mantine/core";
import classes from "./Result.module.css";
import { IconBrain, IconBrandGoogle, IconCoffee, IconError404 } from "@tabler/icons-react";

type Props = {
  ai: string;
  query: string;
  image: string;
  google?: {
    title?: string;
    link?: string;
    displayLink?: string;
    snippet?: string;
  }[];
};

export const Results = ({ ai, image, google, query }: Props) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <div className={classes.display}>
      <Tabs className={classes.tab} defaultValue="ai">
        <Tabs.List grow>
          <Tabs.Tab value="ai" leftSection={<IconBrain style={iconStyle} />}>
            AI Response
          </Tabs.Tab>
          <Tabs.Tab
            value="google"
            leftSection={<IconBrandGoogle style={iconStyle} />}
          >
            Google Search
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ai">
          <Card mt="md" className={classes.card} withBorder radius="md" p={0}>
            <div className={classes.body}>
              <Image
                src={image}
                alt="Uploaded Image"
                h={100}
                w="auto"
                fit="contain"
                radius="md"
                m="md"
              />
              <Text m="md" fz="lg" c="dimmed">
                {ai}
              </Text>
            </div>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="google">
          <Text m="md" fz="lg" fw="bold" c="dimmed">
            {`Results for "${query}"`}
          </Text>

          {google?.length === 0 && (
            <Card>
              <Group justify="center">
                <IconError404 size={50} />
              </Group>
              <Text m="md" fz="lg" ta="center" c="dimmed">
                Sorry no results found either my API quota has been exceeded or
                no results were found for the query.
              </Text>
            </Card>
          )}

          {google?.map((item, index) => (
            <Card
              key={index}
              mt="md"
              className={classes.card}
              withBorder
              radius="md"
              p={0}
              component="a"
              href={item.link}
              target="_blank"
            >
              <div className={classes.body}>
                <Text m="md" fz="lg" fw="bold" c="dimmed">
                  {item.title}
                </Text>
                <Text m="md" fz="sm" c="dimmed">
                  {item.displayLink}
                </Text>
                <Text m="md" fz="sm" c="dimmed">
                  {item.snippet}
                </Text>
              </div>
            </Card>
          ))}
        </Tabs.Panel>
      </Tabs>
      <Center mt="md">
        <Button
          component="a"
          href="https://ko-fi.com/n4ze3m"
          target="_blank"
          rel="noopener noreferrer"
          color="blue"
          variant="outline"
          leftSection={<IconCoffee /> }
        >
          Buy me a coffee
        </Button>
      </Center>
    </div>
  );
};
