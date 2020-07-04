<template>
    <v-dialog persistent v-model="dialog" max-width="368">
      <v-card>
        <v-card-title class="headline">
            Login
            <v-spacer></v-spacer>
            <v-btn icon @click="closeLogin()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-row class="mt-4">
                <v-col cols="12" md="12">
                    <v-btn large color="error" width="100%"><v-icon class="mr-2">mdi-google</v-icon>Login with Google</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12">
                    <v-btn large color="primary" width="100%"><v-icon class="mr-2">mdi-facebook</v-icon>Login with Facebook</v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-4">    
                <v-col cols="12" md="12">      
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-row>    
                <v-col cols="12" md="12">  
                    <p class="subtitle-2 text-center">Login using email account</p>
                    <v-form ref="form" v-model="valid">
                        <v-text-field 
                            v-model="email"
                            label="Email" 
                            placeholder="Email" 
                            :rules="emailRules"
                            outlined 
                            dense
                            required
                        ></v-text-field>
                        <v-text-field 
                            label="Password" 
                            placeholder="Password" 
                            :rules="passwordRules"
                            outlined 
                            dense
                            required
                            :append-icon="pw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (pw = !pw)"
                            :type="pw ? 'password' : 'text'"
                        ></v-text-field>
                        <v-btn large color="success" width="100%">Login</v-btn>
                    
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12"> 
                    <p class="subtitle-2 ">Do not have an account yet? Sign up here.</p>
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
        }),
        dialog: function() {
            return this.isPromptLogin;
        }
    },
    methods: {
        ...mapActions('userModule', ['triggerLogin']),
        closeLogin() {
            this.triggerLogin(false);
        }
    }
}
</script>