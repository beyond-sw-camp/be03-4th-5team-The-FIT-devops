<template>
    <title>TraineeView</title>
    <div class="w-auto h-auto overflow-hidden animated-background">
    <div class="container ml-20">
            <h2 class="dietTitle">나의 트레이니 관리</h2>
                <table class="text-l text-left rtl:text-right text-gray-500">
                    <thead class="text-l text-gray-700 uppercase dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">프로필 사진</th>
                            <th scope="col" class="px-6 py-3">성함</th>
                            <th scope="col" class="px-6 py-3">성별</th>
                            <th scope="col" class="px-6 py-3">전화번호</th>
                            <th scope="col" class="px-6 py-3">이메일</th>
                            <th scope="col" class="px-6 py-3">키</th>
                            <th scope="col" class="px-6 py-3">몸무게</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="trainee in trainees" :key="trainee.id">
                            <td><img :src="trainee.profileImage" style="height: 100px; width: auto;"></td>
                            <td>{{ trainee.name }}</td>
                            <td>{{ trainee.gender }}</td>
                            <td>{{ trainee.phoneNumber }}</td>
                            <td>{{ trainee.email }}</td>
                            <td>{{ trainee.cmHeight }}</td>
                            <td>{{ trainee.kgWeight }}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            trainees: [],
        };
    },
    name: 'app',
    components: {
    },
    created() {
        this.fetchTrainees();
    },
    methods: {
        async fetchTrainees() {
            try {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
                const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
                const response = await axios.get("http://localhost:8080/trainer/my/members", { headers });
                console.log(response);
                this.trainees = response.data.result;
                console.log(this.trainees);
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style>
* {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 1024px; /* Adjust height as needed */
    overflow: hidden;
}

.dietTitle {
    margin-top: 30px;
    text-align: center;
    letter-spacing: 15px;
    font-size: 80px;
    color: teal;
}

.table-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

table {
    margin-left: auto;
    margin-right: auto;
    width: auto; /* Or specific width */
    min-width: 0;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional */
}

th, td {
    padding: 12px 15px;
    text-align: left;
}

thead {
    background-color: #f4f4f4;
    color: #333;
}

tbody tr:nth-child(odd) {
    background-color: #fff;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

.circle-gradient {
    animation: rotate 10s linear infinite;
    transform-origin: center;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
</style>
