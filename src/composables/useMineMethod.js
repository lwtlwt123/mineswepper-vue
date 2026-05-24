// 生成地雷随机数组方法
export function methodOfGeneratingLandmines(arrlength, num, i) {
    // console.log(i);

    // 传入i 不能和随机数组的数字相同

    // num 代表几个地雷
    let mineList = []
    for (let index = 0; index < num; index++) {
        // 排除相同元素
        // 每次添加遍历一遍 如果有相同的 不添加 没有再添加
        let randomNum = Math.floor(Math.random() * (arrlength + 1))
        if (mineList.indexOf(randomNum) === -1 && mineList.indexOf(i) === -1) {
            mineList.push(randomNum)
        } else {
            index--
        }

    }
    // console.log(mineList);

    return mineList

    // return Array.from(mineArr)

}


// 循环生成格子的方法
export function cellularAutomatonMethod(arr, quantity, mineArr, i) {
    // console.log(mineArr);


    // 生成地雷数量 简单10 中等40 高级99
    // 生成对应的随机数数组 确定雷的位置
    for (let index = 0; index < quantity; index++) {
        if (mineArr.includes(index))
            // 4个状态 未点开0 点开1 标记2 疑问3
            // 初始化只要是未点开
            arr.push({
                isHaveMine: 1,
                state: 0
            })
        else arr.push({
            isHaveMine: 0,
            state: 0
        })
    }

    // console.log(arr);

    return arr
}

// 点击事件
export function clickMineFn(i, state, clickMethod, mode, mineArr, gridList, isClick) {
    // state 状态  clickMethod 判断左右键点击不同的方法
    // 点击之后才开始分配雷区
    // 判断第一次点击
    if (!isClick)
        // 只有第一次点击调用此方法
        mineArr.value = methodOfGeneratingLandmines(mode, 10, i)



    // 左键
    if (clickMethod == "left") {
        // 游戏开始 调动生成格子方法 需修改格子 不能上来就点到雷区
        // console.log(mineArr);

        // 第一次点击赋值
        if (!state)
            gridList.value = cellularAutomatonMethod([], 81, mineArr.value, i)

        // 判断点击格子是否和炸弹数组重合？
        console.log(i);
        let clickstate = 0
        mineArr.value.forEach(element => {
            // console.log(element);
            console.log(i == element);

            if (i == element) {
                //  console.log('重合了');
                clickstate = 1
            }
        });
        return clickstate


    } else if (clickMethod == "right") {
        // console.log('右键');

    }
}

