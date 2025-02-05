import { redirect } from "next/navigation";
import WatchPageImpl from "./page.client";

interface PageProps {
  params: {
    roomName: string;
  };
}

export default function WatchPage({ params: { roomName } }: PageProps) {
  if (!roomName) {
    redirect("/");
  }

  return <WatchPageImpl roomName={roomName} />;
}
