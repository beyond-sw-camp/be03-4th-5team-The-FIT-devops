<template>
    <div class="relative w-full h-screen bg-gradient-to-r from-purple-300 to-blue-300">
        <svg class="absolute w-full h-full " viewBox="0 0 1044 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <linearGradient id="paint0_linear_2_125" x1="129" y1="512.5" x2="744" y2="512.5"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BC96FB"></stop>
                    <stop offset="1" stop-color="#ABECD6"></stop>
                </linearGradient>
            </defs>
        </svg>
        <section class="relative flex items-center justify-center h-full">
            <div class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    로그인
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="이메일을 입력하세요!" required="">
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required="">
                    </div>

                    <button type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">로그인 하기</button>

                </form>
            </div>
        </section>
    </div>
</template>

<script>

export default {

}
</script>

<style></style>
