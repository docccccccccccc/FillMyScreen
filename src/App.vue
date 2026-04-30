<script setup lang="ts">
import PopupContainer from './components/PopupContainer.vue'
import { zhCn } from 'element-plus/es/locale/index.mjs'
import { ref } from 'vue'
import { usePopupConfigStore } from './stores/popupConfig'
import { allWordTypeWithLabels } from './utils/wordsWithWarmth'
import { storeToRefs } from 'pinia'
import { GLOBAL_CONST } from './utils/globalConst'
const configDialogVisible = ref(true)
const popupConfigStore = usePopupConfigStore()
const { popupCount, chosenWordTypeList } = storeToRefs(popupConfigStore)

// Props for checkbox group
const checkboxGroupProps = {
  label: 'label',
  value: 'value',
}

const handleStart = () => {
  configDialogVisible.value = false
}
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-dialog
      title="Config"
      v-model="configDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form>
        <el-form-item :label="`Max Popup Count(0 ~ ${GLOBAL_CONST.MAX_POPUP_COUNT}, 0 = Infinite)`">
          <el-input-number :min="0" :max="GLOBAL_CONST.MAX_POPUP_COUNT" v-model="popupCount" />
        </el-form-item>
        <el-form-item label="Popup Content Type">
          <el-checkbox-group
            v-model="chosenWordTypeList"
            :options="allWordTypeWithLabels"
            :props="checkboxGroupProps"
            :min="1"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleStart" type="primary">Start</el-button>
      </template>
      <p>
        Made by <el-link href="https://doctypehtml.top">doctypehtml</el-link> (GitHub:
        <el-link href="https://github.com/docccccccccccc">here</el-link>)
      </p>
    </el-dialog>
    <PopupContainer v-if="!configDialogVisible" />
  </el-config-provider>
</template>

<style scoped></style>
