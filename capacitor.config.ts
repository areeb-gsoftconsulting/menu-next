import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.menunext",
  appName: "Menu-Next",
  webDir: "dist",
  server: {
    allowNavigation: ["https://menu-next-ckib.vercel.app/"],
  },
  plugins: {},
};

export default config;
