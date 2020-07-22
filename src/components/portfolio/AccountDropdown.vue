<template>
    <div>
        <v-select
            v-model="selectedAccount"
            :items="accountsList"
            label="Select account"
            item-text="Title"
            item-value="ID"
            solo
            flat
            background-color="white"
        >
            <template v-slot:selection="{ item }">
                <span>{{ item.Title }}</span>
            </template>
            <template v-slot:append-item>
                <v-divider class="mt-2"></v-divider>
                <v-list-item @click.stop="$refs.accountDialog.dialog = true">
                    <v-list-item-content>
                        <v-list-item-title>Manage account</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-select>
        <AccountDialog ref="accountDialog" />
        <AccountManageDialog ref="accountManageDialog" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AccountDialog from '@/components/portfolio/AccountDialog';
import AccountManageDialog from '@/components/portfolio/AccountManageDialog';

export default {
    name: "AccountDropdown",
    components: {
        AccountDialog, AccountManageDialog
    },
    data: () => ({
        selectedAccount: null,
    }),
    computed: {
        ...mapState('portfolioModule', {
            accounts: state => state.accounts,
        }),
        accountsList() {            
            var all = [{ID: "all", Title: "Select All"}];
            return all.concat(this.accounts);
        }
    },
    methods: {
        ...mapActions('portfolioModule', ['getAccounts']),
    },
    created() {
        // Get all the accounts that belong to the user
        this.getAccounts();
    }
}
</script>