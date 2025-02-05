import { HomeActions } from "@/components/home-actions";
import { Container, Flex, Link, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 p-10 sm:p-24">
      <Container size="1">
        <Flex direction="column" align="center" gap="5">
          <Image
            src="/dTelecom.svg"
            alt="dTelecom"
            width="240"
            height="120"
            className="invert dark:invert-0 mt-8 mb-2"
          />
          <Text as="p">
            Welcome to the dTelecom livestream demo app. You can join or start
            your own stream. Hosted on{" "}
            <Link href="https://video.dtelecom.org" target="_blank">
              dTelecom
            </Link>
          </Text>
          <HomeActions />
          <Separator orientation="horizontal" size="4" className="my-2" />
          <Text as="p" size="2">
            Feel free to clone this full-stack NextJS app{" "}
            <Link
              href="https://github.com/dTelecom/livestreaming"
              target="_blank"
            >
              here
            </Link>
            .
          </Text>
        </Flex>
      </Container>
    </main>
  );
}
