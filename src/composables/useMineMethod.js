// 修改难度的标志
let mineFlag = 0

// 生成地雷随机数组方法
export function methodOfGeneratingLandmines(arrlength, num, i) {
    // console.log(arrlength);
    // console.log(num);

    // console.log(i);

    // 传入i 不能和随机数组的数字相同

    // num 代表几个地雷
    let mineList = []
    for (let index = 0; index < num; index++) {
        // 排除相同元素
        // 每次添加遍历一遍 如果有相同的 不添加 没有再添加
        // let randomNum = Math.floor(Math.random() * (arrlength + 1))
        // debugger
        // console.log(mineList.indexOf(i));

        /* if (mineList.indexOf(randomNum) === -1 && mineList.indexOf(i) === -1) {
            mineList.push(randomNum)
        } else {
            index--
        } */
        while (mineList.length < num) {
            // 生成 0 ~ 总格子数-1 的随机数
            let randomNum = Math.floor(Math.random() * arrlength)

            // 满足两个条件才加入
            // 1. 不重复
            // 2. 不是第一次点击的位置 i
            if (!mineList.includes(randomNum) && randomNum !== i) {
                mineList.push(randomNum)
            }
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
                // 有地雷的标志
                isHaveMine: 1,
                state: 0,
                mineNum: 0
            })
        else arr.push({
            isHaveMine: 0,
            state: 0,
            mineNum: 0
        })
    }

    // console.log(arr);

    return arr
}

// 点击事件
export function clickMineFn(i, isHaveMine, clickMethod, mode, mineArr, gridList, isClick) {

    // console.log(isClick.value);

    // state 状态  clickMethod 判断左右键点击不同的方法
    // 点击之后才开始分配雷区
    // 判断第一次点击
    // console.log(gridList.value);

    // 左键
    if (clickMethod == "left") {
        // console.log(isClick.value);

        if (!isClick.value)
        // 只有第一次点击调用此方法
        {
            // console.log('初始数组');

            // let mine = 0
            if (mode == 81) mineFlag = 1
            else if (mode == 256) mineFlag = 1
            if (mode == 480) mineFlag = 1
            mineArr.value = methodOfGeneratingLandmines(mode, mineFlag, i)

        }
        // 游戏开始 调动生成格子方法 需修改格子 不能上来就点到雷区™™
        // console.log(isClick.value);´

        // 第一次点击赋值
        if (!isClick.value) {

            gridList.value = cellularAutomatonMethod([], mode, mineArr.value, i)
            // console.log(gridList);
        }
        // console.log(gridList.value[i]);
        if (gridList.value[i].state == 3 || gridList.value[i].state == 4) {
            return
        }
        // 点击之后状态改变 已点开
        gridList.value[i].state = 1
        // console.log(gridList.value[i]);


        // 判断点击格子是否和炸弹数组重合？
        // console.log(i);
        let clickstate = 0
        mineArr.value.forEach(element => {
            // 点击到雷了
            if (i == element) clickstate = 1
            // 没有点到雷 打开页面
            else {
                // let { result, isMine } = mineClearFn(i, mineArr, gridList)
                // console.log(result, isMine);
                // 一圈全部没有雷
                // if (!isMine) {
                // result.forEach(element => {
                mineClearFn(i, mineArr, gridList, mode)
                // console.log(element);
                // });
                // }

            }
        });
        return clickstate


    } else if (clickMethod == "right" && (gridList.value[i] ? gridList.value[i].state !== 1 : 0)) {




        if (gridList.value[i].state === 1)
            return;



        // 判断右键时的状态 
        if (!isClick.value) {
            return 'stop'
        } else {
            //第一次右键插旗
            // console.log(gridList.value[i].state);



            if (gridList.value[i].state == 3)
                gridList.value[i].state = 4
            else if (gridList.value[i].state == 4)
                gridList.value[i].state = 0
            else
                gridList.value[i].state = 3

        }

        // console.log(isClick);




    }
    else if (clickMethod == 'right')
        return

    // 双击事件
    // else if (clickMethod == 'db') {
    //     console.log('这里是双击事件');
    //     /* 如果周围的雷全部被标记 双击打开格子 */
    //     // 判断周围的雷是否全被标记了
    //     // if(){}
    //     // 周边一圈的坐标
    //     const aroundArr = mineClearFn(i, mineArr, gridList)
    //     // 标记了的坐标
    //     const flaggedArr = gridList.value
    //         .map((cell, idx) => cell.state === 3 ? idx : -1)
    //         .filter(i => i !== -1)
    //     // 获取一个新数组 周边标记了的坐标
    //     // 先把周边数组转成 Set，查找更快
    //     const aroundSet = new Set(aroundArr)
    //     const aroundFlagged = flaggedArr.filter(idx => aroundSet.has(idx))
    //     console.log(aroundFlagged);
    //     // 判断这个数组有几个是 item.stea

    //     // console.log();




    // }
    else return 'stop'

}

let isManualFlag = 0
// 未点击到雷 的操作函数
/* 
    扩大页面
    点击后会显示附近有多少个雷
*/
// export function mineClearFn(i, mineArr, gridList, mode) {
//     // console.log(gridList.value[i].state);
//     // console.log(11111);



//     // 已打开 就返回
//     if (gridList.value[i].state === 1 && isManualFlag) {
//         // console.log(213);

//         return
//     }
//     // console.log(mineArr.value.includes(i));


//     // 格子是雷
//     if (mineArr.value.includes(i) && isManualFlag) {
//         // console.log(123);

