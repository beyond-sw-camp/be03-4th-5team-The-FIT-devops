<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modalTitle">운동 등록</h2>
      <div>
        <label for="sets">세트</label>
        <br>
        <input type="number" id="sets" v-model="sets" placeholder="세트 수">
      </div>
      <div>
        <label for="weight">무게</label>
        <br>
        <input type="number" id="weight" v-model="weight" placeholder="(kg)">
      </div>
      <div>
        <label for="reps">횟수</label>
        <br>
        <input type="number" id="reps" v-model="reps" placeholder="횟수">
      </div>
      <div>
        <label for="restTime">쉬는시간</label>
        <br>
        <input type="text" id="restTime" v-model="restTime" placeholder="(초)">
      </div>
      <div>
        <label for="performance">수행도</label>
        <br>
        <input type="text" id="performance" v-model="performance" placeholder="(%)">
      </div>
      <button @click="submitForm">제출</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['workoutId'],
  data() {
    return {
      showModal: false,
      sets: '',
      weight: '',
      reps: '',
      restTime: '',
      performance: '',
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      console.log(this.workoutId)
    },
    closeModal() {
      this.showModal = false;
      this.sets = '';
      this.weight = '';
      this.reps = '';
      this.restTime = '';
      this.performance = '';
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : {};
        const workoutData = {
          sets: this.sets,
          weight: this.weight,
          reps: this.reps,
          restTime: this.restTime,
          performance: this.performance,
          workOutStatus: "COMPLETED",
        };
        await axios.patch(`http://localhost:8080/workout/update/${this.workoutId}`, workoutData, { headers });
        this.closeModal();
        this.$emit('workoutUpdated');
        window.location.href=window.location.search;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
label{
  color: black;
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 300px;
  text-align: center;
}

.close {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.close:hover {
  color: #000;
}
</style>