<template>
    <view v-if="showNavbar" class="navbar">
        <wd-navbar
            fixed
            safe-area-inset-top
            :title="pageConf?.meta.title || ''"
            :left-arrow="showBack"
            :left-text="showBack ? '返回' : ''"
            @click-left="back"
        ></wd-navbar>
    </view>
</template>
<script lang="ts" setup>
import router from '@/router'
import { findPageConfig } from '@/utils'
import { useRoute } from 'uni-mini-router'
import { onBeforeMount, ref } from 'vue'

const route = useRoute()

const showNavbar = ref(false)
const showBack = ref(false)
const pageConf = ref(undefined as PageJSON.Page | undefined)
onBeforeMount(() => {
    pageConf.value = findPageConfig(route.path)
    showNavbar.value = pageConf.value?.style?.navigationStyle === 'custom'
    showBack.value = !!pageConf.value && !pageConf.value.meta?.isTab
})
function back() {
    router.back()
}
</script>
<style lang="scss" scoped>
.navbar {
    padding-top: 20px;
    height: var(--wot-navbar-height, 88px);
    width: 100%;
    box-sizing: content-box;
}
.h5 .navbar {
    padding-top: 0;
}
</style>
