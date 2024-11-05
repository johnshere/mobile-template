<template>
    <view class="contain h-full flex flex-col">
        <view class="content flex-1">
            <index v-if="tabbar === 'home'"></index>
            <cart v-if="tabbar === 'cart'"></cart>
            <photo v-if="tabbar === 'photo'"></photo>
            <user v-if="tabbar === 'user'"></user>
        </view>
        <view class="tabbar">
            <wd-tabbar v-model="tabbar" fixed bordered safe-area-inset-bottom>
                <wd-tabbar-item title="首页" is-dot name="home" :value="1" icon="home"></wd-tabbar-item>
                <wd-tabbar-item title="分类" :value="2" name="cart" icon="cart"></wd-tabbar-item>
                <wd-tabbar-item title="相册" :value="3" name="photo" icon="photo"></wd-tabbar-item>
                <wd-tabbar-item title="我的" :value="4" name="user" icon="user"></wd-tabbar-item>
            </wd-tabbar>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import index from '../home/index.vue' //首页
import cart from '../cart/index.vue' //首页
import photo from '../photo/index.vue'
import user from '../user/index.vue' //我的页面
import { useRoute } from 'uni-mini-router'
const router = useRoute()
const tabbar = ref('home')

onMounted(() => {
    console.log(router, '我回去到mounted了')
})
</script>

<style lang="scss" scoped>
:deep(.wd-tabbar) {
    z-index: 10 !important;
    .wd-badge__content {
        border: none !important;
    }
}

.tabbar {
    margin-bottom: env(safe-area-inset-bottom);
    height: var(--wot-tabbar-height, 50px);
}
</style>
