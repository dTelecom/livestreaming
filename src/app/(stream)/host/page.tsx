import { redirect } from "next/navigation";
import HostPageImpl from "./page.client";

interface PageProps {
  searchParams: {
    rt: string | undefined;
  };
}

export default function HostPage({
  searchParams: { rt, wsUrl },
}: PageProps) {
  if (!rt||!wsUrl) {
    redirect("/");
  }

  return <HostPageImpl roomToken={rt} serverUrl={wsUrl}/>;
}
