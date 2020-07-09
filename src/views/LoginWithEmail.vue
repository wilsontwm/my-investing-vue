<template>
    <div class="login-with-email">
    </div>
</template>
<script>
// @ is an alias to /src
import { mapActions } from 'vuex';

export default {
    name: 'LoginWithEmail',
    methods: {
        ...mapActions('userModule', ['signInWithEmailLink']),
        async login() {
            const user = await this.signInWithEmailLink();
            this.storeUser(user);
        },
        storeUser(user) {
            if(user != undefined) {
                localStorage.setItem('user', JSON.stringify(user));
                // Redirect page
                this.$router.push({ name: 'Home' });
            } else {
                localStorage.removeItem('user');
            }
        },
    },
    mounted() {
        this.login();   
    }
}
</script>