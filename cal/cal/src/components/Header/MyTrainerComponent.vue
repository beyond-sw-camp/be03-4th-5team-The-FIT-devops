<template>
  <div class="max-w-4xl mx-auto py-10">
    <h1 class="text-4xl font-semibold text-center mb-10">나의 트레이너</h1>
    <div v-if="trainer" class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="flex items-center space-x-6 mb-4">
          <img :src="trainer.profileImage" alt="Trainer's Image" class="h-24 w-24 rounded-full object-cover">
          <div>
            <p class="text-xl font-semibold">{{ trainer.name }}</p>
            <p class="text-gray-600">{{ trainer.email }}</p>
          </div>
        </div>
        <p class="mb-2"><strong>전화번호:</strong> {{ trainer.phoneNumber }}</p>
        <p class="mb-2"><strong>성별:</strong> {{ trainer.gender}}</p>
        <p class="mb-2"><strong>키:</strong> {{ trainer.cmHeight }} cm</p>
        <p><strong>몸무게:</strong> {{ trainer.kgWeight }} kg</p>
      </div>
      <div class="px-6 py-4 border-t">
        <label for="trainerId" class="block text-sm font-medium text-gray-700">담당 트레이너 변경:</label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <select v-model="selectedTrainerId" class="flex-1 block w-full rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 min-w-0 sm:text-sm border-gray-300">
            <option value="">담당 트레이너 선택</option>
            <option v-for="trainer in trainersList" :value="trainer.id" :key="trainer.id">{{ trainer.name }}</option>
          </select>
          <button @click="updateTrainer" class="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md">수정</button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-10">
      <p>트레이너 정보를 불러오는 중입니다...</p>
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/my/trainer`, {
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/trainer/available/list`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            this.trainersList = response.data.result;
        } catch (error) {
            console.error('트레이너 목록 불러오기 실패:', error);
        }
        },
        async updateTrainer() {
        if (!this.selectedTrainerId) return;
        const confirmation = confirm('트레이너를 정말로 변경하시겠습니까?');
            if (!confirmation) return;
            try {
                const token = localStorage.getItem('token');
                await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/member/update/mytrainer/${this.selectedTrainerId}`, {
                    profileImage: this.trainer.profileImage, // 멤버의 현재 이미지 경로
                    // 추가로 멤버의 다른 정보를 업데이트하려면 여기에 추가
                }, { headers: { Authorization: `Bearer ${token}` } });
            alert('트레이너가 변경되었습니다.');
            await this.fetchTrainerInfo(); // 트레이너 정보를 다시 불러옴
        } catch (error) {
            console.error('트레이너 변경 실패:', error);
        }
    }
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
    font-size: 30px; 
  }
  
  .trainer-info p {
    margin: 10px 0;
    font-size: 18px;
    line-height: 1.6;
  }
  
  .trainer-info strong {
    font-weight: 600;
  }
  </style>