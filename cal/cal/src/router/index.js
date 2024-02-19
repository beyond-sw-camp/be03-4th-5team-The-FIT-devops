import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/components/Home/HomeComponent.vue";
import CalendarComponent from "@/components/Calendar/CalendarComponent.vue";
import LoginComponent from "@/components/Login/LoginComponent.vue";
import SignupComponent from "@/components/Signup/SignupComponent.vue";
import WorkoutComponent from "@/components/Workout/WorkoutComponent.vue";
import DietComponent from "@/components/Diet/DietComponent.vue";

const routes = [
  {
    // URL 경로 지정
    path: "/",
    // 이 라우터의 이름
    name: "HOME",
    component: HomeComponent,
  },
  {
    path: "/calendar",
    name: "CalendarComponent",
    component: CalendarComponent,
  },
  {
    path: "/login",
    name: "LoginComponent",
    component: LoginComponent,
  },
  {
    path: "/signup",
    name: "SignupComponent",
    component: SignupComponent,
  },
  {
    path: "/workout",
    name: "WorkoutComponent",
    component: WorkoutComponent,
  },
  {
    path: "/diet",
    name: "DietComponent",
    component: DietComponent,
  },
];
const router = createRouter({
  // vue-router는 내부적으로 두 가지 방식의 history 관리를 제공한다
  // 1) createWebHistory -> 빈번하게 사용
  // 2) createHashHistory
  history: createWebHistory(),
  routes,
});
export default router;
