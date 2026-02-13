import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import { baseURL, dataStyle, effects, fonts, home, style } from "@/resources";
import { Meta } from "@once-ui-system/core";
import ClientLayout from "./ClientLayout";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout fonts={fonts} style={style} dataStyle={dataStyle} effects={effects}>
      {children}
    </ClientLayout>
  );
}
