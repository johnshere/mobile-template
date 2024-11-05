<template>
    <layout>
        <view v-for="i in 30" :key="i">{{ i }}</view>
    </layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import layout from '@/components/layout/index.vue'

const time = ref(new Date())
setInterval(() => {
    time.value = new Date()
}, 996)
</script>
