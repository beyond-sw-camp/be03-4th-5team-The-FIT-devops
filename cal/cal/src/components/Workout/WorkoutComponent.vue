<template>
    <title>Workout</title>
    <div class="w-[1440px] h-[1024px] relative overflow-hidden animated-background">
        <h2 class="workoutTitle">
            <span class="highlight">💪</span><span class="highlight">오</span>늘 <span class="highlight">운</span>동 <span
                class="highlight">완</span>료<span class="highlight">💪</span>
        </h2>
        <div class="content-wrapper">
            <div class="record">
                <table class="workout-table ml-20 justify-center text-l text-left rtl:text-right text-gray-500">
                    <thead class="text-l text-gray-700 uppercase dark:bg-gray-700">
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
                                완료 여부
                            </th>
                            <th scope="col" class="px-6 py-3">
                                운동 등록
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="workout in toTraineeWorkouts" :key="workout.id"
                            class="border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4">{{ workout.target }}</td>
                            <td class="px-6 py-4">{{ workout.name }}</td>
                            <td class="px-6 py-4">{{ workout.sets }}</td>
                            <td class="px-6 py-4">{{ workout.weight }}</td>
                            <td class="px-6 py-4">{{ workout.reps }}</td>
                            <td class="px-6 py-4">{{ workout.restTime }}</td>
                            <td class="px-6 py-4">{{ workout.performance }}</td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div :class="{ 'bg-green-500': workout.workOutStatus === 'COMPLETED', 'bg-red-500': workout.workOutStatus !== 'COMPLETED' }"
                                        class="h-2.5 w-2.5 rounded-full me-2"></div>
                                    {{ workout.workOutStatus === 'COMPLETED' ? '완료' : '미완료' }}
                                </div>
                            </td>
                            <td>
                                <button @click="openWorkoutModal(workout.id)" class="text-white font-bold py-2 px-2 rounded"
                                    :disabled="workout.workOutStatus === 'COMPLETED'" :class="{
                                        'bg-teal-500': workout.workOutStatus !== 'COMPLETED',
                                        'bg-gray-500': workout.workOutStatus === 'COMPLETED'
                                    }">
                                    운동 등록
                                </button>
                            </td>
                            <!-- Make sure to bind the selectedWorkoutId to the workoutId prop -->
                            <WorkoutModalComponent ref="workoutmodal" :workoutId="selectedWorkoutId" />
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center -ml-44 relative top-1/3">
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                            class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy">
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
            <div class="flex justify-center -ml-44 relative top-1/3">
                <button @click="openWorkoutFeedbackModal"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    피드백 등록
                </button>
                <WorkoutFeedbackModalComponent ref="workoutfeedbackmodal" />
            </div>
        </div>
    </div>
</template>
<script>
import WorkoutModalComponent from "@/components/Workout/WorkoutModalComponent.vue";
import WorkoutFeedbackModalComponent from "@/components/Workout/WorkoutFeedbackModalComponent.vue";
import axios from 'axios';

export default {
    name: 'app',
    components: {
        WorkoutModalComponent,
        WorkoutFeedbackModalComponent,
    },
    data() {
        return {
            toTraineeWorkouts: [],
            selectedWorkoutId: null,
        }
    },
    created() {
        this.loadWorkouts();
    },
    methods: {
        openWorkoutModal(workoutId) {
            this.$refs.workoutmodal[0].openModal();
            this.selectedWorkoutId = workoutId;
        },
        openWorkoutFeedbackModal() {
            this.$refs.workoutfeedbackmodal.openModal();
        },
        async loadWorkouts() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const memberEmail = urlParams.get('memberEmail');
                const date = urlParams.get('date');
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const url = `http://localhost:8080/workout/list/member?memberEmail=${memberEmail}&date=${date}`;
                const response = await axios.get(url, { headers });
                console.log(response);
                this.toTraineeWorkouts = response.data.result;
                console.log(this.toTraineeWorkouts);
            } catch (error) {
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