<template>
    <div class="mineClearanceAreaEasy">
        <!-- 雷有了  判断状态-->
        <div class="item" v-for="(cell, index) in gridList"
            @click="clickFn(index, cell ? cell.isHaveMine : 0, 'left', 81)"
            @contextmenu.prevent="clickFn(index, cell ? cell.isHaveMine : 0, 'right', 81)" :key="index">
            <!-- {{ cell ? cell.isHaveMine : 0 }} -->
            <!-- 做到点击到地雷才显示所有地雷 -->
            <!-- 判断点击的index -->
            <!-- {{ cell && cell.isHaveMine }} -->
            <!-- {{ cell ? cell.state : 0 }} -->
            <div :class="{
                haveMine: cell && cell.isHaveMine && isShow,
                isClick: cell && cell.state == 1,
                isPlantAFlag: cell && cell.state == 3,
                isQuestion: cell && cell.state == 4
            }" :style="{
                color: [
                    '',          // 0 不显示
                    '#0000FF',   // 1 蓝
                    '#008000',   // 2 绿
                    '#FF0000',   // 3 红
                    '#000080',   // 4 深蓝
                    '#800000',   // 5 深红
                    '#008080',   // 6 青色
                    '#000000',   // 7 黑
                    '#808080'    // 8 灰
                ][cell ? cell.mineNum : 0],

            }">
                <!-- {{ cell && cell.state }} -->
                {{ cell && cell.state === 1 && cell.mineNum > 0 ? cell.mineNum : '' }}
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
    cellularAutomatonMethod,
    methodOfGeneratingLandmines,
    clickMineFn
} from "../composables/useMineMethod.js";
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
// 有雷数组 点击方法时候再赋值
const mineArr = ref([])
// 初始化数组
// 刚进页面时不给 gridlist 赋值 用另外一个数组进行渲染
const gridList = ref(new Array(81))

// 渲染雷的个数的标志
// const mineNum = ref(0)

// 这样传ref
const isClick = ref(0)
const isShow = ref(0)
// 重制游戏的方法 不想刷新页面
const initGame = () => {
    mineArr.value = []
    gridList.value = new Array(81)
    isClick.value = 0
    isShow.value = 0
}

const clickFn = (i, state, clickMethod, mode) => {
    let sign = clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick)

    // 点击到地雷显示游戏结束了
    isShow.value = sign
    if (isShow.value === 1) {
        ElMessageBox.alert('踩雷啦，游戏结束！', '提示', {
            confirmButtonText: '重新开始',
            type: 'error',
        }).then(() => {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: '游戏加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
                loadingInstance.close();
                initGame()
            }, 700);
        })
    }


    // if()
    // console.log(clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick));
    if (sign !== 'stop') {
        isClick.value = 1
    }



}


watch(() => gridList.value,
    (newVal) => {
        // 判断胜利状态

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
        width: calc(100% / 9);
        aspect-ratio: 1 / 1;
        // height: 16.8px;
        // background-color: red;
        box-sizing: border-box;
        border: 1px outset #dfdfdf;
        // padding-top: 4px;
        /* 灰色隔线 */
        // color: forestgreen;
    }

    .haveMine {
        width: 100%;
        height: 100%;
        background-image: url(../assets/image/bomb.svg);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .isPlantAFlag {
        width: 100%;
        height: 100%;
        background-image: url(../assets/image/flag.svg);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .isQuestion {
        width: 100%;
        height: 100%;
        background-image: url(../assets/image/que.svg);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .isClick {
        // margin-top: 4px;
        width: 100%;
        height: 100%;
        background-color: #d4d0c8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        // padding-top: 4px;
        font-family: "Microsoft YaHei", "Courier New", monospace;
    }
}
</style>