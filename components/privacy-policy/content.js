'use client'

import { useTranslations } from 'next-intl'
import { PolicySection } from './policy-section'
import { PolicySubsection } from './policy-subsection'
import { PolicyList } from './policy-list'

export function PrivacyPolicyContent() {
  const t = useTranslations('privacyPolicy')

  const section1Sub1Items = t.raw('section1.sub1.items')
  const section1Sub2Items = t.raw('section1.sub2.items')
  const section1Sub3Items = t.raw('section1.sub3.items')
  const section1Sub4Items = t.raw('section1.sub4.items')
  const section2Items = t.raw('section2.items')
  const section3Items = t.raw('section3.items')

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto  md:px-10 lg:px-12 px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-lg font-bold text-foreground sm:text-xl md:text-xl text-balance">
            {t('title')}
          </h1>
          <p className="mt-1 text-xs text-policy-accent-foreground sm:text-sm text-brand">
            {t('lastUpdated')}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('intro')}
          </p>
        </header>

        {/* Sections */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Section 1: What data we collect */}
          <PolicySection number={1} title={t('section1.title')}>
            <p>{t('section1.description')}</p>
            <div className="flex flex-col gap-4">
              <PolicySubsection
                number="1.1."
                title={t('section1.sub1.title')}
                items={section1Sub1Items}
              />
              <PolicySubsection
                number="1.2."
                title={t('section1.sub2.title')}
                items={section1Sub2Items}
              />
              <PolicySubsection
                number="1.3."
                title={t('section1.sub3.title')}
                items={section1Sub3Items}
              />
              <PolicySubsection
                number="1.4."
                title={t('section1.sub4.title')}
                items={section1Sub4Items}
              />
            </div>
          </PolicySection>

          {/* Section 2: How we use your data */}
          <PolicySection number={2} title={t('section2.title')}>
            <p>{t('section2.description')}</p>
            <PolicyList items={section2Items} />
          </PolicySection>

          {/* Section 3: Data sharing */}
          <PolicySection number={3} title={t('section3.title')}>
            <p>{t('section3.description1')}</p>
            <p>{t('section3.description2')}</p>
            <PolicyList items={section3Items} />
            <p>{t('section3.footer')}</p>
          </PolicySection>

        </div>
      </div>
    </main>
  )
}
