<script>
import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    userName: ""
  },
  mutations: {
    changeName(state,name) {
      this.userName = name;
    },
    resetUser(state){
      this.changeName(state,"");
    }
  }
});

export default {
  name:"store",
  components: { store }
};
</script>
