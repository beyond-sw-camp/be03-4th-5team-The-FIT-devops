<template>
    <div class="relative w-full h-screen bg-gradient-to-r from-purple-300 to-blue-300">
        <BackgroundComponent></BackgroundComponent>

        <section class="relative flex items-center justify-center h-full">
            <div class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    로그인
                </h1>

                <form class="space-y-4 md:space-y-6" @submit.prevent="doLogin">
                    <div class="form-group">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                        <input v-model="email" type="email" name="email" id="email" class="form-control bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="이메일을 입력하세요!" required="">
                    </div>

                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                            class="form-control bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>

                    <button type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">로그인 하기</button>

                </form>
            </div>
        </section>
    </div>
</template>

<script>
import BackgroundComponent from '../BackgroundComponent.vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default {
    name: 'app',
    components: {
        BackgroundComponent
    },
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async doLogin() {
            try {
                const loginData = { email: this.email, password: this.password };
                const response = await axios.post("http://localhost:8080/member/doLogin", loginData);
                const token = response.data.result.token;
                if (token) {
                    const decoded = jwtDecode(token);
                    localStorage.setItem("token", token);
                    localStorage.setItem("role", decoded.role);
                    alert("환영합니다, " + decoded.sub + " 회원님!");
                    window.location.href = "/";
                }
                else {
                    console.log("200 ok but not a valid token");
                    alert("Login failed!");
                }
            }
            catch (error) {
                const error_message = error.response.data.error_message;
                if (error_message) {
                    console.log(error_message);
                    alert(error_message);
                }
                else {
                    console.log(error);
                    alert("Login failed!");
                }
            }
        }
    },

}
</script>
