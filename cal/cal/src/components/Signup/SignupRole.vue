<template>
    <title>SignUP Role</title>
    <div class="app-container"><BackgroundComponent></BackgroundComponent>
        <div class="w-full h-full relative overflow-hidden animated-background">
            <div class="button-container flex justify-center items-center h-full space-x-4">
                <a href="/signupTrainer" class="btn">트레이너</a>
                <a href="/signupMember" class="btn">회원</a>
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