import { defineConfig } from 'vite'
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  //base:"/ESTACIONMETEOROLOGICA/",
  plugins: [reactRefresh()],
  mode: "development",
  build: {
    minify: false,
  }
})
