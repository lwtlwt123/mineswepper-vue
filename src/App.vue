<template>
    <div class="shell">
        <!-- 工具栏 -->
        <div class="tool">
            <!-- 计时器 -->
            <div class="timer">
                计时器
            </div>
            <!-- 计步器 -->
            <div class="pedometer">
                计步器
            </div>
        </div>
        <!-- 切换难度部分 -->
        <!-- 扫雷游戏 三种难度 -->
        <!-- 简单  9*9 10 -->
        <!-- 中等  16*16 40 -->
        <!-- 困难  30*16 99 -->
        <div class="gameBoard">
            
            <easyLevel />
        </div>

        <!-- <testPage /> -->
    </div>
</template>

<script setup>
import easyLevel from "./components/easylevel.vue";
// import testPage from './components/test.vue'
</script>

<style scoped lang="less">
.shell {
    width: 200px;
    // height: 300px;
    background-color: pink;
    padding: 5px 10px;
}

.tool {
    display: flex;
    justify-content: space-between;

    .timer {}

    .pedometer {}
}

.gameBoard {
    width: 152px;
    height: 152px;
    background-color: orange;
    // position: absolute;
    // top: 50%;
    // left: 500px;
    margin: 30px auto 40px;
}
</style>
