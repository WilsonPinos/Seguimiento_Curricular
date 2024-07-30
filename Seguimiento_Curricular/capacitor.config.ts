import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',  // Asegúrate de que el appId es el correcto para tu app
  appName: 'seguimiento-curricular',
  webDir: 'dist/seguimiento-curricular/browser',  // Actualizado para reflejar la ubicación correcta
  bundledWebRuntime: false
};

export default config;
