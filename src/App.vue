<template>
  <div id="app" class="container">
    <div class="earth-bg" :class="{ rotating: isRotating }" @click="toggleRotation"></div>
    <div class="flag flag-source" v-if="inputText.trim()">
      <img :src="`https://flagcdn.com/32x24/${currentFlagSource}.png`" alt="Source language flag" />
    </div>
    <div class="flag flag-target" v-if="translatedText">
      <img :src="`https://flagcdn.com/32x24/${currentFlagTarget}.png`" alt="Target language flag" />
    </div>
    <h1>Talkie 🌎</h1>

    <div class="translator">
      <div class="selectors">
        <label>
          From:
          <select v-model="sourceLang">
            <option v-for="lang in languages" :value="lang.code" :key="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </label>

        <label>
          To:
          <select v-model="targetLang">
            <option v-for="lang in languages" :value="lang.code" :key="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </label>
      </div>

      <textarea v-model="inputText" placeholder="Type something..." rows="5"></textarea>
      <button @click="translateText">Translate</button>

      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Translating...</p>
      </div>

      <div class="output" v-if="translatedText && !isLoading">
        <h3>Translated Text:</h3>
        <p>{{ translatedText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const inputText = ref('I am nothing without Jesus Christ')
const translatedText = ref('')
const sourceLang = ref('en')
const targetLang = ref('es')
const isLoading = ref(false)
const isRotating = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'pl', name: 'Polish' },
  { code: 'cs', name: 'Czech' },
  { code: 'sk', name: 'Slovak' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'el', name: 'Greek' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'et', name: 'Estonian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'ru', name: 'Russian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'is', name: 'Icelandic' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese (Mandarin)' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'tl', name: 'Filipino (Tagalog)' },
  { code: 'ceb', name: 'Filipino (Cebuano)' },
  { code: 'ilo', name: 'Filipino (Ilocano)' },
  { code: 'hil', name: 'Filipino (Hiligaynon)' },
  { code: 'bik', name: 'Filipino (Bicol)' },
  { code: 'war', name: 'Filipino (Waray)' },
  { code: 'my', name: 'Burmese' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'ta', name: 'Tamil' },
  { code: 'si', name: 'Sinhala' }
]

const flagMap = {
  en: 'gb', // United Kingdom
  es: 'es', // Spain
  fr: 'fr', // France
  de: 'de', // Germany
  it: 'it', // Italy
  pt: 'pt', // Portugal
  nl: 'nl', // Netherlands
  sv: 'se', // Sweden
  no: 'no', // Norway
  da: 'dk', // Denmark
  fi: 'fi', // Finland
  pl: 'pl', // Poland
  cs: 'cz', // Czech Republic
  sk: 'sk', // Slovakia
  hu: 'hu', // Hungary
  ro: 'ro', // Romania
  bg: 'bg', // Bulgaria
  el: 'gr', // Greece
  hr: 'hr', // Croatia
  sr: 'rs', // Serbia
  sl: 'si', // Slovenia
  et: 'ee', // Estonia
  lv: 'lv', // Latvia
  lt: 'lt', // Lithuania
  ru: 'ru', // Russia
  uk: 'ua', // Ukraine
  is: 'is', // Iceland
  ja: 'jp', // Japan
  zh: 'cn', // China
  ar: 'sa', // Saudi Arabia
  hi: 'in', // India
  th: 'th', // Thailand
  vi: 'vn', // Vietnam
  id: 'id', // Indonesia
  ms: 'my', // Malaysia
  tl: 'ph', // Philippines
  ceb: 'ph',
  ilo: 'ph',
  hil: 'ph',
  bik: 'ph',
  war: 'ph',
  my: 'mm', // Myanmar
  km: 'kh', // Cambodia
  lo: 'la', // Laos
  ta: 'lk', // Sri Lanka
  si: 'lk'  // Sri Lanka
}

const currentFlag = computed(() => flagMap[targetLang.value] || 'us')

const currentFlagSource = computed(() => flagMap[sourceLang.value] || 'us')

const currentFlagTarget = computed(() => flagMap[targetLang.value] || 'us')

let timeoutId = null

watch(inputText, (newVal) => {
  if (timeoutId) clearTimeout(timeoutId)
  if (newVal.trim()) {
    timeoutId = setTimeout(() => {
      translateText()
    }, 1000)
  } else {
    translatedText.value = ''
  }
})

watch(sourceLang, () => {
  if (timeoutId) clearTimeout(timeoutId)
  if (inputText.value.trim()) {
    translateText()
  }
})

watch(targetLang, () => {
  if (timeoutId) clearTimeout(timeoutId)
  if (inputText.value.trim()) {
    translateText()
  }
})

async function translateText() {
  if (!inputText.value.trim()) return
  isLoading.value = true
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText.value)}&langpair=${sourceLang.value}|${targetLang.value}`)
    const data = await response.json()
    translatedText.value = data.responseData.translatedText
  } catch (error) {
    console.error(error)
    translatedText.value = 'Translation failed. Dummy: ' + inputText.value
  } finally {
    isLoading.value = false
  }
}

function toggleRotation() {
  isRotating.value = !isRotating.value
}
</script>
