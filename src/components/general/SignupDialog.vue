<template>
    <v-dialog persistent v-model="dialog" max-width="368">
      <v-card>
        <v-card-title class="headline">
            Signup
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="closeSignup()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-row class="mt-4">    
                <v-col cols="12" md="12">  
                    <v-form ref="form" v-model="valid">
                        <v-text-field 
                            v-model="name"
                            label="Name" 
                            placeholder="Name" 
                            :rules="nameRules"
                            outlined 
                            dense
                            required
                        ></v-text-field>
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
                            v-model="password"
                            ref="password"
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
                        <v-text-field 
                            v-model="retypePassword"
                            label="Retype Password" 
                            placeholder="Retype Password" 
                            :rules="[passwordConfirmationRules]"
                            outlined 
                            dense
                            required
                            :append-icon="rpw ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="() => (rpw = !rpw)"
                            :type="rpw ? 'password' : 'text'"
                        ></v-text-field>
                        <v-btn large color="success" width="100%" @click.stop="handleSubmit">Signup</v-btn>                    
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
    name: "SignupDialog",
    data: () => ({
        pw: String,
        rpw: String,
        valid: false,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
            v => !!v || 'Email is required',
            v => /.+@.+/.test(v) || 'Email is invalid',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => {
                const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                return (
                    pattern.test(v) ||
                    "Min. 8 characters with at least one capital letter, a number and a special character."
                );
            }
        ],
        retypePassword: '',
    }),
    computed: {
        ...mapState('userModule', {
            isPromptSignup: state => state.isPromptSignup,
        }),
        dialog: function() {
            return this.isPromptSignup;
        },
        passwordConfirmationRules: function() {
            return this.password === this.retypePassword || "Password does not match";
        }
    },
    methods: {
        ...mapActions('userModule', ['triggerSignup', 'submitSignup']),
        closeSignup() {
            this.reset();
            this.triggerSignup(false);
        },
        reset() {
            this.$refs.form.reset();
        },
        async handleSubmit() {
            if(this.$refs.form.validate()) {
                let input = {
                    name: this.name, 
                    email: this.email, 
                    password: this.password
                };
                const response = await this.submitSignup(input);
            }            
        }
    }
}
</script>