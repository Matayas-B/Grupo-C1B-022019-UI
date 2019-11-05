<script>
import Vuex from "vuex"

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
});

export default {
    name:"Store",
    components: {store}    
}
</script>
