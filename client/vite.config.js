/*
 * @Author: 农村高富帅
 * @Date: 2024-08-12 16:19:42
 * @LastEditors: 农村高富帅
 * @LastEditTime: 2024-08-12 16:42:26
 * @FilePath: /client/vite.config.js
 * @Description: 
 * @mail: gaozemin0509@gmail.com
 */

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({

  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})