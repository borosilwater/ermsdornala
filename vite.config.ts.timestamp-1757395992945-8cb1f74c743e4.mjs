// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
import { copyFileSync, existsSync, mkdirSync } from "fs";
var __vite_injected_original_dirname = "/home/project";
var copyHtmlFiles = () => {
  return {
    name: "copy-html-files",
    writeBundle() {
      const htmlFiles = [
        "about.html",
        "campus-life.html",
        "news-events.html",
        "admissions.html",
        "achievements.html",
        "contact.html",
        "gallery.html",
        "news.html",
        "login.html",
        "teacher-dashboard.html",
        "student-dashboard.html"
      ];
      const cssFiles = [
        "style.css",
        "responsive.css"
      ];
      const jsFiles = [
        "main.js",
        "achievements.js",
        "admissions.js",
        "contact.js",
        "news-events.js"
      ];
      htmlFiles.forEach((file) => {
        if (existsSync(file)) {
          copyFileSync(file, `dist/${file}`);
          console.log(`Copied ${file} to dist/`);
        }
      });
      cssFiles.forEach((file) => {
        if (existsSync(file)) {
          copyFileSync(file, `dist/${file}`);
          console.log(`Copied ${file} to dist/`);
        }
      });
      jsFiles.forEach((file) => {
        if (existsSync(file)) {
          copyFileSync(file, `dist/${file}`);
          console.log(`Copied ${file} to dist/`);
        }
      });
      try {
        mkdirSync("dist/images", { recursive: true });
        console.log("Created dist/images directory");
      } catch (error) {
      }
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyHtmlFiles()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IGNvcHlGaWxlU3luYywgZXhpc3RzU3luYywgbWtkaXJTeW5jIH0gZnJvbSBcImZzXCI7XG5cbi8vIFBsdWdpbiB0byBjb3B5IEhUTUwgZmlsZXMgYW5kIENTUyBmaWxlcyB0byBkaXN0XG5jb25zdCBjb3B5SHRtbEZpbGVzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjb3B5LWh0bWwtZmlsZXMnLFxuICAgIHdyaXRlQnVuZGxlKCkge1xuICAgICAgY29uc3QgaHRtbEZpbGVzID0gW1xuICAgICAgICAnYWJvdXQuaHRtbCcsXG4gICAgICAgICdjYW1wdXMtbGlmZS5odG1sJywgXG4gICAgICAgICduZXdzLWV2ZW50cy5odG1sJyxcbiAgICAgICAgJ2FkbWlzc2lvbnMuaHRtbCcsXG4gICAgICAgICdhY2hpZXZlbWVudHMuaHRtbCcsXG4gICAgICAgICdjb250YWN0Lmh0bWwnLFxuICAgICAgICAnZ2FsbGVyeS5odG1sJyxcbiAgICAgICAgJ25ld3MuaHRtbCcsXG4gICAgICAgICdsb2dpbi5odG1sJyxcbiAgICAgICAgJ3RlYWNoZXItZGFzaGJvYXJkLmh0bWwnLFxuICAgICAgICAnc3R1ZGVudC1kYXNoYm9hcmQuaHRtbCdcbiAgICAgIF07XG4gICAgICBcbiAgICAgIGNvbnN0IGNzc0ZpbGVzID0gW1xuICAgICAgICAnc3R5bGUuY3NzJyxcbiAgICAgICAgJ3Jlc3BvbnNpdmUuY3NzJ1xuICAgICAgXTtcbiAgICAgIFxuICAgICAgY29uc3QganNGaWxlcyA9IFtcbiAgICAgICAgJ21haW4uanMnLFxuICAgICAgICAnYWNoaWV2ZW1lbnRzLmpzJyxcbiAgICAgICAgJ2FkbWlzc2lvbnMuanMnLFxuICAgICAgICAnY29udGFjdC5qcycsXG4gICAgICAgICduZXdzLWV2ZW50cy5qcydcbiAgICAgIF07XG4gICAgICBcbiAgICAgIC8vIENvcHkgSFRNTCBmaWxlc1xuICAgICAgaHRtbEZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgIGlmIChleGlzdHNTeW5jKGZpbGUpKSB7XG4gICAgICAgICAgY29weUZpbGVTeW5jKGZpbGUsIGBkaXN0LyR7ZmlsZX1gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgQ29waWVkICR7ZmlsZX0gdG8gZGlzdC9gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIENvcHkgQ1NTIGZpbGVzXG4gICAgICBjc3NGaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICBpZiAoZXhpc3RzU3luYyhmaWxlKSkge1xuICAgICAgICAgIGNvcHlGaWxlU3luYyhmaWxlLCBgZGlzdC8ke2ZpbGV9YCk7XG4gICAgICAgICAgY29uc29sZS5sb2coYENvcGllZCAke2ZpbGV9IHRvIGRpc3QvYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBDb3B5IEpTIGZpbGVzXG4gICAgICBqc0ZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgIGlmIChleGlzdHNTeW5jKGZpbGUpKSB7XG4gICAgICAgICAgY29weUZpbGVTeW5jKGZpbGUsIGBkaXN0LyR7ZmlsZX1gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgQ29waWVkICR7ZmlsZX0gdG8gZGlzdC9gKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIEVuc3VyZSBpbWFnZXMgZGlyZWN0b3J5IGV4aXN0cyBpbiBkaXN0XG4gICAgICB0cnkge1xuICAgICAgICBta2RpclN5bmMoJ2Rpc3QvaW1hZ2VzJywgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVkIGRpc3QvaW1hZ2VzIGRpcmVjdG9yeScpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gRGlyZWN0b3J5IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHRoYXQncyBmaW5lXG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSwgXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpLFxuICAgIGNvcHlIdG1sRmlsZXMoKVxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsY0FBYyxZQUFZLGlCQUFpQjtBQUpwRCxJQUFNLG1DQUFtQztBQU96QyxJQUFNLGdCQUFnQixNQUFNO0FBQzFCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFDWixZQUFNLFlBQVk7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxXQUFXO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBR0EsZ0JBQVUsUUFBUSxVQUFRO0FBQ3hCLFlBQUksV0FBVyxJQUFJLEdBQUc7QUFDcEIsdUJBQWEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUNqQyxrQkFBUSxJQUFJLFVBQVUsSUFBSSxXQUFXO0FBQUEsUUFDdkM7QUFBQSxNQUNGLENBQUM7QUFHRCxlQUFTLFFBQVEsVUFBUTtBQUN2QixZQUFJLFdBQVcsSUFBSSxHQUFHO0FBQ3BCLHVCQUFhLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFDakMsa0JBQVEsSUFBSSxVQUFVLElBQUksV0FBVztBQUFBLFFBQ3ZDO0FBQUEsTUFDRixDQUFDO0FBR0QsY0FBUSxRQUFRLFVBQVE7QUFDdEIsWUFBSSxXQUFXLElBQUksR0FBRztBQUNwQix1QkFBYSxNQUFNLFFBQVEsSUFBSSxFQUFFO0FBQ2pDLGtCQUFRLElBQUksVUFBVSxJQUFJLFdBQVc7QUFBQSxRQUN2QztBQUFBLE1BQ0YsQ0FBQztBQUdELFVBQUk7QUFDRixrQkFBVSxlQUFlLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDNUMsZ0JBQVEsSUFBSSwrQkFBK0I7QUFBQSxNQUM3QyxTQUFTLE9BQU87QUFBQSxNQUVoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxjQUFjO0FBQUEsRUFDaEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
