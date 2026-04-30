import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { allWordTypeWithLabels } from '@/utils/wordsWithWarmth'

export const usePopupConfigStore = defineStore('popupcfg', () => {
  const chosenWordTypeList = ref(
    allWordTypeWithLabels.map((typeWithLabels) => typeWithLabels.value),
  )

  // popupCount
  const popupCount = ref(0)

  // Watch changes of the list
  watch(
    chosenWordTypeList,
    (newTypeList) => {
      chosenWordTypeList.value = newTypeList
    },
    {
      deep: true,
    },
  )

  return {
    chosenWordTypeList,
    popupCount,
  }
})
