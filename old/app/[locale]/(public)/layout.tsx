import { AnalyticsProvider } from "@/app/components/analytics-provider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
}
