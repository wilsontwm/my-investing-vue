<template>
  <div class="fund">
    <v-container>
      <v-row>
        <v-col cols="11">
          <h1 class="headline font-weight-light">Fund</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4" sm="6" xs="12">
          <AccountDropdown />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import AccountDropdown from '../../components/portfolio/AccountDropdown'

export default {
  name: 'PortfolioFund',
  components: {
    AccountDropdown
  },
  beforeCreate() {
    var user = localStorage.getItem('user');
    if(user == null) {
        this.$router.push({ name: 'Login' });
    }
  }
}
</script>