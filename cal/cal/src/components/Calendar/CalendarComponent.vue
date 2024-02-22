<template>
  <title>Calendar</title>
  <div :class="{ 'blur-bg': isModalVisible }" class="app-container">
    <div class="w-[1440px] h-[1024px] relative overflow-hidden animated-background">
      <BackgroundComponent></BackgroundComponent>
      <div class="flex-container">
        <div class="calendar-container jua-regular">
          <div class="navigation">
            <button @click="changeMonth(-1)">← Prev</button>
            <h2>{{ currentMonthName }} {{ currentYear }}</h2>
            <button @click="changeMonth(1)">Next →</button>
          </div>
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>
          <div class="dates-grid">
            <div v-for="date in daysInMonth" :key="date.fullDate" class="date"
              :class="{ 'not-current-month': !date.isCurrentMonth }" @click="() => taskByDateClick(date)">
              <div v-for="(task, index) in date.tasks" :key="index" class="task" :style="{ backgroundColor: task.color }">
              </div>
              <span class="date-number">{{ date.day }}</span>
            </div>
          </div>
        </div>
        <div v-if="isModalVisible" class="modal jua-regular" @click.self="isModalVisible = false">
          <div class="modal-content">
            <h1>{{ selectedDateDetails }}</h1>
            <h2 class="modal-title">상세 보기</h2>
            <div class="button-container">
              <a @click="navigateToDiet" class="modal-button">식단</a>
              <a @click="navigateToWorkout" class="modal-button">운동</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
    BackgroundComponent
  },
  props: ['date', 'apiUrl'],
}
</script>
<script setup>
import { ref, computed } from 'vue';
import BackgroundComponent from '../BackgroundComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter(); // Use Vue Router's useRouter hook
const isModalVisible = ref(false);
const selectedDateDetails = ref('');
const selectedDate = ref('');

function taskByDateClick(date) {
  const dateObj = new Date(date.fullDate);
  const dayOfWeek = dateObj.toLocaleString('default', { weekday: 'long' });
  selectedDateDetails.value = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} ${dayOfWeek}`;
  selectedDate.value = dateObj.toISOString().split('T')[0];
  isModalVisible.value = true;

  const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  selectedDate.value = formattedDate; // Store the formatted date
}

function navigateToWorkout() {
  const memberEmail = localStorage.getItem('accessEmail');
  if (memberEmail && selectedDate.value) {
    router.push(`/workout?memberEmail=${memberEmail}&date=${selectedDate.value}`);
  } else {
    console.error('Workout - 이메일 혹은 날짜를 찾을 수 없어요!');
  }
}

function navigateToDiet() {
  const memberEmail = localStorage.getItem('accessEmail');
  if (memberEmail && selectedDate.value) {
    router.push(`/diet?memberEmail=${memberEmail}&date=${selectedDate.value}`);
  } else {
    console.error('Diet - 이메일 혹은 날짜를 찾을 수 없어요!');

  }
}

const now = new Date();
let viewMonth = ref(now.getMonth());
let viewYear = ref(now.getFullYear());

const tasks = ref([
  {
    date: '2024-02-16', tasks: [{ color: 'lightpink' },
    { color: 'lightgreen' }]
  },
  {
    date: '2024-02-17', tasks: [{ color: 'lightpink' }]
  },
]);

const changeMonth = (num) => {
  viewMonth.value += num;
  if (viewMonth.value > 11) {
    viewMonth.value = 0;
    viewYear.value++;
  } else if (viewMonth.value < 0) {
    viewMonth.value = 11;
    viewYear.value--;
  }
};

const daysInMonth = computed(() => {
  const dates = [];
  const firstDayOfMonth = new Date(viewYear.value, viewMonth.value, 1);
  const lastDayOfMonth = new Date(viewYear.value, viewMonth.value + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const endDayOfWeek = lastDayOfMonth.getDay();

  // Days from the previous month
  for (let i = startDayOfWeek; i > 0; i--) {
    const day = new Date(firstDayOfMonth);
    day.setDate(day.getDate() - i);
    addDate(day, dates, false); // false indicates not the current month
  }

  // Days of the current month
  for (let d = new Date(firstDayOfMonth); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
    addDate(new Date(d), dates, true); // true indicates the current month
  }

  // Days from the next month
  if (endDayOfWeek < 6) {
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
      const day = new Date(lastDayOfMonth);
      day.setDate(day.getDate() + i);
      addDate(day, dates, false); // false indicates not the current month
    }
  }
  return dates;
});

// Helper function to add a date to the dates array
function addDate(day, dates, isCurrentMonth) {
  // Format the date as YYYY-MM-DD for correct comparison
  const dayStr = day.getFullYear() + '-' +
    String(day.getMonth() + 1).padStart(2, '0') + '-' +
    String(day.getDate()).padStart(2, '0');
  const taskForDate = tasks.value.find(task => task.date === dayStr);
  dates.push({
    day: day.getDate(),
    fullDate: dayStr,
    isPast: day < now && day.toDateString() !== now.toDateString(),
    isToday: day.toDateString() === now.toDateString(),
    tasks: taskForDate ? taskForDate.tasks : [],
    isCurrentMonth
  });
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentMonthName = computed(() => new Date(viewYear.value, viewMonth.value).toLocaleString('default', { month: 'long' }));
const currentYear = computed(() => viewYear.value);

</script>

<style scoped>
@import "./CalendarStyle.css"
</style>
