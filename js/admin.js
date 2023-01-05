import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.prod.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'ching';

const app = {
    // 資料
    data(){
        return{
            products: [],
            tempProduct: {}
        }
    },
    // 方法
    methods:{
        checkLogin(){
            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    this.getProducts();
                })
                .catch((error) => {
                    window.location.href = "../login.html"; // 跳轉回登入畫面
                    alert(error.response.data.message);
                })
        },
        getProducts(){
            axios.get(`${url}/api/${path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
        },
        showProductDetail(product){
            this.tempProduct = product;
        }
    },
    // 生命週期（元件開始時執行）
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 取得token
        axios.defaults.headers.common['Authorization'] = token; // 每次發出request時都帶入token驗證身份
        this.checkLogin();
    }
}

createApp(app).mount('#app');