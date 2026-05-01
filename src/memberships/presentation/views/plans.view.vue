<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { listPlansQuery } from '../../application/list-plan.query.js'

const { t, tm, locale } = useI18n()

const serverPlans = ref([])

onMounted(async () => {
  try {
    serverPlans.value = await listPlansQuery()
  } catch (e) {
    console.warn('Plans API error:', e)
    serverPlans.value = []
  }
})

const priceById = computed(() => {
  const m = new Map()
  for (const p of serverPlans.value || []) m.set(String(p.id).toLowerCase(), p.price)
  return m
})

function formatPrice(n) {
  if (typeof n !== 'number') return ''
  if (n === 0) return t('plans.basic.price')
  const symbol = locale.value === 'es' ? 'S/' : '$'
  return `${symbol}${n}`
}

const plans = computed(() => {
  const P = tm('plans') || {}
  const get = (id, key, fb = '') => (P?.[id]?.[key] ?? fb)
  const ids = ['premium', 'basic', 'exclusive']
  return ids.map(id => {
    const priceNum = priceById.value.get(id)
    const priceText = (typeof priceNum === 'number')
        ? formatPrice(priceNum)
        : (get(id, 'price', '') || '')
    return {
      key: id,
      name: get(id, 'name', id.toUpperCase()),
      priceText,
      period: get(id, 'period', ''),
      cta: get(id, 'button', t('home.view') || 'Elegir'),
      tagline: get(id, 'tagline', ''),
      features: Array.isArray(get(id, 'features')) ? get(id, 'features') : [],
      popular: id === 'basic',
      popularText: P?.basic?.popular || 'Popular'
    }
  })
})

const displayPrice = (p) => p.period ? `${p.priceText} ${p.period}` : p.priceText
const router = useRouter()

function goToPayment(planKey) {
  router.push({ path: '/memberships/payment', query: { planId: planKey } })
}
</script>

<template>
  <section class="wrap plans-page">
    <span class="section-kicker">{{ $t('plans.title') }}</span>
    <h1 class="section-title">{{ $t('plans.title') }}</h1>
    <p class="section-lead">{{ $t('plans.subtitle') }}</p>

    <div class="common-benefits">
      <span class="benefit">{{ $t('plans.common.noCommitment') }}</span>
      <span class="benefit">{{ $t('plans.common.securePayments') }}</span>
      <span class="benefit">{{ $t('plans.common.support') }}</span>
    </div>

    <div class="plans-grid">
      <article
          v-for="p in plans"
          :key="p.key"
          class="plan-card"
          :class="{ '--popular': p.popular }"
      >
        <header class="plan-head">
          <h3 class="plan-name">{{ p.name }}</h3>
          <div class="price">
            <span class="price-main">{{ displayPrice(p) }}</span>
          </div>
          <div v-if="p.popular" class="ribbon">
            <span>{{ p.popularText }}</span>
          </div>
        </header>

        <ul class="features" v-if="p.features?.length">
          <li v-for="(f, i) in p.features" :key="i">
            <span class="dot"></span>
            <span>{{ f }}</span>
          </li>
        </ul>

        <footer class="plan-cta">
          <button class="btn cta" @click="goToPayment(p.key)">{{ p.cta }}</button>
          <p class="tagline" v-if="p.tagline">{{ p.tagline }}</p>
        </footer>
      </article>
    </div>

    <div style="text-align:center; margin-top: 28px;">
      <p class="meta">
        {{ $t('plans.ctaHelp') }}
        <RouterLink to="/contact" style="color: var(--orange); font-weight: 700; text-decoration: none;">
          {{ $t('plans.ctaContact') }}
        </RouterLink>
      </p>
    </div>
  </section>
</template>
