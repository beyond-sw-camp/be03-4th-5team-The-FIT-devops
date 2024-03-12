import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/components/Home/HomeComponent.vue";
import CalendarComponent from "@/components/Calendar/CalendarComponent.vue";
import LoginComponent from "@/components/Login/LoginComponent.vue";
import TrainerSignupComponent from "@/components/Signup/TrainerSignupComponent.vue";
import MemberSignupComponent from "@/components/Signup/MemberSignupComponent.vue";
import WorkoutComponent from "@/components/Workout/WorkoutComponent.vue";
import DietComponent from "@/components/Diet/DietComponent.vue";
import SignupRoleComponent from "@/components/Signup/SignupRole.vue";
import LoginSuccessComponent from "@/components/Login/LoginSuccessComponent.vue";
import OAuthSigupComponent from "@/components/Signup/OAuthSigupComponent.vue";
import MyPageComponent from '@/components/MyPage/MyPageComponent.vue';
import MyPageTrainerComponent from '@/components/MyPage/MyPageTrainerComponent.vue';
import TraineeViewComponent from '@/components/Trainees/TraineeViewComponent.vue';

import UserComponent from '@/components/Admin/UserComponent.vue';
import MyTrainerComponent from '../components/Header/MyTrainerComponent.vue';
import WorkoutAssignComponent from "@/components/Workout/WorkoutAssignComponent.vue";
import WorkoutsComponent from "@/components/Admin/WorkoutsComponent.vue";


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
    path: "/signupRole",
    name: "SignupRole",
    component: SignupRoleComponent,
  },
  {
    path: "/signupTrainer",
    name: "TrainerSignupComponent",
    component: TrainerSignupComponent,
  },
  {
    path: "/signupMember",
    name: "MemberSignupComponent",
    component: MemberSignupComponent,
  },

  {
    path: "/workout",
    name: "workout",
    component: WorkoutComponent, // Your workout component
    props: (route) => ({
      date: route.query.date,
      memberId: route.query.memberId,
    }),
  },
  {
    path: "/workout/assign",
    name: "WorkoutAssignComponent",
    component: WorkoutAssignComponent,
  },
  

  // {
  //   path: "/workout",
  //   name: "WorkoutComponent",
  //   component: WorkoutComponent,
  // },

  {
    path: "/diet",
    name: "DietComponent",
    component: DietComponent,
  },
  {
    path: "/loginSuccess",
    name: "LoginSuccessComponent",
    component: LoginSuccessComponent,
  },
  {
    path: "/signupoauth",
    name: "OAuthSigupComponent",
    component: OAuthSigupComponent,
  },
  
  {
    path: '/member/mypage',
    name: 'MyPageComponent',
    component : MyPageComponent,
    props: true,
  },
  {
    path: '/trainer/mypage',
    name: 'MyPageTrainerComponent',
    component : MyPageTrainerComponent,
    props: true,
  },
  {
    path: '/users',
    name: 'Users',
    component: UserComponent,
  },
  {
    path: '/totalworkouts',
    name: 'TotalWorkouts',
    component: WorkoutsComponent,
  },
  {
    path: '/trainer/mytrainees',
    name: 'TraineeViewComponent',
    component: TraineeViewComponent
  },
  {
    path: '/member/mytrainer',
    name: 'MyTrainerComponent',
    component: MyTrainerComponent,
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
