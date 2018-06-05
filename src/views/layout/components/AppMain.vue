<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive :cachedViews="cachedViews"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  watch: {
    '$route': {
      handler(val, oldval) {
        let isTrue = true
        if (val.path.indexOf('system') !== -1) {
          isTrue = false
        }
        this.$store.commit('UPDATE_SEARCH_SHOW_STATE', isTrue)
      }
    }
  }
}
</script>
