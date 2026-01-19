<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h2 class="nav-title">Talkie 🌎</h2>
        <ul class="nav-menu">
          <li><button @click="currentPage = 'home'" :class="{ active: currentPage === 'home' }">Home</button></li>
          <li><button @click="currentPage = 'dictionary'" :class="{ active: currentPage === 'dictionary' }">Dictionary</button></li>
          <li><button @click="currentPage = 'about'" :class="{ active: currentPage === 'about' }">About</button></li>
        </ul>
      </div>
    </nav>

    <div v-if="currentPage === 'home'" class="container">
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

    <div v-if="currentPage === 'dictionary'" class="container">
      <h1>Dictionary</h1>
      <p>Dictionary feature coming soon! For now, use the translation tool.</p>
    </div>

    <div v-if="currentPage === 'about'" class="container">
      <h1>About Talkie</h1>
      <p>Talkie is a multilingual translation app built with Vue.js. It supports auto-translation, multiple languages including European and Filipino dialects, and features a clean, responsive design.</p>
      <p>Created with love for global communication. 🌍</p>
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
const currentPage = ref('home')

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
  { code: 'ceb', name: 'Cebuano' },
  { code: 'ilo', name: 'Ilocano' },
  { code: 'hil', name: 'Hiligaynon' },
  { code: 'bik', name: 'Bikol' },
  { code: 'war', name: 'Waray' },
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
}, { immediate: true })

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
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang.value}&tl=${targetLang.value}&dt=t&q=${encodeURIComponent(inputText.value)}`)
    const data = await response.json()
    translatedText.value = data[0][0][0]
  } catch (error) {
    console.error(error)
    translatedText.value = 'Translation failed. Dummy: ' + inputText.value
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5dc; /* Beige background for earthy feel */
}

.navbar {
  background-color: #daa520; /* Goldenrod */
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-title {
  color: white;
  margin: 0;
  font-size: 24px;
}

.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-menu button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-menu button:hover, .nav-menu button.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background-color: rgba(255, 250, 205, 0.9); /* Semi-transparent lemon chiffon */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: background 1s ease; /* Animate background changes */
  position: relative;
}
textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border: 1px solid #daa520; /* Goldenrod border */
  border-radius: 5px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  background-color: #daa520; /* Goldenrod button */
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #b8860b; /* Dark goldenrod on hover */
}
.output {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #daa520;
  background: rgba(255, 250, 205, 0.9);
  border-radius: 5px;
}
.selectors {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
select {
  padding: 5px;
  border: 1px solid #daa520;
  border-radius: 3px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    margin: 20px;
    padding: 15px;
    max-width: none;
  }
  .selectors {
    flex-direction: column;
    gap: 10px;
  }
  .selectors label {
    display: block;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 14px;
    padding: 8px;
  }
  button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
  }
  select {
    width: 100%;
    font-size: 16px;
  }
  h1 {
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
  }
  .output {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    margin: 10px;
    padding: 10px;
  }
  h1 {
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
  }
  textarea {
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
  }
  button {
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
  }
}

/* Flag Styles */
.flag {
  position: absolute;
  top: 10px;
  width: 32px;
  height: 24px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
.flag:hover {
  opacity: 1;
}
.flag-source {
  left: 10px;
}
.flag-target {
  right: 10px;
}
.flag img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Loading Styles */
.loading {
  margin-top: 20px;
  text-align: center;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #daa520;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
