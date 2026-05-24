<template>
    <div class="mineClearanceAreaEasy">
        <!-- 雷有了  判断状态-->
        <div class="item" v-for="(cell, index) in gridList"
            @click="clickFn(index, cell ? cell.isHaveMine : 0, 'left', 81)"
            @contextmenu.prevent="clickFn(index, cell ? cell.isHaveMine : 0, 'right')" :key="index">
            <!-- {{ cell ? cell.isHaveMine : 0 }} -->
            <!-- 做到点击到地雷才显示所有地雷 -->
            <!-- 判断点击的index -->
            {{ cell && cell.isHaveMine }}
            <div :class="{ haveMine: cell && cell.isHaveMine && isShow }"></div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import {
    cellularAutomatonMethod,
    methodOfGeneratingLandmines,
    clickMineFn
} from "../composables/useMineMethod.js";
import { ElMessageBox, ElMessage } from 'element-plus'
// 有雷数组 点击方法时候再赋值
const mineArr = ref([])
// 初始化数组
// 刚进页面时不给 gridlist 赋值 用另外一个数组进行渲染
const gridList = ref(new Array(81))

// 这样传ref
let isClick = 0
const isShow = ref(0)
const clickFn = (i, state, clickMethod, mode) => {

    // 点击到地雷显示游戏结束了
    isShow.value = clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick)
    if (isShow.value) {
        ElMessageBox.alert('踩雷啦，游戏结束！', '提示', {
            confirmButtonText: '重新开始',
            type: 'error',
        })
    }


    // if (clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick) == 1) {
    //  console.log('重合了');

    // }
    // clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick)
    isClick = 1
    // console.log('我在点击' + i + '格子', mineArr.value);
    // 判断点击的格子是否和炸弹数组重合


}


watch(() => gridList.value,
    (newVal) => {
        console.log('✅ 监听到数组变化了！', newVal)
        console.log('✅ 第一项：', newVal[0])
    },
    { deep: true })





// const gridList = ref(cellularAutomatonMethod([], 81, mineArr))
// 
</script>

<style scoped lang="less">
.mineClearanceAreaEasy {
    width: 100%;
    height: 100%;

    display: flex;
    // flex-direction: column;
    /* 纵向排列 */
    flex-wrap: wrap;
    /* 放不下自动换行（换列） */
    align-content: flex-start;
    /* 多列时左对齐 */

    .item {
        width: 16.8px;
        height: 16.8px;
        // background-color: red;
        box-sizing: border-box;
        border: 1px solid #999;
        /* 灰色隔线 */
    }

    .haveMine {
        width: 100%;
        height: 100%;
        background-image: url(../assets/image/bomb.svg);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }
}
</style>