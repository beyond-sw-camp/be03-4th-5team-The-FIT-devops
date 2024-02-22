<template>
    <div>
      <!-- BackgroundComponent 삭제 주석 처리됨 -->
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">회원 및 트레이너 목록</h1>

        <!-- 회원 목록 -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-2">회원 목록</h2>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">프로필</th>
                <th scope="col" class="py-3 px-6">이름</th>
                <th scope="col" class="py-3 px-6">이메일</th>
                <th scope="col" class="py-3 px-6">전화번호</th>
                <th scope="col" class="py-3 px-6">성별</th>
                <th scope="col" class="py-3 px-6">키</th>
                <th scope="col" class="py-3 px-6">몸무게</th>
                <th scope="col" class="py-3 px-6">탈퇴여부</th>
                <th scope="col" class="py-3 px-6">삭제</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in members" :key="member.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <!-- 회원 정보 -->
                <td class="py-4 px-6">
                  <img v-if="member.profileImage" :src="member.profileImage" alt="Profile image" class="w-10 h-10 rounded-full">
                </td>
                <td class="py-4 px-6">{{ member.name }}</td>
                <td class="py-4 px-6">{{ member.email }}</td>
                <td class="py-4 px-6">{{ member.phoneNumber }}</td>
                <td class="py-4 px-6">{{ member.gender }}</td>
                <td class="py-4 px-6">{{ member.cmHeight }}</td>
                <td class="py-4 px-6">{{ member.kgWeight }}</td>
                <td class="py-4 px-6">
                    <span :class="{'text-red-500': member.del_yn === 'Y', 'text-green-500': member.del_yn === 'N'}">
                      {{ member.del_yn === 'Y' ? '탈퇴한 유저' : '유저' }}
                    </span>
                  </td>
                <td class="py-4 px-6">
                  <button @click="deleteMember(member.id)" class="text-red-500 hover:text-red-700">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 트레이너 목록 -->
        <div>
          <h2 class="text-xl font-semibold mb-2">트레이너 목록</h2>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">프로필</th>
                <th scope="col" class="py-3 px-6">이름</th>
                <th scope="col" class="py-3 px-6">이메일</th>
                <th scope="col" class="py-3 px-6">전화번호</th>
                <th scope="col" class="py-3 px-6">성별</th>
                <th scope="col" class="py-3 px-6">키</th>
                <th scope="col" class="py-3 px-6">몸무게</th>
                <th scope="col" class="py-3 px-6">탈퇴여부</th>
                <th scope="col" class="py-3 px-6">삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trainer in trainers" :key="trainer.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <!-- 트레이너 정보 -->
                <td class="py-4 px-6">
                  <img v-if="trainer.profileImage" :src="trainer.profileImage" alt="Profile image" class="w-10 h-10 rounded-full">
                </td>
                <td class="py-4 px-6">{{ trainer.name }}</td>
                <td class="py-4 px-6">{{ trainer.email }}</td>
                <td class="py-4 px-6">{{ trainer.phoneNumber }}</td>
                <td class="py-4 px-6">{{ trainer.gender }}</td>
                <td class="py-4 px-6">{{ trainer.cmHeight }}</td>
                <td class="py-4 px-6">{{ trainer.kgWeight }}</td>
                <td class="py-4 px-6">
                    <span :class="{'text-red-500': trainer.del_yn === 'Y', 'text-green-500': trainer.del_yn === 'N'}">
                      {{ trainer.del_yn === 'Y' ? '탈퇴한 유저' : '유저' }}
                    </span>
                  </td>
                <td class="py-4 px-6">
                  <button @click="deleteTrainer(trainer.id)" class="text-red-500 hover:text-red-700">삭제</button>
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
    name: 'UserComponent',
    data() {
      return {
        members: [],
        trainers: [],
      };
    },
    async created() {
      await this.fetchUserInfo();
    },
    methods: {
      async fetchUserInfo() {
        await Promise.all([this.fetchMembers(), this.fetchTrainers()]);
      },
  
      async fetchMembers() {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
          const response = await axios.get('http://localhost:8080/member/list', { headers });
          // del_yn이 'Y'가 아닌 회원만 필터링하여 할당
          this.members = response.data.result ? response.data.result.filter(member => member.del_yn !== 'Y') : [];
        } catch (error) {
          console.error('Error fetching members:', error);
          this.members = [];
        }
      },
  
      async fetchTrainers() {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
          const response = await axios.get('http://localhost:8080/trainer/list', { headers });
          // del_yn이 'Y'가 아닌 트레이너만 필터링하여 할당
          this.trainers = response.data.result ? response.data.result.filter(trainer => trainer.del_yn !== 'Y') : [];
        } catch (error) {
          console.error('Error fetching trainers:', error);
          this.trainers = [];
        }
      },
  
      async deleteMember(memberId) {
        if (confirm('정말로 회원을 삭제하시겠습니까?')) {
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          try {
            await axios.delete(`http://localhost:8080/member/delete/${memberId}`, { headers });
            alert('회원이 삭제되었습니다.');
            this.$router.go(); // 현재 페이지를 새로고침하여 목록을 업데이트
          } catch (error) {
            console.error('회원 삭제 중 오류가 발생했습니다.', error);
          }
        }
      },
  
      async deleteTrainer(trainerId) {
        if (confirm('정말로 트레이너를 삭제하시겠습니까?')) {
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          try {
            await axios.delete(`http://localhost:8080/trainer/delete/${trainerId}`, { headers });
            alert('트레이너가 삭제되었습니다.');
            this.$router.go(); // 현재 페이지를 새로고침하여 목록을 업데이트
          } catch (error) {
            console.error('트레이너 삭제 중 오류가 발생했습니다.', error);
          }
        }
      },
    },
  };
  </script>