<template>
  <title>Calendar</title>
  <div class="w-[1440px] h-[1024px] relative overflow-hidden animated-background">
    <svg width="1440px" height="1024" viewBox="0 0 1044 1024" fill="none" xmlns="http://www.w3.org/2000/svg"
    class="absolute left-32 top-[204px]" preserveAspectRatio="xMidYMid meet">
      <g filter="url(#filter0_f_2_125)">
        <circle cx="436.5" cy="512.5" r="307.5" fill="url(#paint0_linear_2_125)"></circle>
      </g>
      <defs>
        <filter id="filter0_f_2_125" x="-171" y="-95" width="1215" height="1215" filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2_125"></feGaussianBlur>
        </filter>
        <linearGradient id="paint0_linear_2_125" x1="129" y1="512.5" x2="744" y2="512.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#BC96FB"></stop>
          <stop offset="1" stop-color="#ABECD6"></stop>
        </linearGradient>
      </defs>
    </svg>


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
    <div v-if="isModalVisible" class="modal jua-regular">
      <div class="modal-content">
        <span class="close" @click="isModalVisible = false">&times;</span>
        <h2>상세보기 </h2>
        <button @click="viewDietPlan">View Diet Plan</button>
        <button @click="viewWorkoutPlan">View Workout Plan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isModalVisible = ref(false);

function taskByDateClick() {
  isModalVisible.value = true;
}

function viewDietPlan() {
  console.log("diet");
}

function viewWorkoutPlan() {
  console.log("workout");

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
@import "./CalendarCSS/CalendarStyle.css"
</style>
