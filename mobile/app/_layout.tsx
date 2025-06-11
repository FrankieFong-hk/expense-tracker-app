import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const publishableKey =
    "pk_test_cGlja2VkLXR1cnRsZS04Mi5jbGVyay5hY2NvdW50cy5kZXYk";
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}
