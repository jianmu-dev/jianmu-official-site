<script setup lang="ts">
import PartOne from '@/views/web/content/part-one.vue';
import PartTwo from '@/views/web/content/part-two.vue';
import PartThree from '@/views/web/content/part-three.vue';
import PartFour from '@/views/web/content/part-four.vue';
import PartFive from '@/views/web/content/part-five.vue';
import PartSix from '@/views/web/content/part-six.vue';
import partSeven from '@/views/web/content/part-seven.vue';
import partEight from '@/views/web/content/part-eight.vue';
import PartNine from '@/views/web/content/part-nine.vue';
</script>
<template>
  <div class="scroll-content" ref="scrollContentRef">
    <part-one />
    <part-two />
    <part-three />
    <part-four />
    <part-five />
    <part-six />
    <part-seven />
    <part-eight />
    <part-nine />
  </div>
</template>
<style lang="less" scoped>
.scroll-content {
  background-color: #fff;
}
</style>
