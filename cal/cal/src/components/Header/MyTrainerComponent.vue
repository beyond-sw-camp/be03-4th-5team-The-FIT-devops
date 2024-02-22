<template>
    <div class="my-trainer-component">
      <h1>나의 트레이너</h1>
      <div v-if="trainer">
        <p>이름: {{ trainer.name }}</p>
        <p>이메일: {{ trainer.email }}</p>
        <!-- 추가 정보 표시 -->
      </div>
      <div v-else>
        <p>트레이너 정보를 불러오는 중...</p>
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
      };
    },
    async mounted() {
      await this.fetchTrainerInfo();
    },
    methods: {
      async fetchTrainerInfo() {
        try {
          const token = localStorage.getItem('token'); // 인증 토큰을 localStorage에서 가져옵니다.
          const response = await axios.get('http://localhost:8080/member/my/trainer', {
            headers: {
              Authorization: `Bearer ${token}`, // 인증 헤더 설정
            },
          });
          this.trainer = response.data; // 응답 데이터를 trainer 데이터에 저장
        } catch (error) {
          console.error('트레이너 정보 불러오기 실패:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일 설정 */
  </style>