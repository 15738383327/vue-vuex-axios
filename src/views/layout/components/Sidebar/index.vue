<template>
  <scroll-bar>
    <div class="menu-logo">
      <img :src="customerConfiguration && customerConfiguration.systemIcon"/>
    </div>
    <div>
      <el-menu mode="vertical" :default-active="$route.path" :collapse="!this.sidebar.opened" :router="true"  background-color="#001333" text-color="#fff" active-text-color="#409EFF">
        <sidebar-item v-if="menuTree && menuTree.length" :routes="menuTree"></sidebar-item>
      </el-menu>
    </div>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['menuTree', 'sidebar', 'customerConfiguration'])
  }
}
</script>
<style lang="scss" scoped>
.menu-logo {
  width: 100%;
  padding: 5px;
  img {
    display: block;
    margin: 1rem auto 0rem;
    width: 80%;
  }
}
</style>
