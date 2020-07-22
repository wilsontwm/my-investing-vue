<template>
    <v-dialog v-model="dialog" max-width="368">
      <v-card>
        <v-card-title class="headline">
            Delete account
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="dialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col cols="12" md="12">  
                    <v-form ref="form" @submit.prevent="handleSubmit">
                        <v-row align="center"
                            justify="center">
                            <v-col align="center">
                                <v-icon 
                                    :size="75"
                                    color="error"
                                >mdi-alert-circle-outline</v-icon>
                            </v-col>
                        </v-row>
                        <div class="text-center subtitle mb-4">Are you sure you want to delete {{ this.title }}?</div>
                        <v-btn type="submit" :loading="isRequestInProgress" large block color="error">Confirm</v-btn>                    
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
    name: "AccountDeleteDialog",
    data: () => ({
    }),
    computed: {
        ...mapState('portfolioModule', {
            account: state => state.activeAccount,
            isTriggerDialog: state => state.isTriggerDeleteAccountDialog,
            isRequestInProgress: state => state.isDeleteRequestInProgress,
        }),
        dialog: {
            get () { return this.isTriggerDialog; },
            set (value) { this.exitDeleteAccount(); }
        },
        title: function() {
            return this.account ? this.account.Title : '';
        }
    },
    methods: {
        ...mapActions('portfolioModule', ['exitDeleteAccount', 'deleteAccount']),
        ...mapActions('generalModule', ['showSnackbar']),
        async handleSubmit() {
            if(this.account != null) {
                let data = {
                    id: this.account.ID,
                }

                let response = await this.deleteAccount(data);
                if(response.success) {
                    this.exitDeleteAccount();
                    this.showSnackbar({text: "You have successfully deleted the account.", color: "success"});
                } else {
                    this.showSnackbar({text: response.message, color: "error"});
                }
            }
        }
    }
}
</script>