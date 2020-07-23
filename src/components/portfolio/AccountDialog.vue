<template>
    <v-dialog 
        v-model="dialog" 
        max-width="768"
    >
        <v-card>
            <v-card-title class="headline">
                Manage account
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-btn color="primary" @click.stop="createAccount">
                            Create account
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>    
                    <v-col cols="12" md="12">  
                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">Account Name</th>
                                <th class="text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <AccountItem v-for="account in accounts" :key="account.ID" :account="account" />
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AccountItem from '@/components/portfolio/AccountItem';

export default {
    name: "AccountDialog",
    components: {
        AccountItem
    },
    data: () => ({
        dialog: false,
    }),
    computed: {
        ...mapState('portfolioModule', {
            accounts: state => state.accounts,
        })
    },
    methods: {
         ...mapActions('portfolioModule', ['initiateManageAccount']),
        createAccount() {
            this.initiateManageAccount(null);
        },
    }
}
</script>
