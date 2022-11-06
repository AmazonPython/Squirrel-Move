<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img">
    <div
      :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false: true}"
    >
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.sloga }}</p>
      <div v-if="item.products" class="shop__products">
        <div v-for="product in item.products" :key="product.name" class="shop__product">
          <img :src="product.imgUrl" class="shop__product__img" />
          <p class="shop__product__title">{{ product.name }}</p>
          <p class="shop__product__price">
            <span class="yen">&yen;</span><span class="price">{{ product.price }}</span>
            <span class="origin">&yen;{{ product.price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
@import '../style/mixins.scss';
.shop {
  display: flex;
  padding-top: .12rem;
  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag {
      margin-right: .16rem;
    }
    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: $hightlight-fontColor;
    }
  }
  &__products {
    overflow: hidden;
    margin: .08rem .07rem 0 -.18rem;
  }
  &__product {
    width: 33.33%;
    padding-left: .18rem;
    box-sizing: border-box;
    float: left;
    &__img {
      width: 100%;
    }
    &__title {
      margin: .04rem 0 0 0;
      line-height: .17rem;
      font-size: .12rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      line-height: .2rem;
      margin: .02rem 0 0 0;
      color: $light-fontColor;
      font-size: .14rem;
      @include ellipsis;
      .yen {
        font-size: .12rem;
        color: $hightlight-fontColor;
      }
      .price {
        color: $hightlight-fontColor;
      }
      .origin {
        margin-left: .06rem;
        font-size: .12rem;
        text-decoration: line-through;
      }
    }
  }
}
</style>
