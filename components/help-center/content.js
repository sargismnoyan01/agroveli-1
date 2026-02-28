"use client"

import { useTranslations } from "next-intl"
import { MessageSquareText, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PolicySection } from "@/components/privacy-policy/policy-section";
import { PolicyList } from "@/components/privacy-policy/policy-list";

export function HelpCenterContent() {
  const t = useTranslations("helpCenter")

  const registrationItems= t
    .raw("section2.items")

  const loginItems = t
    .raw("section3.items")

  const steps = t
    .raw("section4.steps")

  const faqQ2Items = t
    .raw("faq.q2.items")

  return (
    <main className="mx-auto  md:px-10 lg:px-12 px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl md:text-3xl text-balance">
          {t("title")}
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-brand text-brand hover:bg-policy-accent/5">
            <MessageSquareText className="size-4" />
            {t("writeButton")}
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-brand text-brand hover:bg-policy-accent/5">
            <PhoneCall className="size-4" />
            {t("callButton")}
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-8">
        {/* Section 1 - What is Agroveli */}
        <PolicySection number={1} title={t("section1.title")}>
          <p>{t("section1.line1")}</p>
          <p>{t("section1.line2")}</p>
          <p>{t("section1.line3")}</p>
        </PolicySection>

        {/* Section 2 - Registration */}
        <PolicySection number={2} title={t("section2.title")}>
          <p>{t("section2.description")}</p>
          <PolicyList items={registrationItems} />
          <p>{t("section2.footer")}</p>
        </PolicySection>

        {/* Section 3 - Login */}
        <PolicySection number={3} title={t("section3.title")}>
          <p>{t("section3.description")}</p>
          <PolicyList items={loginItems} />
          <p>{t("section3.footer")}</p>
        </PolicySection>

        {/* Section 4 - How to add a listing */}
        <PolicySection number={4} title={t("section4.title")}>
          <ol className="flex flex-col gap-1 pl-2">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground sm:text-base"
              >
                <span className="flex-shrink-0 text-muted-foreground">
                  {index + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </PolicySection>
      </div>

      {/* FAQ Section */}
      <div className="mt-10 sm:mt-14">
        <h2 className="text-lg font-bold text-foreground sm:text-xl md:text-2xl text-balance">
          {t("faq.title")}
        </h2>

        <Accordion type="multiple" defaultValue={["faq-1", "faq-2"]} className="mt-6">
          {/* FAQ 1 */}
          <AccordionItem value="faq-1" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)]  px-4 sm:px-6 border-b-0 mb-3">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"1. " + t("faq.q1.question")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-base">
              <div className="flex flex-col gap-1">
                <p>{t("faq.q1.answer1")}</p>
                <p>{t("faq.q1.answer2")}</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 2 */}
          <AccordionItem value="faq-2" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)] px-4 sm:px-6 border-b-0 mb-3">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"2. " + t("faq.q2.question")}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-base">
              <div className="flex flex-col gap-2">
                <p>{t("faq.q2.intro")}</p>
                <PolicyList items={faqQ2Items} />
                <p>{t("faq.q2.footer")}</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 3 */}
          <AccordionItem value="faq-3" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)]  px-4 sm:px-6 border-b-0 mb-3">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"3. " + t("faq.q3.question")}
            </AccordionTrigger>
            <AccordionContent />
          </AccordionItem>

          {/* FAQ 4 */}
          <AccordionItem value="faq-4" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)]  px-4 sm:px-6 border-b-0 mb-3">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"4. " + t("faq.q4.question")}
            </AccordionTrigger>
            <AccordionContent />
          </AccordionItem>

          {/* FAQ 5 */}
          <AccordionItem value="faq-5" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)]  px-4 sm:px-6 border-b-0 mb-3">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"5. " + t("faq.q5.question")}
            </AccordionTrigger>
            <AccordionContent />
          </AccordionItem>

          {/* FAQ 6 */}
          <AccordionItem value="faq-6" className="rounded-lg md:shadow-[0_0_20px_rgba(0,0,0,0.12)]  px-4 sm:px-6 border-b-0">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
              {"6. " + t("faq.q6.question")}
            </AccordionTrigger>
            <AccordionContent />
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}
