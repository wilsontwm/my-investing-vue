<template>
  <div class="news">
    <v-container class="search-container">
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="6">
          <v-select
            v-model="selectedNewsSources"
            :items="newsSources"
            item-text="name"
            item-value="id"
            label="News sources"
            append-outer-icon="mdi-magnify"
            @click:append-outer="applySearch"
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
        </v-col>
      </v-row>
    </v-container>
    <NewsLoader />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import NewsLoader from '@/components/news/NewsLoader.vue'

export default {
  name: 'News',
  components: {
    NewsLoader
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
          if(this.checkIsSourcesChanged()){
            this.filter.sources = this.selectedNewsSources;
            const data = {
              sources: this.filter.sources.join(),
              limit: this.filter.limit,
              prev: this.filter.prev,
              prevPublished: this.filter.prevPublished
            };
            console.log(this.filter);
            console.log(data);
            //const response = await this.getNewsList(data);
            //console.log(response);
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
        const intersected = this.selectedNewsSources.filter(value => -1 !== this.filter.sources.indexOf(value));
        return intersected.length !== this.selectedNewsSources.length;
      }
  },
  created() {
    //this.applySearch();
  },
  data() {
    return {
      // This is the filter that is applied before
      filter: {
        sources: [],
        limit: 10, 
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
    }
  }
}
</script>