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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">My Investing</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" outlined color="white" @click.stop="promptLogin"><v-icon left>mdi-account-circle</v-icon> Login</v-btn>
    </v-app-bar>
    <LoginDialog />
    <SignupDialog />
    <v-content class="container">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import LoginDialog from '@/components/general/LoginDialog';
import SignupDialog from '@/components/general/SignupDialog';

export default {
  name: "App",
  components: {
    LoginDialog, SignupDialog
  },
  props: {
    //source: String,
  },
  data: () => ({
    drawer: null,
    items: [
      { href: '/', icon: 'mdi-newspaper', text: 'All news' },
      // { href: '/contacts', icon: 'mdi-contacts', text: 'Contacts' },
      // { icon: 'mdi-cog', text: 'Settings' },
      // {
      //   icon: 'mdi-chevron-up',
      //   'icon-alt': 'mdi-chevron-down',
      //   text: 'Labels',
      //   model: true,
      //   children: [
      //     { href: '/create', icon: 'mdi-plus', text: 'Create label' },
      //   ],
      // },
    ],
  }),
  methods: {
    ...mapActions('userModule', ['triggerLogin']),
    promptLogin() {
      this.triggerLogin(true);
    }
  }
}
</script>
<style scoped>
#inspire {
  background-color: #e9eff1;
}
</style>