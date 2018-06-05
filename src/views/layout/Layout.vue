<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container" style="background: #f8f8f8;">
			<navbar></navbar>
			<tags-view></tags-view>
			<my-search v-show="search.menuShow"></my-search>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, MySearch } from './components'
import { mapState } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    MySearch
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapState(['search'])
  },
  mounted() {
    // this.$store.commit('UPDATE_SEARCH_SHOW_STATE', true)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>
