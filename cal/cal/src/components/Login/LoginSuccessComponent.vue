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
      const role = urlParams.get('role');
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('role',role);
        this.$router.push('/');
      }
    },
  },
}
</script>