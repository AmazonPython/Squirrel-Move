<template>
  <div class="wrapper">
    <Toast v-if="show" :message="toastMessage"/>
    <div class="title">
      <div class="iconfont" @click="handleBackClick">
        &#xe6f2;
      </div>
      {{ isEdit ? '编辑' : '新建' }}地址
      <span
        class="title__save"
        @click="handleSaveClick"
      >保存</span>
    </div>
    <div class="content">
      <div class="content__item">
        <span class="content__item__label">所在城市：</span>
        <input
          class="content__item__input"
          placeholder="请输入所在城市"
          v-model="city"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">小区/大厦/学校：</span>
        <input
          class="content__item__input"
          placeholder="请输入小区/大厦/学校"
          v-model="department"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">楼号-门牌号：</span>
        <input
          class="content__item__input"
          placeholder="请输入楼号-门牌号"
          v-model="houseNumber"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">收货人：</span>
        <input
          class="content__item__input"
          placeholder="请输入收货人"
          v-model="name"
        />
      </div>
      <div class="content__item">
        <span class="content__item__label">联系电话：</span>
        <input
          class="content__item__input"
          placeholder="请输入联系电话"
          v-model="phone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { post } from '@/utils/request';
import Toast, { useToastEffect } from '../../components/Toast.vue';

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { router, handleBackClick }
}

export default {
  name: 'AddressEdit',
  components: { Toast },
  setup() {
    const route = useRoute();
    const id = route.query.id;
    const city = ref('');
    const department = ref('');
    const houseNumber = ref('');
    const name = ref('');
    const phone = ref('');
    const { show, toastMessage, showToast } = useToastEffect()
    const { router, handleBackClick } = useBackRouterEffect();

    onBeforeMount(async () => {
      if(id) {
        const result = await post(`/api/user/address/${id}`)
        if (result?.errno === 0) {
          const data = result.data;
          city.value = data.city;
          department.value = data.department;
          houseNumber.value = data.houseNumber;
          name.value = data.name;
          phone.value = data.phone;
        }
      }
    });

    const handleSaveClick = async () => {
      if(
        !city.value ||
        !department.value ||
        !houseNumber.value ||
        !name.value ||
        !phone.value
      ) {
        showToast('所有内容必填')
      }else {
        if(id) {
          const result = await post(`/api/user/address/${id}`, {
            city: city.value,
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value,
          })
          if (result?.errno === 0) {
            router.back();
          }
        }else {
          const result = await post('/api/user/address', {
            city: city.value,
            department: department.value,
            houseNumber: houseNumber.value,
            name: name.value,
            phone: phone.value,
          })
          if (result?.errno === 0) {
            router.back();
          }
        }
      }
    }
    return {
      city,
      department,
      houseNumber,
      name,
      phone,
      show,
      toastMessage,
      isEdit: !!id,
      handleBackClick,
      handleSaveClick,
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $darkBgColor;
}
.title {
  position: relative;
  @include title;
  .iconfont {
    position: absolute;
    left: .1rem;
    width: .3rem;
    font-size: .24rem;
    color: $search-fontColor;
  }
  &__save {
    position: absolute;
    right: .18rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
}
.content {
  margin-top: .12rem;
  padding: 0 .18rem;
  background: $bgColor;
  &__item {
    display: flex;
    overflow: hidden;
    height: .44rem;
    line-height: .44rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    &__label {
      color: $content-fontcolor;
    }
     &__input {
       flex: 1;
       border: none;
       outline: none;
     }
  }
}
</style>
