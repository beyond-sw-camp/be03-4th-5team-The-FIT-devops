<template>
    <title>Diet</title>
    <div class="w-[1440px] h-[1024px] relative overflow-hidden animated-background">
        <BackgroundComponent></BackgroundComponent>
        <h2 class="dietTitle">
            오늘의 식단
        </h2>
        <div class="content-wrapper">
            <div class="record">
                <table class="ml-20 justify-center text-l text-left rtl:text-right text-gray-500 ">
                    <thead class="text-l text-gray-700 uppercase dark:bg-gray-700 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                분류
                            </th>
                            <th scope="col" class="px-6 py-3">
                                사진
                            </th>
                            <th scope="col" class="px-6 py-3">
                                상세설명
                            </th>
                            <th scope="col" class="px-6 py-3">
                                업로드 시간
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bborder-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" class="px-6 py-4 text-l text-gray-900 whitespace-nowrap dark:text-white">
                                아침
                            </td>
                            <td class="px-6 py-4">
                                사진들어갈자리
                            </td>
                            <td class="px-6 py-4">
                                오버나이트오트밀
                            </td>
                            <td class="px-6 py-4">
                                {{ new Date() }}
                            </td>
                        </tr>
                        <tr class="bborder-b dark:bg-gray-800 dark:border-gray-700">
                            <td scope="row" class="px-6 py-4 text-l text-gray-900 whitespace-nowrap dark:text-white">
                                저녁
                            </td>
                            <td class="px-6 py-4">
                                사진들어갈자리
                            </td>
                            <td class="px-6 py-4">
                                족발
                            </td>
                            <td class="px-6 py-4">
                                {{ new Date() }}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div class="flex justify-center -ml-44 relative top-1/3">
                <!-- This is an example component -->
                <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        <div>트레이너 사진</div>
                        <!-- <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"> -->
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">트레이너 이름</p>
                                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                            </div>
                            <p class="text-gray-400 text-sm">작성시간</p>
                        </div>
                    </div>
                    <p class="-mt-4 text-gray-500">
                        트레이너가 남기는 피드백
                        트레이너가 남기는 피드백
                    </p>
                    <br>
                    <p class="-mt-4 text-gray-500">
                        평점
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BackgroundComponent from '../BackgroundComponent.vue';

export default {
    name: 'app',
    components: {
        BackgroundComponent
    }
}
</script>

<style>
* {
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.dietTitle {
    margin-top: 30px;
    text-align: center;
    font-size: 24px;
    margin-bottom: -50px;
    letter-spacing: 15px;
    font-size: 80px;
    color: teal;
}

/* Ensuring grid layout is correctly applied */
.content-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    /* This will allocate more space to the 'record' section */
    gap: 20px;
    /* Space between the two sections */
    margin: 30px 0;
    /* Top and bottom margin for spacing, adjust as needed */
}

table {
    margin-top: 100px;
    width: auto;
    min-width: 0;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

table:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

th,
td {
    padding: 12px 15px;
    text-align: left;
}

thead {
    background-color: #f4f4f4;
    color: #333;
}

tbody tr:nth-child(odd) {
    background-color: #fff;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

.circle-gradient {
    animation: rotate 10s linear infinite;
    transform-origin: center;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
</style>