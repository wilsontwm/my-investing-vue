<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      expand-on-hover
    >
      <v-list dense>
        <template v-for="item in items">          
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="`${child.href ? child.href : '#'}`"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="`${item.href ? item.href : '#'}`"
            link            
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#74b9ff"
      dark
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">My Investing</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!isUserLogin" class="ma-2" outlined color="white" @click.stop="promptLogin"><v-icon left>mdi-account-circle</v-icon> Login</v-btn>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            color="indigo"
            v-bind="attrs"
            v-on="on"
            :size="36"
          >
            <img
              v-if="user.photo != ''"
              :src="user.photo"
              :alt="user.name"
            >
            <v-icon v-else dark>mdi-account-circle</v-icon>
          </v-avatar>
          
        </template>
        <v-list>
          <v-list-item><v-list-item-title>{{ user.name }}</v-list-item-title></v-list-item>
          <v-divider></v-divider>
          <v-list-item @click.stop="promptLogout()"><v-list-item-title>Logout</v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <PopupDialog />
    <LoginDialog />
    <SignupDialog />
    <AlertDialog />
    <v-content class="container">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { PopupDialog, LoginDialog, SignupDialog, AlertDialog } from '@/components/general';

export default {
  name: "App",
  components: {
    PopupDialog, LoginDialog, SignupDialog, AlertDialog
  },
  props: {
    //source: String,
  },
  data: () => ({
    drawer: null,
    user: null,
    items: [
      { href: '/', icon: 'mdi-newspaper', text: 'News feed' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Portfolio',
        model: false,
        children: [
          { href: '/portfolio/summary', icon: 'mdi-chart-areaspline', text: 'Summary' },
          { href: '/portfolio/stocks', icon: 'mdi-finance', text: 'Stocks' },
          { href: '/portfolio/fund', icon: 'mdi-currency-usd', text: 'Fund' },
        ],
      },
    ],
  }),
  mounted() {
    if (localStorage.getItem('user')) {
      try {
        this.user = JSON.parse(localStorage.getItem('user'));
      } catch(e) {
        localStorage.removeItem('user');
      }
    }
  },
  computed: {
    isUserLogin: function() {
        return this.user != undefined;
    }
  },
  methods: {
    ...mapActions('userModule', ['triggerLogin', 'logout']),
    promptLogin() {
      this.triggerLogin(true);
    },
    async promptLogout() {
      const response = await this.logout();
      if(response.success) {
        localStorage.removeItem('user');
        location.reload();
      }
    }
  }
}
</script>
<style>
#inspire {
  background-color: #e9eff1;
}
</style>