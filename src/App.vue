<template>
  <div id="app" class="app-shell">
    <nav class="navbar">
      <div class="nav-container">
        <h2 class="nav-title">Talkie 🌎</h2>
        <ul class="nav-menu">
          <li>
            <button @click="currentPage = 'home'" :class="{ active: currentPage === 'home' }">
              Home
            </button>
          </li>
          <li>
            <button
              @click="currentPage = 'dictionary'"
              :class="{ active: currentPage === 'dictionary' }"
            >
              Dictionary
            </button>
          </li>
          <li>
            <button @click="currentPage = 'about'" :class="{ active: currentPage === 'about' }">
              About
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <main class="app-main">
      <div v-if="currentPage === 'home'" class="container">
        <div class="flag flag-source" v-if="inputText.trim()">
          <img
            :src="`https://flagcdn.com/32x24/${currentFlagSource}.png`"
            alt="Source language flag"
          />
        </div>

        <div class="flag flag-target" v-if="translatedText">
          <img
            :src="`https://flagcdn.com/32x24/${currentFlagTarget}.png`"
            alt="Target language flag"
          />
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
        <p>
          Talkie is a modern, easy-to-use language translation platform designed to help people
          communicate across the globe effortlessly. Whether you want to translate text, learn new
          phrases, or have real-time conversations in multiple languages, Talkie makes it simple and
          accessible.
          <br /><br />
          <strong>Key Features:</strong>
          <br /><br />
          Instant Text Translation: Type in your text and translate it into dozens of languages
          instantly.
          <br /><br />
          Multiple Languages Supported: From English, Spanish, and French to Hindi, Japanese, and
          Arabic — Talkie connects you to the world.
          <br /><br />
          User-Friendly Interface: Clean, minimal, and intuitive design so anyone can start
          translating without learning a complex system.
          <br /><br />
          Future-Ready: Designed to grow with voice translation, conversation mode, and mobile-friendly
          enhancements.
          <br /><br />
          Talkie bridges the gap between languages, making global communication seamless, fun, and fast
          — because connecting with people shouldn’t be limited by language.
        </p>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>© {{ year }} Talkie</span>
        <span class="footer-dot">•</span>
        <span>All rights reserved</span>
        <span class="footer-dot">•</span>
        <span>Made with ❤️ in PH</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useTranslator } from './composables/useTranslator'

const {
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
} = useTranslator()

const year = new Date().getFullYear()
</script>
