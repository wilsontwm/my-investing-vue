<template>
    <v-dialog v-model="dialog" max-width="368">
      <v-card>
        <v-card-title class="headline">
            Manage account
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-row class="mt-4">
                <v-col cols="12" md="12">  
                    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
                        <v-text-field 
                            v-model="title"
                            label="Account name" 
                            placeholder="Account name" 
                            :rules="titleRules"
                            outlined 
                            dense
                            required
                        ></v-text-field>
                        <v-btn type="submit" :loading="isRequestInProgress" large block color="success">Save</v-btn>
                    
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
    name: "AccountManageDialog",
    data: () => ({
        valid: false,
        title: String,
        titleRules: [
            v => !!v || 'Account name is required',
        ],
    }),
    computed: {
        ...mapState('portfolioModule', {
            account: state => state.activeAccount,
            isTriggerDialog: state => state.isTriggerManageAccountDialog,
            isRequestInProgress: state => state.isRequestInProgress,
        }),
        dialog: {
            get () { return this.isTriggerDialog },
            set (value) { this.exitManageAccount(); }
        }
    },
    methods: {
        ...mapActions('portfolioModule', ['exitManageAccount', 'updateAccount']),
        ...mapActions('generalModule', ['showSnackbar']),
        async handleSubmit() {
            this.$refs.form.validate();

            if(this.valid) {
                // Edit case
                if(this.account != null) {
                    let data = {
                        id: this.account.ID,
                        title: this.title,
                    }

                    let response = await this.updateAccount(data);
                    if(response.success) {
                        this.exitManageAccount();
                        this.showSnackbar({text: "You have successfully updated the account.", color: "success"});
                    } else {
                        this.showSnackbar({text: response.message, color: "error"});
                    }
                } else {
                    // Create case
                }
            }
        }
    },
    watch: {
        account: function(val) {
            this.title = val && val.Title ? val.Title : '';
        }
    }
}
</script>