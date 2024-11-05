import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import px2rem from 'postcss-pxtorem'
import varUnitTransform from './src/utils/var-unit-transform'
import rem2px from 'postcss-rem-to-responsive-pixel'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import TransformPages from 'uni-read-pages-vite'
import eslintPlugin from 'vite-plugin-eslint' //eslint自动检查插件

import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { name } from './package.json'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
// 是小程序端
const isMiniProgram = !(isH5 || isApp)

const conf = {
    rootValue(input) {
        return input.file?.indexOf('wot-design-uni') !== -1 ? 16 : 32
    },
    propList: ['*']
}
const postcssPlugins = [tailwindcss(), autoprefixer(), px2rem(conf), varUnitTransform(conf)]
// tailwind的样式是rem，小程序等环境转成rpx
if (isMiniProgram) {
    // 32 意味着 1rem = 32rpx
    // 转化的单位,rpx
    const conf = {
        rootValue: 32,
        propList: ['*'],
        unit: 'rem',
        transformUnit: 'rpx'
    }
    postcssPlugins.push(rem2px(conf as any), varUnitTransform(conf as any))
}

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'development' ? '.' : `./${name}/`,
    server: {
        //跨域配置
        host: '0.0.0.0',
        port: 5174,
        open: true //是否自动打开浏览器
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        },
        //   关闭文件计算
        reportCompressedSize: false,
        //   关闭生成map文件 可以达到缩小打包体积
        sourcemap: process.env.NODE_ENV === 'development' // 这个生产环境一定要关闭，不然打包的产物会很大
    },
    // 路径配置
    resolve: {
        alias: {
            find: '@',
            replacement: resolve(__dirname, 'src') //配置@ 路径
        }
    },
    define: {
        ROUTES: new TransformPages().routes // 注入路由表
    },
    plugins: [
        // make sure put it before `Uni()`
        Components({
            resolvers: [WotResolver()]
        }),
        uni(),
        uvwt({
            disabled: !isMiniProgram
        }),
        eslintPlugin({
            include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
        })
    ],
    css: {
        postcss: {
            plugins: postcssPlugins
        }
    }
})
