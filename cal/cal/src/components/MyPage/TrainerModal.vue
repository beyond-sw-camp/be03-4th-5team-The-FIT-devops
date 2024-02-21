<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <h3>나의 트레이너</h3>
      <div>
        <p>이름: {{ trainer.name }}</p>
        <p>이메일: {{ trainer.email }}</p>
        <!-- 추가적으로 트레이너 정보를 여기에 표시할 수 있습니다. -->
      </div>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    trainer: Object, // 단일 트레이너 객체를 받습니다.
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>