<template>
    <wd-config-provider :custom-class="'h-full flex flex-col layout ' + platform" :theme-vars="themeVars">
        <navbar />
        <view class="layout-content flex-1">
            <slot />
        </view>
        <tabbar />
    </wd-config-provider>
</template>
<script lang="ts" setup>
import navbar from '@/components/navbar/index.vue'
import tabbar from '@/components/tabbar/index.vue'
import { getThemeVars } from './themeVars'

const platform = process.env.UNI_PLATFORM as string
console.log(platform)

const themeVars = getThemeVars()
</script>
<style lang="scss" scoped>
.layout {
    &-content {
        position: relative;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
