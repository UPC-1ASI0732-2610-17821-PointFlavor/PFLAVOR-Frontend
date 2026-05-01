<template>
  <div class="lang" role="group" aria-label="Language switcher">
    <button :class="['pill', current==='en' && 'active']" @click="switchTo('en')">EN</button>
    <button :class="['pill', current==='es' && 'active']" @click="switchTo('es')">ES</button>
  </div>
</template>

<script>
import { i18n, setLocale } from '@/i18n';

export default {
  name: 'LanguageSwitcher',
  computed: { current(){ return i18n.global.locale.value; } },
  methods: { switchTo(locale){ setLocale(locale); } }
}
</script>

<style scoped>
.lang{
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 1200;
  display: flex;
  gap: 6px;
  background: rgba(255,255,255,.75);
  backdrop-filter: blur(6px);
  padding: 6px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0,0,0,.10);
  border: 1px solid rgba(0,0,0,.06);
}
.pill{
  border: none;
  background: transparent;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
  color: #6f4228;
}
.pill.active{
  background: #e3891b;
  color: #fff;
}
</style>
