<template>
    <div class="my-members">
      <h2>나의 트레이니 목록</h2>
      <ul>
        <li v-for="member in members" :key="member.id">
          {{ member.name }} - {{ member.email }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        members: []
      };
    },
    async created() {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`http://localhost:8080/trainer/my/members`, { headers });
        this.members = response.data.result; // 데이터 형식에 따라 조정이 필요할 수 있음
      } catch (error) {
        console.error('트레이니 정보 불러오기 중 에러가 발생했습니다.', error);
        alert('트레이니 정보 불러오기에 실패했습니다.');
      }
    }
  };
  </script>
  
  <style>
  </style>