<template>
    <tr>
        <td>{{ account.Title }}</td>
        <td class="text-right">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop="editAccount">
                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Edit</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop="deleteAccount">
                        <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </td>       
    </tr>
</template>
<script>
import {  mapActions } from 'vuex';
export default {
    name: "AccountItem",
    data: () => ({
        
    }),
    components: {
        
    },
    props: [
        'account'
    ],
    methods: {
        ...mapActions('portfolioModule', ['initiateManageAccount']),
        editAccount() {
            this.initiateManageAccount(this.account);
        },
        deleteAccount() {

        }
    }
}
</script>