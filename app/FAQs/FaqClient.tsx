"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronsRight } from "lucide-react"
import { isPageVisible } from "@/lib/api/pageVisibility"
import { useRouter } from "next/navigation"

interface FAQItem {
  _id: string
  question: string
  answer: string
  showOnFAQPage: boolean
}

interface FormData {
  fastName: string
  phoneNumber: string
  emailAddress: string
  serviceType: string
  message: string
}

const FaqClient: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [openIndex, setOpenIndex] = useState<number>(0)
  const [formData, setFormData] = useState<FormData>({
    fastName: "",
    phoneNumber: "",
    emailAddress: "",
    serviceType: "",
    message: "",
  })

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("faqs")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
    fetchFAQs()
  }, [router])

  const fetchFAQs = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/faqs")
      const data = await response.json()
      const faqPageFAQs = data.filter((faq: FAQItem) => faq.showOnFAQPage)
      setFaqs(faqPageFAQs)
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
  }

  if (!isVisible) {
    return null
  }

  if (loading) {
    return <div className="text-center py-10">Loading FAQs...</div>
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <>
      <div className="max-w-5xl mx-auto bg-[var(--color-background)] text-[var(--color-foreground)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="px-8 grid md:grid-cols-2 items-center mb-10">
            <div>
              <p className="text-[var(--color-primary)] text-sm font-medium mb-2">Great Experience in building</p>
              <h2 className="text-4xl font-bold text-[var(--color-page-heading)] leading-tight">
                Frequently Asked
                <br />
                Any Questions
              </h2>
            </div>

            <div>
              <p className="text-[var(--color-paragraph)] text-sm leading-relaxed">
                Aliquam tempus libero eget arcu euismod. In bibendum nisl posuere. Donec gravida sem eu odio rhoncus
                viverra. In vel cursus ante.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-items-center gap-10">
            <div className="relative w-full">
              <div className="relative w-auto h-72 sm:w-full sm:h-96 mb-4">
                <Image src="/FAQ/FAQ_01.png" alt="Construction worker" fill className="object-contain" />
              </div>

              <div className="relative mt-5 sm:right-20 sm:bottom-20 w-auto h-56 sm:w-full sm:h-72 sm:-mt-12">
                <Image src="/FAQ/FAQ_02.png" alt="Construction workers" fill className="object-contain" />
              </div>
            </div>

            <div className="w-full">
              <div className="space-y-0">
                {faqs.map((faq, index) => (
                  <div key={faq._id} className="border-b border-[var(--color-border)]">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between py-3 text-left group"
                    >
                      <h3 className="text-base font-semibold text-[var(--color-header-text)] pr-4">
                        {faq.question}
                      </h3>
                      <span className="flex-shrink-0 text-[var(--color-primary)] text-xl font-light">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openIndex === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[var(--color-paragraph)] text-sm leading-relaxed pb-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default FaqClient
