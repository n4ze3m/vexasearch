import { AppShell, Group, ActionIcon, Text, Center } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import classes from "./App.module.css";
import { Search } from "./components/Search";

function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div className={classes.header}>
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {"Vexa Search 🖼️ "}
            </Text>

            <ActionIcon
              variant="transparent"
              color="gray"
              mx="md"
              aria-label="Github"
              component="a"
              href="https://github.com/n4ze3m/vexasearch"
              target="_blank"
            >
              <IconBrandGithub size={24} />
            </ActionIcon>
          </Group>
        </div>
      </AppShell.Header>
      <AppShell.Main>
        <div className={classes.main}>
          <Search />
        </div>
      </AppShell.Main>

      <AppShell.Section>
        <Center>
          <Text mb="md" size="xs" c="dimmed">
            {
              "Generated content maybe inaccurate please always verify the data."
            }
          </Text>
        </Center>
      </AppShell.Section>
    </AppShell>
  );
}

export default App;
