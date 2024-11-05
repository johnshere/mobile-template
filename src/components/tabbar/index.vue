<template>
    <view v-if="tabbar" class="tabbar">
        <wd-tabbar :modelValue="tabbar" fixed bordered safe-area-inset-bottom @change="handleChange">
            <wd-tabbar-item
                v-for="(item, index) in data"
                :key="index"
                :value="index"
                :title="item.meta?.title"
                :name="item.name"
                :icon="item.name"
            ></wd-tabbar-item>
        </wd-tabbar>
    </view>
</template>
<script lang="ts">
export default {
    options: {
        styleIsolation: 'shared'
    }
}
</script>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'uni-mini-router'
import { pages } from '@/pages.json'
import { findPageConfig } from '@/utils'
const route = useRoute()
const router = useRouter()

const data = pages.filter(it => it.meta?.isTab)
const tabbar = ref('')

onBeforeMount(() => {
    const pageConf = findPageConfig(route.path)
    if (pageConf?.meta.isTab) {
        tabbar.value = route.path?.match(/^\/pages\/([a-z]*)\//)?.[1] || ''
    } else {
        tabbar.value = ''
    }
})

const handleChange = (val: { value: string }) => {
    router.replace({ name: val.value })
}
</script>

<style lang="scss" scoped>
.layout .tabbar {
    margin-bottom: env(safe-area-inset-bottom);
    height: var(--wot-tabbar-height, 100px);
    :deep(.wd-tabbar) {
        z-index: 10 !important;
        .wd-badge__content {
            border: none !important;
            padding: 0;
            width: 32px;
            height: 32px;
        }
    }
}
</style>
