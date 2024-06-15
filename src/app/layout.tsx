import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster"
import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/api.request/account";
import { AccountResType } from "@/schemaValidations/account.schema";
const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Website bán hàng',
    default: "Danh sách sản phẩm"
  },
  description: "Được tạo bởi Vũ Hồng Lĩnh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //Lấy cookies
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get("sessionToken");
  let user: AccountResType['data'] | null = null;
  if (sessionToken) {
    const result = await accountApiRequest.me(sessionToken?.value)
    user = result.payload.data
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider inititalSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
