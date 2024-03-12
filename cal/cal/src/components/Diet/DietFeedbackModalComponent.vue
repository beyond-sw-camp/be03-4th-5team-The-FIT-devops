
<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>피드백 등록</h2>
      <div>
        <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">코멘트</label>
        <input type="text" name="comment" id="comment" v-model="comment" placeholder="텍스트 입력">
      </div>
      <div>
        <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">평점</label>
        <input type="number" id="ratingInput" v-model.number="rating" min="1" max="10">
      </div>
      <button @click="submitForm">제출</button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      showModal: false,
      comment: '',
      rating: 10,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      // 모달이 닫힐 때 입력값 초기화
      this.textInput = '';
      this.imageInput = null;
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
        const urlParams = new URLSearchParams(window.location.search);
        const date = urlParams.get('date');
        const body = { feedBack: this.comment, rating: this.rating, uploadDate: date ,memberEmail : localStorage.getItem('accessEmail')};
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/diet/feedback/create`, body, { headers });
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
      this.closeModal();
    }
  }
};
</script>
  
<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  /* Ensure modal is above other content */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  /* Semi-transparent background */
}

.modal-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 300px;
  text-align: center;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}</style>