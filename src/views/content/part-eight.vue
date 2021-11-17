<template>
  <div class="part-eight">
    <div class="cooperator">
      <div class="cooperator-wrapper">
        <div class="cooper-item item-1">
          <img src="~@/assets/pngs/pr-8-1.png" />
        </div>
        <div class="cooper-item item-2">
          <img src="~@/assets/pngs/pr-8-2.png" />
        </div>
        <div class="cooper-item item-3">
          <img src="~@/assets/pngs/pr-8-3.png" />
        </div>
        <div class="cooper-item item-4">
          <img src="~@/assets/pngs/pr-8-4.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-eight {
  margin-top: 80px;
  border-top: 1px solid #dfe7ee;
  .cooperator-wrapper {
    margin: 65px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .cooper-item {
      &.item-1 {
        width: 376px;
      }
      &.item-2 {
        width: 122px;
      }
      &.item-3 {
        width: 150px;
      }
      &.item-4 {
        width: 196px;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
