<template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="modal-header">
        <img :src="trainerInfo.profileImage" class="rounded-lg h-24 w-24 mx-auto" alt="Trainer Image">
        <h3 class="modal-title"><span class="trainer-prefix">트레이너 : </span> {{ trainerInfo.name }}</h3>
        <p class="upload-date">{{ feedback.uploadDate }}</p>
      </div>
      <div class="modal-body">
        <p class="feedback-content">{{ feedback.feedBack || '아직 피드백을 작성하지 않았네요!' }}</p>
        <div class="rating">평점: {{ feedback.rating || 0 }} / 10</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['feedback', 'trainerInfo'],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
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
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 500px;
  text-align: center;
}

.modal-header h3 {
  margin-top: 20px;
  font-size: 1.75rem;
  font-weight: 600;
}

.upload-date {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 20px;
}

.feedback-content {
  margin-top: 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.rating {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.25rem;
  color: #4a90e2;
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