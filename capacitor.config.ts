import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.menunext",
  appName: "Menu-Next",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {},
};

export default config;
