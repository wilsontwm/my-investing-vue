<template>
    <v-dialog 
        v-model="dialog" 
        max-width="368"
        persistent
    >
        <v-card>
            <v-card-title class="headline">
                <v-spacer></v-spacer>
                <v-btn icon v-if="popup.isDismissable" @click.stop="hidePopup()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-container fill-height fluid>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-progress-circular
                            v-if="popup.isLoading"
                            :size="75"
                            :color="popup.iconColor"                
                            indeterminate
                        ></v-progress-circular>
                        <v-icon 
                            v-if="!popup.isLoading && popup.icon"
                            :size="75"
                            :color="popup.iconColor"
                        >{{popup.icon}}</v-icon>
                    </v-col>
                </v-row>
                <v-row align="center"
                    justify="center">
                    <v-col align="center">
                        <v-card-text>{{ popup.message }}</v-card-text>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "PopupDialog",
    data: () => ({
        
    }),
    computed: {
        ...mapState('generalModule', {
            popup: state => state.popup,
        }),
        dialog: function() {
            var value = this.popup.isDisplay;
            if(value) {
                setTimeout(() => {
                    // Show the close icon when it's taken more than 5 seconds
                    if(this.popup.isDisplay && !this.popup.isDismissable) {
                        this.allowDismissablePopup();
                    }
                }, this.popup.timeout);
            }

            return value;
        }
    },
    methods: {
        ...mapActions('generalModule', ['hidePopup', 'allowDismissablePopup']),
    }
}
</script>
