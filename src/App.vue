<template>
    <div>
        <div>
            <loginPop />
        </div>
        <div class="shell">
            <!-- 登陆框 -->
    
            <!-- 工具栏 -->
            <div class="tool">
                <!-- 计时器 -->
                <div class="timer">
                    <!-- 计时器 -->
                    <span>{{ time }}</span>
                </div>
                <div class="levelChange" @click="changeLevelFn()">
    
                    <!-- 难度切换 -->
                    <img src="./assets/image/easy.svg" alt="" v-show="levelFlag == 0"
                        :style="{ width: '20px', height: '20px' }">
                    <img src="./assets/image/medium.svg" alt="" v-show="levelFlag == 1"
                        :style="{ width: '25px', height: '25px' }">
                    <img src="./assets/image/hard.svg" alt="" v-show="levelFlag == 2">
                </div>
                <!-- 计步器 -->
                <div class="pedometer">
                    <!-- 计步器 -->
                    <span>{{ step }}</span>
                </div>
            </div>
            <!-- 切换难度部分 -->
            <!-- 扫雷游戏 三种难度 -->
            <!-- 简单  9*9 10 -->
            <!-- 中等  16*16 40 -->
            <!-- 困难  30*16 99 -->
            <div class="gameBoard" :class="{
                easy: levelFlag == 0,
                medium: levelFlag == 1,
                hard: levelFlag == 2
            }">
    
                <easyLevel v-if="levelFlag == 0" @startFn="startSignFn" @exitTimer="exitFlagTimer"
                    @stepStartFn="stepStartExitFn" @stepExitFn="stepStartExitFn" :time="time" />
                <mediumLevel v-else-if="levelFlag == 1" @startFn="startSignFn" @exitTimer="exitFlagTimer"
                    @stepStartFn="stepStartExitFn" @stepExitFn="stepStartExitFn" :time="time" />
                <expertlevel v-else="levelFlag ==2" @startFn="startSignFn" @exitTimer="exitFlagTimer"
                    @stepStartFn="stepStartExitFn" @stepExitFn="stepStartExitFn" :time="time" />
            </div>
    
    
            <!-- <testPage /> -->
        </div>
    </div>
</template>

<script setup>
import easyLevel from "./components/easylevel.vue";
import mediumLevel from './components/mediumlevel.vue'
import expertlevel from './components/expertlevel.vue'
import loginPop from "./components/loginPop.vue";
import { ref, watch } from "vue";
// import testPage from './components/test.vue'

// 设置难度 0 1 2
const levelFlag = ref(0)
let clearTimer = null
const time = ref(0)
const step = ref(0)
const startFlag = ref(1)
const exitFlag = ref(1)

const changeLevelFn = () => {
    clearInterval(clearTimer)
    time.value = 0
    exitFlag.value = 1
    startFlag.value = 1
    step.value = 0
    // 调用子组件方法

    if (levelFlag.value == 0)
        levelFlag.value = 1
    else if (levelFlag.value == 1)
        levelFlag.value = 2
    else if (levelFlag.value == 2)
        levelFlag.value = 0
}

// 计时器方法
const timeFn = () => {
    clearInterval(clearTimer)
    clearTimer = setInterval(() => {
        // console.log('计时中：', time.value) // 加个日志，确认函数在执行
        time.value++
    }, 1000);
}

// 接收子组件的方法
const startSignFn = flag => {
    // console.log(flag.value);
    // setInterval(clearTimer)
    // time.value = 0
    startFlag.value = flag
}

const exitFlagTimer = flag => {
    // setInterval(clearTimer)
    exitFlag.value = flag
    // console.log(exitFlag.value);

}

const stepStartExitFn = flag => {
    // console.log(flag);

    step.value = flag
}

// const stepExitFn = flag => {
//     step.value = flag
// }

// watch(startFlag, (newVal, oldVal) => {
//     // console.log(newVal);
//     // exitFlagTimer()
//     // console.log(exitFlag.value);

//     // 加个判断 切换清除定时器
//     if (newVal == 0 && exitFlag.value == 1) {
//         // console.log('1进来了');

//         timeFn()
//     } else if (exitFlag.value == 0) {
//         // console.log('2进来了');
//         console.log('游戏结束了');

//         // 游戏结束 清除定时器
//         clearInterval(clearTimer)
//         time.value = 0
//     } else {
//         // console.log('来这里了');
//         /* 
//         为什么来这里会清除定时器效果
//         */

//     }
// }, { deep: true })

watch([startFlag, exitFlag], ([newStart, newExit]) => {
    console.log('watch触发：startFlag', newStart, 'exitFlag', newExit)
    if (newStart === 0 && newExit === 1) {
        timeFn() // 游戏开始，启动计时器
    } else if (newExit === 0) {
        // console.log('游戏结束了，执行停止逻辑')
        clearInterval(clearTimer)
        clearTimer = null
        time.value = 0
        exitFlag.value = 1
    }
}, { deep: true })


//设置点击方法
</script>

<style scoped lang="less">
.shell {
    // max-width: 400px;
    // height: 300px;
    background-color: #c0c0c0;
    padding: 5px 10px;
    border: 3px outset #dfdfdf;
}

.tool {
    display: flex;
    justify-content: space-between;

    .levelChange {
        img {

            width: 30px;
            height: 30px;
        }
    }

    .timer {
        span {
            font-family: 'Digital-7 Mono', monospace;
            font-size: 16px;
            color: #f00;
            background: #000;
            padding: 2px 4px;
            border: 3px inset #666;
            /* 去模糊，像扫雷那种像素感 */
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: grayscale;
        }
    }

    .pedometer {
        span {
            font-family: 'Digital-7 Mono', monospace;
            font-size: 16px;
            color: #00E040;
            background: #000;
            padding: 2px 4px;
            border: 3px inset #666;
            /* 去模糊，像扫雷那种像素感 */
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: grayscale;
        }
    }
}

.gameBoard {
    // width: 152px;
    // height: 152px;
    background-color: #c0c0c0;
    // position: absolute;
    // top: 50%;
    // left: 500px;
    margin: 30px auto 40px;
    border: 3px outset #dfdfdf
}

.easy {
    width: 180px;
    height: 180px;
}

.medium {
    width: 320px;
    height: 320px;
}

.hard {
    width: 600px;
    height: 320px;
}
</style>
