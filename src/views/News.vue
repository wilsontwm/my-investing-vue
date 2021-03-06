<template>
  <div class="news">
    <v-container class="search-container">
      <v-row>
        <v-col cols="11">
          <h1 class="headline font-weight-light">News feed</h1>
        </v-col>
        <v-col cols="1">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="float-right" v-bind="attrs" v-on="on" icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
              
            </template>
            <v-list>
              <v-list-item @click.stop="$refs.scanNewsDialog.dialog = true"><v-list-item-title>Scan news</v-list-item-title></v-list-item>
            </v-list>
          </v-menu>        
          
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>Filter</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-select
                  v-model="selectedNewsSources"
                  :items="newsSources"
                  item-text="name"
                  item-value="id"
                  label="News sources"
                  multiple
                >
                  <template v-slot:prepend-item>
                    <v-list-item
                      ripple
                      @click="toggleSelection"
                    >
                      <v-list-item-action>
                        <v-icon :color="selectedNewsSources.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>Select All</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="isAllSelected && index === (newsSources.length - 1)">
                      <span>All</span>
                    </v-chip>
                    <v-chip v-if="!isAllSelected && index < 2">
                      <span>{{ item.name }}</span>
                    </v-chip>
                    <span
                      v-if="!isAllSelected && index === 2"
                      class="grey--text caption"
                    >(+{{ selectedNewsSources.length - 2 }} others)</span>
                  </template>
                </v-select>
                <v-btn color="success" @click.stop="applySearch()">Apply</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row> 
        <NewsCard v-for="news in newss" :key="news.ID" :item="news" :sources="newsSources" />
      </v-row>
    </v-container>
    <ScanNewsDialog ref="scanNewsDialog" />
    <NewsLoader v-show="isNewsLoading" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import NewsLoader from '@/components/news/NewsLoader'
import NewsCard from '@/components/news/NewsCard'
import ScanNewsDialog from '@/components/news/ScanNewsDialog'

export default {
  name: 'News',
  components: {
    NewsLoader,
    NewsCard,
    ScanNewsDialog
  },
  computed: {
    isAllSelected () {
      return this.selectedNewsSources.length === this.newsSources.length && this.newsSources.length > 0;
    },
    isSomeSelected () {
      return this.selectedNewsSources.length > 0 && !this.isAllSelected && this.newsSources.length > 0;
    },
    icon () {
      if (this.isAllSelected) return 'mdi-close-box'
      if (this.isSomeSelected) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
      ...mapActions('newsModule', ['getNewsList']),
      async applySearch(e) {
          if(!this.isNewsLoading){
            this.isNewsLoading = true;
            this.newss = [];

            this.filter.sources = this.selectedNewsSources;
            const data = {
              sources: this.filter.sources.join(),
              limit: this.filter.limit,
              prev: null,
              prevPublished: null
            };

            const response = await this.getNewsList(data);
            if(response && response.success) {
              this.newss = response.data;
              if(this.newss.length > 0) {
                var last = this.newss[this.newss.length - 1];
                this.filter.prev = last.ID;
                this.filter.prevPublished = new Date(last.PublishedAt).getTime() / 1000;
              }
            }

            this.isNewsLoading = false;
          }          
      },
      async scrollSearch(e) {
        if(!this.isNewsLoading) {
          this.isNewsLoading = true;
          const data = this.filter;

          const response = await this.getNewsList(data);
          if(response && response.success) {
            this.newss = this.newss.concat(response.data);
            if(this.newss.length > 0) {
              var last = this.newss[this.newss.length - 1];
              this.filter.prev = last.ID;
              this.filter.prevPublished = new Date(last.PublishedAt).getTime() / 1000;
            }
          }

          this.isNewsLoading = false;
        }
      },
      toggleSelection() {
        this.$nextTick(() => {
          if (this.isAllSelected) {
            this.selectedNewsSources = [];
          } else {
            this.selectedNewsSources = this.newsSources.slice();
          }
        })
      },
      checkIsSourcesChanged() {
        const array1 = this.selectedNewsSources.length >= this.filter.sources.length ? this.selectedNewsSources : this.filter.sources;
        const array2 = this.selectedNewsSources.length >= this.filter.sources.length ? this.filter.sources : this.selectedNewsSources;
        
        const intersected = array1.filter(value => array2.indexOf(value) !== -1);
        return array1.length !== array2.length
              || (intersected.length !== array1.length && intersected.length !== array2.length);
      }
  },
  created() {
    // Set all the sources as the selected
    this.selectedNewsSources = this.newsSources.map(function(item){
      return item.id;
    });
    
    this.applySearch();
  },
  mounted() {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow) {        
        this.scrollSearch();
      }
    };
  },
  data() {
    return {
      // This is the filter that is applied before
      filter: {
        sources: [],
        limit: 12, 
        prev: null, 
        prevPublished: null,
      },
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
      isNewsLoading: false,
      newss: [],
    }
  }
}
</script>