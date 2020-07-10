<template>
    <v-dialog 
        v-model="dialog" 
        max-width="368"
    >
        <v-card>
            <v-card-title class="headline">
                Scan news
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row class="mt-4">    
                    <v-col cols="12" md="12">  
                        <v-form ref="form">
                            
                            <v-btn 
                                large 
                                color="success" 
                                block
                                :loading="isGettingNews"
                                :disabled="isGettingNews" 
                                @click.stop="submitCrawlNews"
                            >Scan</v-btn>                    
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
    name: "ScanNewsDialog",
    data: () => ({
        dialog: false,
        isGettingNews: false,
        selectedNewsSources: []
    }),
    computed: {
    },
    methods: {
        ...mapActions('newsModule', ['crawlNews']),
        async submitCrawlNews(e) {
            this.isGettingNews = true;
            const sources = this.selectedNewsSources;
            await this.crawlNews({sources});
            this.isGettingNews = false;
        },
    }
}
</script>
