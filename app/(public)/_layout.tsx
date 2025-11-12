import { Stack } from "expo-router";

export default function PublicPages() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}