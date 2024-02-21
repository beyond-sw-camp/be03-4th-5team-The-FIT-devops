<template>
    <title>Workout</title>
    <div class="w-[1440px] h-[1024px] relative overflow-hidden animated-background">
        <BackgroundComponent></BackgroundComponent>
        <h2 class="workoutTitle">
            <span class="highlight">💪</span><span class="highlight">오</span>늘 <span class="highlight">운</span>동 <span
                class="highlight">완</span>료<span class="highlight">💪</span>
        </h2>
        <div class="content-wrapper">
            <div class="record">
                <table class="ml-20 justify-center text-l text-left rtl:text-right text-gray-500 ">
                    <thead class="text-l text-gray-700 uppercase dark:bg-gray-700 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                부위
                            </th>
                            <th scope="col" class="px-6 py-3">
                                운동명
                            </th>
                            <th scope="col" class="px-6 py-3">
                                세트
                            </th>
                            <th scope="col" class="px-6 py-3">
                                무게
                            </th>
                            <th scope="col" class="px-6 py-3">
                                횟수
                            </th>
                            <th scope="col" class="px-6 py-3">
                                쉬는시간
                            </th>
                            <th scope="col" class="px-6 py-3">
                                수행도
                            </th>
                            <th scope="col" class="px-6 py-3">
                                완료여부
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tbody>
                        <tr v-for="workout in toTraineeWorkouts" :key="workout.id"
                            class="border-b dark:bg-gray-800 dark:border-gray-700">
                            <!-- <td scope="row" class="px-6 py-4 text-l text-gray-900 whitespace-nowrap dark:text-white">{{ workout.bodyPart }}</td> -->
                            <td scope="row" class="px-6 py-4 text-l text-gray-900 whitespace-nowrap dark:text-white"> {{
                                workout.totalWorkOutsId }}</td>
                            <!-- <td>{{ workout.sets }}</td>
                            <td>{{ workout.weight }}</td>
                            <td>{{ workout.reps }}</td>
                            <td>{{ workout.restTime }}</td>
                            <td>{{ workout.performance }}</td>
                            <td>{{ workout.completed ? '완료' : '미완료' }}</td> -->
                        </tr>
                    </tbody>
                    <!-- <tr >
                            <td scope="row" class="px-6 py-4 text-l text-gray-900 whitespace-nowrap dark:text-white">
                                하체
                            </td>
                            <td class="px-6 py-4">
                                데드리프트
                            </td>
                            <td class="px-6 py-4">
                                5set
                            </td>
                            <td class="px-6 py-4">
                                10kg
                            </td>
                            <td class="px-6 py-4">
                                20reps
                            </td>
                            <td class="px-6 py-4">
                                30sec
                            </td>
                            <td class="px-6 py-4">
                                100%
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> 완료
                                </div>
                            </td>
                        </tr>
                        <tr class="border-b dark:bg-gray-800 ">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                어깨
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                -
                            </td>
                            <td class="px-6 py-4">
                                0%
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> 미완료
                                </div>
                            </td>
                        </tr> -->

                    </tbody>
                </table>
            </div>

            <div class="flex justify-center -ml-44 relative top-1/3">
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        <!-- <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"> -->
                        <div>트레이너 사진</div>
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">트레이너 이름</p>
                                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                            </div>
                            <p class="text-gray-400 text-sm">작성시간</p>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">
                        트레이너가 남기는 피드백
                        트레이너가 남기는 피드백
                    </p>
                    <br>
                    <p class="-mt-4 text-gray-500">
                        평점
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BackgroundComponent from '../BackgroundComponent.vue';
import axios from 'axios';

export default {
    name: 'app',
    components: {
        BackgroundComponent
    },
    created() { // 화면이 그려지면서 실행됨
        this.loadWorkouts();
    },
    data() {
        return {
            toTraineeWorkouts: [],
        }
    },

    methods: {
        async loadWorkouts() {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.get("http://localhost:8080/workout/list", { headers });
                this.toTraineeWorkouts = response.data.result;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>
* {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.workoutTitle {
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
    margin-bottom: -50px;
    letter-spacing: 15px;
    color: black;
}

.highlight {
    font-size: 80px;
    color: teal;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin: 30px 0;
}

table {
    margin-top: 100px;
    width: auto;
    min-width: 0;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

table:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

th,
td {
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