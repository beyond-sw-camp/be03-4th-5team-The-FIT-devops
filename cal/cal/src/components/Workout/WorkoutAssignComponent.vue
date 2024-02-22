<template>
    <div class="w-auto h-auto overflow-hidden animated-background">
        <div class="container ml-20">
            <h2 class="assignTitle">🏋🏻 운동 할당하기 🏋🏻‍♀️</h2>
            <table class="workout-modal">
                <thead>
                    <tr>
                        <th>부위</th>
                        <th>운동명</th>
                        <th>선택</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="wo in totalworkouts" :key="wo.id">
                        <td>{{ wo.target }}</td>
                        <td>{{ wo.name }}</td>
                        <td><input type="checkbox" v-model="selected[wo.id]" /></td>
                    </tr>
                </tbody>
            </table>
            <button class="submit-btn" @click="submitWorkouts">할당하기</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            totalworkouts: [],
            selected: {}, // Object to track selected workouts
            workoutlistId: null,
        };
    },
    created() {
        this.loadWorkouts();
    },
    methods: {
        async loadWorkouts() {
            try {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
                const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
                const response = await axios.get("http://localhost:8080/totalworkouts/list", { headers });
                this.totalworkouts = response.data.result;
            } catch (error) {
                console.error('Failed to load workouts:', error);
                this.totalworkouts = []; // Reset to empty array on error
            }
        }, async submitWorkouts() {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};

            const memberEmail = localStorage.getItem("accessEmail");
            const date = localStorage.getItem("date");

            const url = `http://localhost:8080/workout_list/getid?memberEmail=${memberEmail}&date=${date}`
            const response = await axios.get(url, { headers });
            this.workoutlistId = response.data.result;
            console.log("please = "+ this.workoutlistId);
            const selectedWorkoutIds = Object.keys(this.selected).filter(key => this.selected[key]);
            for (let id of selectedWorkoutIds) {
                const workoutData = {
                    workOutListId: this.workoutlistId,
                    totalWorkOutsId: id,
                    sets: 0,
                    weight: 0,
                    reps: 0,
                    restTime: 0,
                    performance: 0,
                    workOutStatus: "INCOMPLETED",
                };
                try {
                    await axios.post("http://localhost:8080/workout/create", workoutData, { headers });
                    console.log(`Workout ${id} assigned successfully.`);
                } catch (error) {
                    console.error(`Failed to assign workout ${id}:`, error);
                }
            }
            alert("Selected workouts assigned successfully.");
        },
    },
}
</script>
  

<style>
.assignTitle {
    margin-top: 30px;
    text-align: center;
    letter-spacing: 15px;
    font-size: 80px;
    color: teal;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
}

.workout-modal {
    margin-top: 10px;
    margin-bottom: 10px;
}

.close {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-title {
    margin-top: 0;
    color: black;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-btn {
    width: 20%;
    padding: 10px;
    background-color: lightgrey;
    border-radius: 5px;
    cursor: pointer;
}

#datechoice {
    margin: 30px;
    background-color: lightgrey;
    padding: 50px;
    border-radius: 10px;
}
</style>