//         return
//     }
//     // console.log(1);

//     /* 
//       切换页面判断边界改变条件
//     */

//     if (mode == 81) mineFlag = 9
//     else if (mode == 256) mineFlag = 16
//     else if (mode == 480) mineFlag = 30
//     /* 
//     遍历四周一圈 判断有多少雷 显示在该方块上 
//     给i 设定个坐标 （x，y）
//     x=  i -9y
//     y= Math.celi(i % 9)
//     左上 
//     */
//     // i: 0~80
//     let y = Math.floor(i / mineFlag) // 结果：0~8
//     let x = i % mineFlag             // 结果：0~8
//     // console.log(x, y);

//     // console.log(`坐标是${x},${y}`);
//     /* 
//        得到坐标
//          判断四周有没有雷
//          左上 （x-1，y-1）
//          上（x，y-1）
//          右上（x+1，y-1）
//          左（x-1，y）
//          右（x+1，y）
//          左下（x-1，y+1）
//          下（x，y+1）
//          右下（x+1，y+1）

//          根据他们的xy值恢复角标 i 然后判断在不在有雷数组里面 在的话存起来形成一个新数组 获得长度显示在中间

//          需判断结束后的 xy值不能 小于0大于9
//      */
//     // 将他们的坐标存入数组中
//     /* let arondArr = []

//     arondArr.push(allAroundArrFn(x - 1, y - 1))
//     arondArr.push(allAroundArrFn(x, y - 1))
//     arondArr.push(allAroundArrFn(x + 1, y - 1))
//     arondArr.push(allAroundArrFn(x - 1, y))
//     arondArr.push(allAroundArrFn(x + 1, y))
//     arondArr.push(allAroundArrFn(x - 1, y + 1))
//     arondArr.push(allAroundArrFn(x, y + 1))
//     arondArr.push(allAroundArrFn(x + 1, y + 1))
//     console.log(arondArr); */

//     // 2. 周围8个方向（标准写法）
//     const around = [
//         { x: x - 1, y: y - 1 },
//         { x: x, y: y - 1 },
//         { x: x + 1, y: y - 1 },
//         { x: x - 1, y: y },
//         { x: x + 1, y: y },
//         { x: x - 1, y: y + 1 },
//         { x: x, y: y + 1 },
//         { x: x + 1, y: y + 1 },
//     ]
//     // console.log(1);

//     //3. 过滤掉越界的（x,y 必须 0~8）
//     // if (mode !== 480) {

//     const valid = around.filter(item => {
//         // console.log(1);

//         return item.x >= 0 && item.x < mineFlag && item.y >= 0 && item.y < mineFlag == 30 ? 16 : mineFlag
//     })
//     // }

//     // 4. 把合法坐标转回数组索引
//     const result = valid.map(item => {
//         return item.y * mineFlag + item.x  // 绝对不会出负数！
//     })
//     // console.log(11111);


//     // console.log(result);

//     // 判断result 和 mineArr有几个重合的 判断雷的个数 有就显示数字 没有啥也不显示
//     // console.log(mineArr.value);
//     // let isMine = 1
//     let count = result.filter(n => new Set(mineArr.value).has(n)).length;
//     gridList.value[i].mineNum = count
//     gridList.value[i].state = 1
//     // console.log(gridList.value[i].mineNum);


//     //  周围一圈都没有雷
//     if (count == 0 || gridList.value[i].mineNum == 0) {
//         // if (gridList.value[i].mineNum == 0) {
//         //     console.log('自己为空 ，马上递归');

//         // }
//         result.forEach((item) => {
//             // 变成自动
//             isManualFlag = 1
//             mineClearFn(item, mineArr, gridList, mode)

//         })
//         // isMine = 0
//     }
//     isManualFlag = 0






//     return result









// }

// 难度配置
const MODE_CONFIG = {
    81: { cols: 9, rows: 9 },
    256: { cols: 16, rows: 16 },
    480: { cols: 30, rows: 16 }
}

export function mineClearFn(i, mineArr, gridList, mode) {
    // 拿到当前难度行列
    const { cols, rows } = MODE_CONFIG[mode]
    const totalCell = cols * rows

    // 越界直接返回
    if (i < 0 || i >= totalCell) return

    // 已打开 → 返回（你原来的逻辑）
    if (gridList.value[i].state === 1 && isManualFlag) {
        return
    }

    // 是雷 → 返回（你原来的逻辑）
    if (mineArr.value.includes(i) && isManualFlag) {
        return
    }

    // 坐标计算
    const x = i % cols
    const y = Math.floor(i / cols)

    // 8个方向
    const around = [
        { x: x - 1, y: y - 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y - 1 },
        { x: x - 1, y: y }, { x: x + 1, y: y },
        { x: x - 1, y: y + 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 }
    ]

    // 合法坐标过滤
    const valid = around.filter(item => {
        return item.x >= 0 && item.x < cols && item.y >= 0 && item.y < rows
    })

    // 转回索引
    const result = valid.map(item => item.y * cols + item.x)

    // 算雷数
    const count = result.filter(n => new Set(mineArr.value).has(n)).length

    // 打开格子
    gridList.value[i].mineNum = count
    gridList.value[i].state = 1

    // 空 → 递归
    if (count === 0) {
        isManualFlag = 1  // 你原来的：递归时自动打开
        result.forEach(item => {
            mineClearFn(item, mineArr, gridList, mode)
        })
    }

    isManualFlag = 0  // 你原来的：递归结束恢复手动
    return result
}


