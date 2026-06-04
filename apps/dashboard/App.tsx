import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DashboardScreen } from "./screens/DashboardScreen";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <DashboardScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
