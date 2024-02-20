<template>
<title>LOGIN SUCCESS</title>
</template>
<script>
export default {
  created() {
    this.handleRedirectWithTokens();
  },
  methods: {
    handleRedirectWithTokens() {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        this.$router.push('/');
      }
    },
  },
}
</script>