<template>
  <div  v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
        <div class="flex gap-4">
          <img :src="trainerInfo.profileImage" class="rounded-lg h-20 w-20" alt="Trainer Image" loading="lazy">
          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
              <p class="text-xl whitespace-nowrap truncate overflow-hidden">{{ trainerInfo.name }}</p>
              <a href="#" class="text-gray-500 text-xl"><i class="fa-solid fa-trash"></i></a>
            </div>
            <p class="text-gray-400 text-sm">{{ feedback.uploadDate }}</p>
          </div>
        </div>
      </div>
      <div class="border-t pt-4 mt-4">
        <p class="text-gray-500 mt-2">
          {{ feedback.feedBack ? feedback.feedBack : '아직 피드백을 작성하지 않았네요!' }}
        </p>
        <p class="text-gray-500 mt-2">
          {{ feedback.rating ? feedback.rating : 0 }} / 10 점
        </p>
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
z-index: 1000; /* Ensure modal is above other content */
left: 0;
top: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
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