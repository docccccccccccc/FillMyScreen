<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ indexOfWord: number }>()
import { wordsWithWarmth } from '@/utils/wordsWithWarmth'
const popupContent = computed(() => {
  return wordsWithWarmth[props.indexOfWord]?.content
})
</script>

<template>
  <el-card
    class="popup"
    :body-style="{
      padding: 0,
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      display: 'flex',
      alignItems: 'center',
    }"
  >
    <span>
      {{ popupContent }}
    </span>
  </el-card>
</template>

<style lang="scss" scoped>
.popup {
  width: 300px;
  height: 80px;
  position: fixed;
  padding: 8px;
  box-sizing: border-box;
  user-select: none;
}
</style>
