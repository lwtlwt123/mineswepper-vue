// import './assets/main.css'
import './assets/style/reset.css'
// 1. 引入 Element Plus
import ElementPlus from 'element-plus'
// 2. 必须引入它的样式文件！
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
const app = createApp(App)
app.use(ElementPlus) // 去掉这行的注释！
app.mount('#app')


if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', () => {
        window.location.reload()
    })
}
