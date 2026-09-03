
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
  const section4Items = t.raw('section4.items')
  const section5Items = t.raw('section5.items')
  const section6Items = t.raw('section6.items')
  const section9Items = t.raw('section9.items')

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto md:px-10 lg:px-12 px-4 py-8 sm:px-6 sm:py-12">

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

          {/* Section 1 */}
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

          {/* Section 2 */}
          <PolicySection number={2} title={t('section2.title')}>
            <p>{t('section2.description')}</p>
            <PolicyList items={section2Items} />
          </PolicySection>

          {/* Section 3 */}
          <PolicySection number={3} title={t('section3.title')}>
            <p>{t('section3.description1')}</p>
            <p>{t('section3.description2')}</p>

            <PolicyList items={section3Items} />

            <p>{t('section3.footer')}</p>
          </PolicySection>

          {/* Section 4 */}
          <PolicySection number={4} title={t('section4.title')}>
            <PolicyList items={section4Items} />
          </PolicySection>

          {/* Section 5 */}
          <PolicySection number={5} title={t('section5.title')}>
            <p>{t('section5.description')}</p>

            <PolicyList items={section5Items} />

            <p>{t('section5.contact')}</p>
          </PolicySection>

          {/* Section 6 */}
          <PolicySection number={6} title={t('section6.title')}>
            <p>{t('section6.description')}</p>

            <PolicyList items={section6Items} />

            <p>{t('section6.footer')}</p>
          </PolicySection>

          {/* Section 7 */}
          <PolicySection number={7} title={t('section7.title')}>
            <p>{t('section7.description')}</p>
          </PolicySection>

          {/* Section 8 */}
          <PolicySection number={8} title={t('section8.title')}>
            <p>{t('section8.description')}</p>

            <p>{t('section8.email')}</p>
            <p>{t('section8.website')}</p>
          </PolicySection>

          {/* Section 9 */}
          <PolicySection number={9} title={t('section9.title')}>
            <p>{t('section9.description')}</p>

            <PolicyList items={section9Items} />
          </PolicySection>

          {/* Section 10 - Business Information */}
          <PolicySection number={10} title={t('section10.title')}>
            <p>{t('section10.description')}</p>

            <div className="flex flex-col gap-2">
              <p>
                <strong>{t('section10.nameLabel')}:</strong>{' '}
                {t('section10.name')}
              </p>

              <p>
                <strong>{t('section10.addressLabel')}:</strong>{' '}
                {t('section10.address')}
              </p>

              <p>
                <strong>{t('section10.idLabel')}:</strong>{' '}
                {t('section10.id')}
              </p>
            </div>
          </PolicySection>

        </div>
      </div>
    </main>
  )
}