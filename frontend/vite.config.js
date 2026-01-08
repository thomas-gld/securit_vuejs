import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
   plugins: [vue()],
   server: {
      port: 8080,
      open: true,
      host: true, // allows for external device connection on local network
      proxy: {
         // prevent CORS error in dev when backend and frontend servers run on different ports
         '/check_credentials': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         '/login_verify_code': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         '/check_register': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         '/register_verify_code': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         '/register_new_user': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         '/get_visits': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
         
         '^/api/.*': {
            target: 'http://localhost:3001',
            changeOrigin: true,
         },
      }
   }
})