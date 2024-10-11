import "@/assets/styles/index.css";
import { SensorProvider } from "@/context/useSensorContext";
import { UserProvider } from "@/context/useUserContext";

export const metadata = {
  title: "위시",
  description: "범죄예방부터 실종자 찾기까지 위시",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>위시</title>
        <meta name="description" content="범죄예방부터 실종자 찾기까지 위시" />
        <link rel="manifest" href="/manifest.json" />
        {/* Favicon 설정 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <SensorProvider>
          <UserProvider>{children}</UserProvider>
        </SensorProvider>
      </body>
    </html>
  );
}
