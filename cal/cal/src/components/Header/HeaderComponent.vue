<template>
  <header v-if="isLogin" class="header">
    <div class="header-content">
      <div class="header-buttons-left">
        <button class="header-button" @click="goToCalendar" v-if="userRole === 'MEMBER'">캘린더</button>
        <button @click="goToMyTrainer" class="header-button" v-if="userRole === 'MEMBER'">나의 트레이너 보기</button>
        <button @click="openFeedtModal">
            <font-awesome-layers full-width class="fa-3x">
              <font-awesome-icon icon="fa-solid fa-bell" style="cursor: pointer; color: #BC96FB; font-size: 24px;" />
              <font-awesome-layers-text id="alarm" counter :value="memberAction" position="top-right" v-if="memberAction != 0 && userRole==='TRAINER'" />
              <font-awesome-layers-text id="alarm" counter :value="myFeedBack" position="top-right" v-if="myFeedBack != 0 && userRole==='MEMBER'" />
            </font-awesome-layers>
        </button>
        <button @click="viewMemberInfo" class="header-button" v-if="userRole === 'TRAINER'">나의 트레이니 관리</button>
        <button @click="userInfo" class="header-button" v-if="userRole === 'ADMIN'">전체 회원 관리</button>
        <button @click="totalworkoutsInfo" class="header-button" v-if="userRole === 'ADMIN'">운동 목록 관리</button>
      </div>

      <h1 class="header-title cursor-pointer" @click="goHome">THE FIT</h1>

      <div class="header-buttons-right">
        <button class="header-button" @click="goToMyInfo" v-if="userRole !== 'ADMIN'">내정보</button>
        <button class="header-button" @click="logout">로그아웃</button>
      </div>
    </div>
  </header>
  <ModalComponent ref="modal" :feedback="feedback" :actions="actions" @clearFeedback="clearFeedbackHandler" @clearAction="clearAction"/>
  <TrainerModal :isVisible="isModalVisible" :trainer="trainer" @close="closeModal" />
  <MemberListModal :isVisible="isModalVisible" :members="members" @close="isModalVisible = false" />
</template>
  
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TrainerModal from './TrainerModal.vue';
import MemberListModal from './MemberListModal.vue';
import axios from 'axios'; // Axios import 추가
import {EventSourcePolyfill } from 'event-source-polyfill';
import ModalComponent from './MyfeedModalComponent.vue';

export default {
  name: 'HeaderComponents',
  components: {
    TrainerModal,
    MemberListModal,
    ModalComponent,
  },
  data(){
    return{
      myFeedBack : 0,
      memberAction: 0,
      actions:[],
      isToggleDropdown: false,
      feedback:[],
    }
  },
  async created() {
    if(localStorage.getItem('token') != null){
      const token = localStorage.getItem('token');
      var sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/connect`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    sse.addEventListener('connect', (e) => {
    const { data: receivedConnectData } = e;
    console.log('connect event data: ',receivedConnectData);  // "connected!"
    });
      sse.addEventListener('sendToMember', e => { 
        const obj = JSON.parse(e.data);
        this.myFeedBack = this.myFeedBack+1;
        this.feedback.push(obj) 
        console.log(this.feedback[0].type); 
    });
      sse.addEventListener('sendToTrainer', e => { 
        const obj = JSON.parse(e.data);
        this.memberAction = this.memberAction+1;
        this.actions.push(obj) 
        console.log(this.actions[0].type); 
        console.log(this.memberAction);
        });
    }
  },
  methods:{
    openFeedtModal() {
      this.$refs.modal.openModal();
      this.myFeedBack = 0;
      this.memberAction = 0;
   },
   clearFeedbackHandler(){
      this.feedback = [];
   },
   clearAction(){
      this.actions =[];
   }
  },
  setup() {
    const router = useRouter();
    const isLogin = ref(!!localStorage.getItem("token"));
    const userRole = ref(localStorage.getItem("role"));
    const isModalVisible = ref(false);
    const trainers = ref([]);
    const members = ref([]); 

    function goToCalendar() {
      router.push({ name: 'CalendarComponent' });
    }
    function goToMyTrainer() {
    router.push({ name: 'MyTrainerComponent' });
    }

    function goToMyInfo() {
      if (userRole.value === 'TRAINER') {
        router.push({ name: 'MyPageTrainerComponent' });
      } else if (userRole.value === 'MEMBER') {
        router.push({ name: 'MyPageComponent' });
      }
    }

      function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessEmail");
      isLogin.value = false;
      userRole.value = null;
      window.location.href="/";
    }
          
    function goHome() {
      router.push('/');
      }

      function userInfo() {
      router.push({ name: 'Users' });
      }

      function totalworkoutsInfo() {
      router.push({ name: 'TotalWorkouts' });
      }

    function viewMemberInfo() {
      router.push({ name: 'TraineeViewComponent' });
    }

    async function viewTrainerInfo() {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/my/trainer`, { headers });
        trainers.value = response.data.result; // 'trainers' 상태를 직접 업데이트
        isModalVisible.value = true; // 모달 표시
      } catch (error) {
        console.error('트레이너 정보 불러오기 중 에러가 발생했습니다.', error);
        alert('트레이너 정보 불러오기에 실패했습니다.');
      }
    }

    function closeModal() {
      isModalVisible.value = false; // 모달 닫기
    }

    return {
      goToCalendar,
      goToMyTrainer,
      goToMyInfo,
      logout,
      viewTrainerInfo,
      viewMemberInfo,
      userInfo,
      totalworkoutsInfo,
      closeModal,
      goHome,
      isLogin,
      userRole,
      isModalVisible,
      trainers,
      members,

    };
  },
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.header-title {
  color: #BC96FB;
  font-size: 36px;
  /* Increased size for prominence */
  font-weight: bold;
  /* Bolder font weight */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  /* Soft shadow for depth */
}

.header-button {
  background-color: #BC96FB;
  /* Primary button color */
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.header-button:hover {
  background-color: #A17FE0;
  /* Darker shade on hover */
  transform: translateY(-2px);
  /* Slight lift effect */
}

.header-buttons-left,
.header-buttons-right {
  display: flex;
}
</style>
  