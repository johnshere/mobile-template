<template>
    <layout>
        <view class="contain">
            <wd-picker
                v-model="value"
                :columns="columns"
                label="多列联动"
                :column-change="onChangeDistrict"
                :display-format="displayFormat"
            />
            <view @click="closeOutside">
                <wd-popover v-model="show" content="这是一段信息。" @change="handleChange">
                    <wd-button>点击展示</wd-button>
                </wd-popover>
            </view>
            <wd-calendar v-model="values" label="日期选择" @confirm="handleConfirm" />
            <wd-count-down :time="time" />
        </view>
    </layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useQueue } from 'wot-design-uni'
import layout from '@/components/layout/index.vue'

const { closeOutside } = useQueue()
const show = ref<boolean>(false)

const district: any = {
    '0': [
        { label: '北京', value: '110000' },
        { label: '广东省', value: '440000' }
    ],
    '110000': [{ label: '北京', value: '110100' }],
    '440000': [
        { label: '广州市', value: '440100' },
        { label: '韶关市', value: '440200' },
        { label: '深圳市', value: '440300' },
        { label: '珠海市', value: '440400' },
        { label: '汕头市', value: '440500' }
    ],
    '110100': [
        { label: '东城区', value: '110101' },
        { label: '西城区', value: '110102' },
        { label: '朝阳区', value: '110105' },
        { label: '丰台区', value: '110106' },
        { label: '石景山区', value: '110107' }
    ],
    '440100': [
        { label: '荔湾区', value: '440103' },
        { label: '越秀区', value: '440104' },
        { label: '海珠区', value: '440105' }
    ],
    '440200': [{ label: '武江区', value: '440203' }],
    '440300': [
        { label: '罗湖区', value: '440303' },
        { label: '福田区', value: '440304' }
    ],
    '440400': [
        { label: '香洲区', value: '440402' },
        { label: '斗门区', value: '440403' },
        { label: '金湾区', value: '440404' }
    ],
    '440500': [
        { label: '龙湖区', value: '440507' },
        { label: '金平区', value: '440511' }
    ]
}

const values = ref<number[]>([])
function handleConfirm({ value }: any) {
    console.log(value)
}
const time = ref<number>(30 * 60 * 60 * 1000)

const value = ref(['110000', '110100', '110102'])

const columns = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])

const onChangeDistrict = (pickerView, value, columnIndex, resolve) => {
    console.log(value, '我是vakue')
    const item = value[columnIndex]
    if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
    } else if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
    }
    resolve()
}

const displayFormat = (items: any) => {
    return items
        .map((item: any) => {
            return item.label
        })
        .join('-')
}

function handleChange({ show }: any) {
    console.log(show)
}
</script>
<style lang="scss" scoped>
.contain {
    padding: 40px;
}
</style>
