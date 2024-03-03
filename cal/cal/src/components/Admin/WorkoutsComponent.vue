<template>
  <div>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">운동 목록</h1>
      <div class="mb-4">
        <label for="workoutName" class="block mb-2 text-sm font-medium text-gray-900">운동명</label>
        <input type="text" id="workoutName" v-model="newWorkout.name" placeholder="운동명을 입력하세요" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>

        <label for="workoutTarget" class="block mt-4 mb-2 text-sm font-medium text-gray-900">부위</label>
        <input type="text" id="workoutTarget" v-model="newWorkout.target" placeholder="부위를 입력하세요" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>

        <button @click="addWorkout" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">등록</button>
      </div>
      <div class="mb-8">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">운동명</th>
              <th scope="col" class="py-3 px-6">부위</th>
              <th scope="col" class="py-3 px-6">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="work in totalworkouts" :key="work.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="py-4 px-6">{{ work.name }}</td>
              <td class="py-4 px-6">{{ work.target }}</td>
              <td class="py-4 px-6">
                <button @click="deleteWorkout(work.id)" class="text-red-500 hover:text-red-700">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WorkoutAddComponent',
  data() {
    return {
      totalworkouts: [],
      newWorkout: {
        id: '',
        name: null,
        target: null
      },
    };
  },
  async created() {
    await this.fetchMembers();
  },
  methods: {
    getCurrentUserId() {
      return localStorage.getItem('userId');
    },
    async fetchMembers() {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
      try {
        const response = await axios.get('http://localhost:8080/totalworkouts/list', { headers });
        console.log(response.data.result)
        this.totalworkouts = response.data.result ? response.data.result.filter(totalworkout => totalworkout.delYn !== 'Y') : [];
      } catch (error) {
        console.error('Error fetching members:', error);
        this.totalworkouts = [];
      }
    },
    async deleteWorkout(workoutId) {
      if (confirm('정말로 해당 운동을 삭제하시겠습니까?')) {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
        try {
          await axios.delete(`http://localhost:8080/totalworkouts/delete/${workoutId}`, { headers });
          alert('해당 운동이 삭제되었습니다.');
          this.$router.go();
        } catch (error) {
          console.error('운동 삭제 중 오류가 발생했습니다.', error);
        }
      }
    },
    async addWorkout() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        await axios.post('http://localhost:8080/totalworkouts/create/', this.newWorkout, { headers });
        alert('운동이 성공적으로 등록되었습니다.');
        location.reload();
      } catch (error) {
        alert(error.response.data.message);
        console.error('운동 등록 중 오류 발생:', error);
      }
    }
  },
};
</script>