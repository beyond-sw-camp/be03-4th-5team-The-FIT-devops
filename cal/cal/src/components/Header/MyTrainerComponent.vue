<template>
    <div class="my-trainer-component">
      <h1 class="title">나의 트레이너</h1>
      <div v-if="trainer" class="trainer-info">
        <p><strong>이름:</strong> {{ trainer.name }}</p>
        <p><strong>이메일:</strong> {{ trainer.email }}</p>
        <p><strong>전화번호:</strong> {{ trainer.phoneNumber }}</p>
        <p><strong>성별:</strong> {{ trainer.gender }}</p>
        <p><strong>키:</strong> {{ trainer.cmHeight }} cm</p>
        <p><strong>몸무게:</strong> {{ trainer.kgWeight }} kg</p>
      </div>
      <div class="trainer-change">
        <label for="trainerId" class="block mb-2 text-sm font-medium text-gray-900">담당 트레이너 변경</label>
        <select v-model="selectedTrainerId" @change="updateTrainer" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <option value="">담당 트레이너 선택</option>
          <option v-for="trainer in trainersList" :value="trainer.id" :key="trainer.id">{{ trainer.name }}</option>
        </select>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
 export default {
    name: 'MyTrainerComponent',
    data() {
        return {
        trainer: null,
        trainersList: [], // 모든 트레이너 목록
        selectedTrainerId: '', // 선택된 트레이너 ID
        };
    },
    async created() {
        await this.fetchTrainerInfo();
        await this.fetchAllTrainers();
    },
    methods: {
        async fetchTrainerInfo() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/member/my/trainer', {
            headers: { Authorization: `Bearer ${token}` },
            });
            this.trainer = response.data.result;
        } catch (error) {
            console.error('트레이너 정보 불러오기 실패:', error);
            this.trainer = null;
        }
        },
        async fetchAllTrainers() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/trainer/list', {
            headers: { Authorization: `Bearer ${token}` },
            });
            this.trainersList = response.data.result;
        } catch (error) {
            console.error('트레이너 목록 불러오기 실패:', error);
        }
        },
        async updateTrainer() {
        if (!this.selectedTrainerId) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/member/updateMyTrainer', { newTrainerId: this.selectedTrainerId }, { headers: { Authorization: `Bearer ${token}` } });
            alert('트레이너가 변경되었습니다.');
            await this.fetchTrainerInfo(); // 트레이너 정보 다시 불러오기
        } catch (error) {
            console.error('트레이너 변경 실패:', error);
        }
        },
    },
    };
  </script>
  
  <style scoped>
  .my-trainer-component {
    max-width: 600px;
    margin: 2rem auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    background-color: #fff;
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .trainer-info p {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.6;
  }
  
  .trainer-info strong {
    font-weight: 600;
  }
  </style>