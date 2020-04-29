<template>
    <v-col cols="12" md="4">
        <v-card class="mx-auto">
            <v-img
            :src="hasPic ? item.Thumbnail : require('@/assets/images/noimage.png')"
            height="200px"
            ></v-img>

            <v-card-title>
            {{ item.Title }}
            </v-card-title>

            <v-card-subtitle>
            {{ timestamp }}<br />
            {{ source ? source.name : "" }}
            </v-card-subtitle>

            <v-card-actions>

            <v-spacer></v-spacer>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="openSource" v-on="on">
                        <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                </template>
                <span>View source</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="dialog = true" v-on="on">
                        <v-icon>mdi-arrow-expand</v-icon>
                    </v-btn>
                </template>
                <span>Expand</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="show = !show" v-on="on">
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </template>
                <span>More</span>
            </v-tooltip>
            </v-card-actions>

            <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                {{ item.Content }}
                </v-card-text>
            </div>
            </v-expand-transition>
        </v-card>
        
        <v-dialog v-model="dialog" max-width="1068" transition="dialog-bottom-transition">
            <v-toolbar dark color="blue-grey lighten-1">
                <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card>
                <v-img
                v-if="hasPic"
                :src="item.Thumbnail"
                max-height="500px"
                max-width="800px"
                class="mx-auto"
                ></v-img>
                <v-card-title class="headline" primary-title>
                    {{ item.Title }}
                </v-card-title>
                <v-card-subtitle>
                    {{ timestamp }}<br />
                    {{ source ? source.name : "" }} 
                </v-card-subtitle>
                <v-card-text>
                    {{ item.Content }}
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-col>
</template>
<script>

export default {
    name: "NewsCard",
    props: ["item", "sources"],
    data: function() {
      return {
            show: false,
            dialog: false,
            expandedNews: null
      }
    },
    computed: {
        timestamp() {
            var date = new Date(this.item.PublishedAt);
            var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
            return date.toLocaleString('en-US', options);
        },
        source() {
            var objects = this.sources.filter(obj => {
                return obj.id === this.item.Source
            });
            
            return objects.length > 0 ? objects[0] : null;
        },
        hasPic() {
            return this.item.Thumbnail !== "";
        } 
    },
    methods: {
        openSource() {
            window.open(this.item.URL, "_blank");    
        }
    },
    created() {
        let that = this;
        document.addEventListener('keyup', function (evt) {
            if (evt.keyCode === 27) {
                that.dialog = false;
            }
        });
    }
}
</script>
<style scoped>
.headline {
    margin-bottom: 12px;
}
</style>