<template>
    <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h3 class="modal-title">운동 할당하기</h3>
            <label for="datechoice">날짜를 선택하세요!</label>
            <div>
                <input type="date" id="datechoice" name="datechoice" min="2024-02-22" max="3000-12-31"
                    v-model="datechoice" />
            </div>
            <!-- <table class="workout-modal">
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
            </table> -->
            <button @click="doAssign" class="submit-btn">제출</button>
        </div>
    </div>
</template>
  
<style>
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
  
<script>
import axios from 'axios';

export default {
    props: ['memberId'],
    data() {
        return {
            showModal: false,
            workoutId: null, // Initialize as null or appropriate default value
            selected: {},
            datechoice: null,
        };
    },
    computed: {
        selectedWorkoutName() {
            const selectedWorkout = this.totalworkouts.find(wo => wo.id === this.workoutId);
            return selectedWorkout ? selectedWorkout.name : '';
        }
    },
    mounted() {
        this.loadTrainers();
    },
    methods: {
        async doAssign() {
            try {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
                const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
                console.log(this.datechoice);
                localStorage.setItem("date", this.datechoice);
                // const date = this.datechoice;
                // const memberEmail = localStorage.getItem("accessEmail");
                const request = {
                    memberId: localStorage.getItem("memberId"),
                    workOutDate: this.datechoice,
                };
                await axios.post("http://localhost:8080/workout_list/create", request, { headers });
                // const url = `http://localhost:8080/workout_list/getid?memberEmail=${memberEmail}&date=${date}`
                window.location.href = "/workout/assign";
            }
            catch (error) {
                console.error(error);
            }
        },
        async loadTrainers() {
            try {
                const response = await axios.get("http://localhost:8080/trainer/list");
                this.trainersList = response.data.result;
                console.log(this.trainersList);
            }
            catch (error) {
                console.log(error);
            }
        },

        // async doAssign() {
        //     const orderItems = Object.keys(this.selectedItems)
        //         .filter(key => this.selectedItems[key] === true)
        //         .map(key => {
        //             const item = this.itemList.find(i => i.id == key);
        //             return { itemId: item.id, count: item.quantity };
        //         });

        //         const token = localStorage.getItem('token');
        //         const refreshToken = localStorage.getItem('refreshToken');
        //         const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
        //     try {
        //         await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderItems, { headers });
        //         console.log(orderItems);
        //         alert("주문완료! :)");
        //         window.location.reload();
        //     }
        //     catch (error) {
        //         console.log(error);
        //         alert("주문실패! :(");
        //     }
        // },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },

    }
}
</script>
