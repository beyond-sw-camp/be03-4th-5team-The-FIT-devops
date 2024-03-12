import axios from 'axios';

export default (await import('vue')).defineComponent({
name: 'MyTrainerComponent',
data() {
return {
trainer: null,
trainersList: [], // 모든 트레이너 목록
selectedTrainerId: '', // 선택된 트레이너 ID
};
},
async created() {
await this.fetchTrainerInfo();
await this.fetchAllTrainers();
},
methods: {
async fetchTrainerInfo() {
try {
const token = localStorage.getItem('token');
const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/my/trainer`, {
headers: { Authorization: `Bearer ${token}` },
});
this.trainer = response.data.result;
} catch (error) {
console.error('트레이너 정보 불러오기 실패:', error);
this.trainer = null;
}
async; fetchAllTrainers(); {
try {
const response = await axios.get('트레이너 목록을 불러오는 URL');
this.trainersList = response.data.result;
} catch (error) {
console.error('트레이너 목록 불러오기 실패:', error);
}
}
async; updateTrainer(); {
if (!this.selectedTrainerId) return;
try {
const token = localStorage.getItem('token');
await axios.post('트레이너 변경을 처리하는 URL', { newTrainerId: this.selectedTrainerId }, { headers: { Authorization: `Bearer ${token}` } });
alert('트레이너가 변경되었습니다.');
await this.fetchTrainerInfo(); // 트레이너 정보 다시 불러오기
} catch (error) {
console.error('트레이너 변경 실패:', error);
}
}
},
},
});
