<template>
  <div class="index adminIndex">
    <HeadNav></HeadNav>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";

export default {
  name: "index",
  components: {
    HeadNav
  }
};
</script>

<style>
@import '../../static/css/system.css';
@import '../../static/css/reset.css';

.adminIndex {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  /* left: 180px;
  width: calc(100% - 180px); */
  height: calc(100% - 71px);
  overflow: auto;
  padding-bottom: 30px;
}
</style>

