<template>
    <v-dialog v-model="dialog" max-width="368">
      <v-card>
        <v-card-title class="headline">
            Login
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-row class="mt-4">
                <v-col cols="12" md="12">
                    <v-btn large block color="error" @click.stop="loginWithGoogle()"><v-icon class="mr-2">mdi-google</v-icon>Login with Google</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                    <v-btn large block color="primary" @click.stop="loginWithFacebook()"><v-icon class="mr-2">mdi-facebook</v-icon>Login with Facebook</v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-4">    
                <v-col cols="12" md="12">      
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-row>    
                <v-col cols="12" md="12">  
                    <p class="subtitle-2 text-center">Login using email link</p>
                    <v-form ref="form" v-model="valid" @submit.prevent="handleLogin()">
                        <v-text-field 
                            v-model="email"
                            label="Email" 
                            placeholder="Email" 
                            :rules="emailRules"
                            outlined 
                            dense
                            required
                        ></v-text-field>
                        <v-btn type="submit" large block color="success">Login</v-btn>
                    
                    </v-form>
                </v-col>
            </v-row>
        </v-card-text>

      </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "LoginDialog",
    data: () => ({
        pw: String,
        valid: false,
        email: '',
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'Email is invalid',
        ],
        passwordRules: [
            v => !!v || 'Password is required'
        ],
    }),
    computed: {
        ...mapState('userModule', {
            isPromptLogin: state => state.isPromptLogin,
            isLoginInProgress: state => state.isLoginInProgress,
        }),        
        dialog: {
            get () { return this.isPromptLogin && !this.isLoginInProgress; },
            set (value) { this.closeLogin(); }
        },
    },
    methods: {
        ...mapActions('userModule', ['triggerLogin', 'loginWithProvider', 'loginWithEmailLink', 'triggerSignup']),
        async loginWithGoogle() {
            const user = await this.loginWithProvider('google');
            this.storeUser(user);
        },
        async loginWithFacebook() {
            const user = await this.loginWithProvider('facebook');
            this.storeUser(user);
        },
        storeUser(user) {
            if(user != undefined) {
                localStorage.setItem('user', JSON.stringify(user));
                // Refresh page
                location.reload();
            } else {
                localStorage.removeItem('user');
            }
        },
        closeLogin() {
            this.reset();
            this.triggerLogin(false);
        },
        reset() {
            this.$refs.form.reset();
        },
        handleLogin() {
            this.$refs.form.validate();

            if(this.valid) {
                this.loginWithEmailLink(this.email);
                localStorage.setItem('emailForSignIn', this.email);
            }
        },
        openSignup() {
            this.reset();
            this.triggerLogin(false);
            this.triggerSignup(true);
        }
    }
}
</script>