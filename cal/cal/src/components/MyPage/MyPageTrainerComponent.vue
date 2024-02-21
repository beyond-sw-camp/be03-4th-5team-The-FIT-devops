<template>
    <div class="relative w-full h-screen bg-gradient-to-r from-purple-300 to-blue-300 overflow-hidden">
        <BackgroundComponent></BackgroundComponent>
        <section class="relative flex items-center justify-center h-full">
            <div class="w-full max-w-md px-6 py-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    내 정보
                </h1>
                <div class="overflow-auto max-h-[calc(100vh-200px)]">
                    <div class="space-y-4 md:space-y-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">구분</label>
                            <div class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ role }}</div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">성함</label>
                            <div class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ name }}</div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                            <div class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ email }}</div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">전화번호</label>
                            <div class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">{{ phoneNumber }}</div>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">키</label>
                            <input type="number" v-model="cmHeight" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" :disabled="!isEditing">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">몸무게</label>
                            <input type="number" v-model="kgWeight" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" :disabled="!isEditing">
                        </div>
                        <button @click="viewMemberInfo" class="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            나의 트레이니 보기
                        </button>
                    </div>
                    <button @click="toggleEdit" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {{ isEditing ? '취소' : '수정' }}
                    </button>
                    <button v-if="isEditing" @click="updateMemberInfo" class="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        저장
                    </button>
                </div>
            </div>
        </section>
    </div>
    <MemberListModal :isVisible="isModalVisible" :members="members" @close="isModalVisible = false"/>
    </template>
    
    <script>
import BackgroundComponent from '../BackgroundComponent.vue';
import MemberListModal from './MemberListModal.vue';
import axios from 'axios';
export default {
    name: 'MyPageTrainerComponent',
    components: {
        BackgroundComponent,
        MemberListModal
    },
    data(){
        return{
            member: {},
            id: null,
            trainerId: null,
            name: null,
            email: null,
            cmHeight: null,
            kgWeight: null,
            gender: null,
            role: null,
            profileImage: null,
            phoneNumber: null,
            isEditing: false,
            isModalVisible: false,
            members: [],
        }
    },
    created(){
        this.fetchMember();
    },
    methods:{
        async fetchMember(){
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            const headers = token ? { Authorization: `Bearer ${token}`, refreshToken: `${refreshToken}` } : {};
            const response = await axios.get(`http://localhost:8080/trainer/myInfo`, { headers });
            this.trainer = response.data.result;
            this.id = this.trainer.id;
            this.memberId = this.member.memberId;
            this.name = this.trainer.name;
            this.email = this.trainer.email;
            this.cmHeight = this.trainer.cmHeight;
            this.kgWeight = this.trainer.kgWeight;
            this.gender = this.trainer.gender;
            this.role = this.trainer.role;
            this.profileImage = this.trainer.profileImage;
            this.phoneNumber = this.trainer.phoneNumber;
        },
        async viewMemberInfo() {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.get(`http://localhost:8080/member/list`, { headers });
                this.members = response.data; // 회원 목록 데이터 설정
                this.isModalVisible = true; // 모달 표시
            } catch (error) {
                console.error('회원 정보 불러오기 중 에러가 발생했습니다.', error);
                alert('회원 정보 불러오기에 실패했습니다.');
            }
        },
        async updateMemberInfo() {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.patch(`http://localhost:8080/trainer/update/${this.id}`, {
                    name: this.name,
                    email: this.email, 
                    phoneNumber: this.phoneNumber,
                    gender: this.gender, 
                    role: this.role, 
                    profileImage: this.profileImage, 
                    trainerId: this.trainerId,
                    cmHeight: this.cmHeight,
                    kgWeight: this.kgWeight
                }, { headers });
                console.log(response.data);
                alert('정보가 성공적으로 업데이트되었습니다.');
                this.isEditing = false;
            } catch (error) {
                console.error('정보 업데이트 중 에러가 발생했습니다.', error);
                alert('정보 업데이트에 실패했습니다.');
                window.location.reload();
            }
        },
        toggleEdit() {
            this.isEditing = !this.isEditing;
        }
    }
}
</script>