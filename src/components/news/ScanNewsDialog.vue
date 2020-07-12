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
                            <header class="mb-5">Select the news sources</header>
                            <v-checkbox v-model="isAllSelected" label="Select All" @click="toggleSelection"></v-checkbox>
                            <v-divider></v-divider>
                            <v-checkbox v-model="selectedNewsSources" v-for="news in newsSources" :key="news.id" :label="news.name" :value="news.id" hide-details multiple></v-checkbox>
                            <v-btn 
                                large 
                                color="success" 
                                block
                                class="mt-5"
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
        newsSources: [
            {id: 6, name: "Investing.com"},
            {id: 9, name: "Business Insider"},
            {id: 4, name: "The Star"},
            {id: 5, name: "The Edge"},
            {id: 7, name: "New Straits Times"},
            {id: 8, name: "Malay Mail"},
            {id: 1, name: "China Press (中国报)"},
            {id: 2, name: "Nanyang Siang Pau (南洋商报)"},
            {id: 3, name: "Sin Chew Daily (星洲日报)"},
        ],
        selectedNewsSources: [],
        isAllSelected: true
    }),
    methods: {
        ...mapActions('newsModule', ['crawlNews']),
        async submitCrawlNews(e) {
            this.isGettingNews = true;
            const sources = this.selectedNewsSources;
            await this.crawlNews({sources});
            this.isGettingNews = false;
        },
        toggleSelection() {
            if (this.isAllSelected) {
                this.selectedNewsSources = this.newsSources.map(ele => ele.id);
            } else {
                this.selectedNewsSources = [];                
            }
        }
    },
    created() {
        // Select all news sources when created
        this.selectedNewsSources = this.newsSources.map(ele => ele.id); 
        this.isAllSelected = true;
    },
    watch: {
        selectedNewsSources: function (val) {
            this.isAllSelected = val.length === this.newsSources.length;
        }
    }
}
</script>
