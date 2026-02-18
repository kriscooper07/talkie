import { ref, watch, computed } from 'vue'

export function useTranslator() {
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
    fr: 'fr',
    de: 'de',
    it: 'it',
    pt: 'pt',
    nl: 'nl',
    sv: 'se',
    no: 'no',
    da: 'dk',
    fi: 'fi',
    pl: 'pl',
    cs: 'cz',
    sk: 'sk',
    hu: 'hu',
    ro: 'ro',
    bg: 'bg',
    el: 'gr',
    hr: 'hr',
    sr: 'rs',
    sl: 'si',
    et: 'ee',
    lv: 'lv',
    lt: 'lt',
    ru: 'ru',
    uk: 'ua',
    is: 'is',
    ja: 'jp',
    zh: 'cn',
    ar: 'sa',
    hi: 'in',
    th: 'th',
    vi: 'vn',
    id: 'id',
    ms: 'my',
    tl: 'ph',
    ceb: 'ph',
    ilo: 'ph',
    hil: 'ph',
    bik: 'ph',
    war: 'ph',
    my: 'mm',
    km: 'kh',
    lo: 'la',
    ta: 'lk',
    si: 'lk'
  }

  const currentFlagSource = computed(() => flagMap[sourceLang.value] || 'us')
  const currentFlagTarget = computed(() => flagMap[targetLang.value] || 'us')

  let timeoutId = null

  watch(
    inputText,
    (newVal) => {
      if (timeoutId) clearTimeout(timeoutId)

      if (newVal.trim()) {
        timeoutId = setTimeout(() => {
          translateText()
        }, 1000)
      } else {
        translatedText.value = ''
      }
    },
    { immediate: true }
  )

  watch(sourceLang, () => {
    if (timeoutId) clearTimeout(timeoutId)
    if (inputText.value.trim()) translateText()
  })

  watch(targetLang, () => {
    if (timeoutId) clearTimeout(timeoutId)
    if (inputText.value.trim()) translateText()
  })

  async function translateText() {
    if (!inputText.value.trim()) return
    isLoading.value = true

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang.value}&tl=${targetLang.value}&dt=t&q=${encodeURIComponent(
          inputText.value
        )}`
      )
      const data = await response.json()
      translatedText.value = data[0][0][0]
    } catch (error) {
      console.error(error)
      translatedText.value = 'Translation failed. Dummy: ' + inputText.value
    } finally {
      isLoading.value = false
    }
  }

  return {
    inputText,
    translatedText,
    sourceLang,
    targetLang,
    isLoading,
    currentPage,
    languages,
    currentFlagSource,
    currentFlagTarget,
    translateText
  }
}
