<template>
    <div @click="handleClick(arr)">
        这里是测试页面 {{ arr }}
    </div>
</template>

<script setup>
import { ref } from "vue";
import { test } from '../composables/test.js'
const arr = ref([2, 1, 3, 4, 56, 5])
// const test = () => {
//     // console.log('localTest 收到:', data)
//     arr.value = ['本地修改']
// }
const handleClick = () => {
    test(arr)
}
</script>

<style scoped></style>