<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PopupWithWords from './PopupWithWords.vue'
import { usePopupConfigStore } from '@/stores/popupConfig'
import { v4 as uuidv4 } from 'uuid'
import { wordsWithWarmth } from '@/utils/wordsWithWarmth'
import { GLOBAL_CONST } from '@/utils/globalConst'
const popupConfigStore = usePopupConfigStore()

interface PopupInfo {
  uuid: string
  time: number
  indexOfWord: number
  offsetX: number
  offsetY: number
}

const shownPopups = ref<PopupInfo[]>([])

const filteredWordList = wordsWithWarmth.filter((word) => {
  if (word.types) {
    return word.types.some((aWordType) => popupConfigStore.chosenWordTypeList.includes(aWordType))
  }
  return true // Return true if the word untyped
})

const getOldestPopup = () => {
  if (shownPopups.value.length === 0) {
    return null // If none are shown return null
  }

  // Fine the oldest
  return shownPopups.value.reduce((oldest, current) => {
    return oldest.time > current.time ? current : oldest
  })
}

const addPopup = () => {
  // Info for new popup
  const newPopup: PopupInfo = {
    uuid: uuidv4(),
    time: new Date().getTime(),
    indexOfWord: Math.floor(Math.random() * filteredWordList.length),
    offsetX: Math.random() * (window.innerWidth + 300) - 150,
    offsetY: Math.random() * (window.innerHeight + 80) - 40,
  }

  // If >= max
  if (shownPopups.value.length >= GLOBAL_CONST.MAX_POPUP_COUNT) {
    const oldestPopup = getOldestPopup() // Get the oldest popup

    // If it exists
    if (oldestPopup) {
      // Then get its uuid
      const oldestIndex = shownPopups.value.findIndex((popup) => popup.uuid === oldestPopup.uuid)
      // Kick it out
      shownPopups.value.splice(oldestIndex, 1)
    }
  }

  shownPopups.value.push(newPopup)
}

const start = () => {
  const addPopupInterval = setInterval(() => {
    // Generate every 100ms
    if (
      // If count is limited and reached the limit
      popupConfigStore.popupCount !== 0 &&
      shownPopups.value.length >= popupConfigStore.popupCount - 1
    ) {
      // Stop
      clearInterval(addPopupInterval)
    }
    addPopup()
  }, 100)
}

onMounted(start)
</script>

<template>
  <div class="popup-container">
    <TransitionGroup name="popup">
      <PopupWithWords
        v-for="popup in shownPopups"
        :key="popup.uuid"
        :index-of-word="popup.indexOfWord"
        :style="{
          left: `${popup.offsetX}px`,
          top: `${popup.offsetY}px`,
        }"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.popup-container {
  background-color: #ff000080;
  width: 100dvw;
  height: 100dvh;
}

.popup-enter-active {
  transition: 0.3s all ease-out;
}

.popup-enter-from {
  opacity: 0;
  transform: translateY(-24px);
}
</style>
