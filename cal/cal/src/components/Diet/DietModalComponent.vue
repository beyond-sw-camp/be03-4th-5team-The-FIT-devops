
<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>식단 등록</h2>
      <!-- 디폴트 값 생성 -->
      <label for="mealType">식사 유형:</label>
      <select id="mealType" v-model="selectedMealType">
        <option value="아침">아침</option>
        <option value="점심">점심</option>
        <option value="저녁">저녁</option>
        <option value="간식">간식</option>
        <option value="야식">야식</option>
      </select>
      <div>
        <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">사진</label>
        <input type="file" name="image" id="image" @change="handleFileUpload" accept="image/*">
      </div>
      <div>
        <label for="comment" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">코멘트</label>
        <input type="text" name="comment" id="comment" v-model="comment" placeholder="텍스트 입력">
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
      imagePath: null,
      selectedMealType: '',
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
    handleFileUpload(event) {
      // 이미지 파일을 업로드하는 핸들러
      this.imagePath = event.target.files[0];
    },
    async submitForm() {
      try {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken},'Content-Type': 'multipart/form-data'` } : {};
        const registerData = new FormData();
        const selectedDate = this.$route.query.date;
        console.log(selectedDate);
        registerData.append("dietDate", selectedDate);
        registerData.append("category", this.category);
        registerData.append("comment", this.comment);
        registerData.append("image", this.imagePath);
        registerData.append("type", this.selectedMealType);
        await axios.post("http://localhost:8080/diet/create", registerData, { headers });
      } catch (error) {
        console.log(error);
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
}
</style>