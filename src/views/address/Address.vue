<template>
  <div class="wrapper">
    <div class="title">
      我的地址
      <span class="title__create">新建</span>
    </div>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import Docker from '../../components/Docker'

export default {
  name: 'Address',
  components: { Docker },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  @include fix-content;
  background: $darkBgColor;
}
.title {
  position: relative;
  @include title;
  &__create {
    position: absolute;
    right: .18rem;
    font-size: .14rem;
  }
}
</style>
