<template>
    <v-snackbar 
        v-model="snackbar"
        multi-line
        bottom
        right
        :timeout=3000
        :color="snackbarColor"
    >
        {{ text }}
        <v-spacer></v-spacer>
        <v-btn dark icon @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "AlertDialog",
    data: () => ({
        
    }),
    computed: {
        ...mapState('generalModule', {
            isDisplay: state => state.snackbar.isDisplay,
            text: state => state.snackbar.text,
            snackbarColor: state => state.snackbar.color,
        }),
        snackbar: {
            get () { return this.isDisplay },
            set (value) { this.hideSnackbar(); }
        }
    },
    methods: {
        ...mapActions('generalModule', ['hideSnackbar']),
    }
}
</script>
