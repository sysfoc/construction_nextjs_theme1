// app/jobs/apply/JobApply.tsx
"use client"

export const dynamic = "force-dynamic"

import type React from "react"


import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { isPageVisible } from "@/lib/api/pageVisibility"

export default function JobApply() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const position = searchParams.get("position") || ""
  const [isVisible, setIsVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("jobs")
      setIsVisible(visible)
      if (!visible) {
        router.push("/not-found")
      }
    }
    checkVisibility()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const cvFile = formData.get("cv") as File

    let cvBase64 = ""
    if (cvFile) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        cvBase64 = reader.result as string

        try {
          const response = await fetch("/api/job-applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.get("fname"),
              lastName: formData.get("lname"),
              email: formData.get("email"),
              location: formData.get("location"),
              phone: formData.get("phone"),
              position: formData.get("position"),
              cv: cvBase64,
              coverLetter: formData.get("coverLetter"),
            }),
          })

          if (response.ok) {
            setSubmitted(true)
            window.scrollTo(0, 0)
            setTimeout(() => {
              router.push("/careers")
            }, 2000)
          }
        } catch (error) {
          console.error("Error submitting application:", error)
        } finally {
          setLoading(false)
        }
      }
      reader.readAsDataURL(cvFile)
    }
  }

  if (!isVisible) {
    return null
  }

  if (submitted) {
    return (
      <section className="my-20 flex items-center justify-center">
        <div className="px-4 w-full md:max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Application Submitted</h2>
          <p className="text-[var(--paragraph-color)]">
            Thank you for applying! We will review your application and get back to you soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="my-20 flex items-center justify-center">
        <div className="px-4 w-full md:max-w-5xl">
          <div className="text-center">
            <span className="text-[var(--primary)]">Job Apply Now</span>
            <h2 className="text-3xl font-bold my-2 text-[var(--foreground)]">Apply for this Job</h2>
            <p className="mb-4 text-[var(--paragraph-color)]">
              Complete the form below to submit your application. We review all applications carefully.
            </p>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-sm font-medium text-[var(--foreground)]">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  autoComplete="on"
                  placeholder="First name"
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lname" className="text-sm font-medium text-[var(--foreground)]">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  autoComplete="on"
                  placeholder="Last name"
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="on"
                  placeholder="Email address"
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-sm font-medium text-[var(--foreground)]">
                  Location (city)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  autoComplete="on"
                  placeholder="City"
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-[var(--foreground)]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="on"
                  placeholder="Phone"
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="position" className="text-sm font-medium text-[var(--foreground)]">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={position}
                  readOnly
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 bg-gray-100 dark:bg-gray-800 cursor-not-allowed outline-none"
                />
              </div>
              <div className="flex flex-col md:col-span-2 gap-2">
                <label htmlFor="cv" className="text-sm font-medium text-[var(--foreground)]">
                  Upload CV
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  required
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <div className="flex flex-col md:col-span-2 gap-2">
                <label htmlFor="coverLetter" className="text-sm font-medium text-[var(--foreground)]">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  placeholder="Tell us why you're interested in this position..."
                  className="border border-[var(--border-color)] text-[var(--foreground)] text-sm rounded-lg w-full p-2.5 placeholder:text-[var(--paragraph-color)] outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--primary)] hover:bg-opacity-90 disabled:opacity-50 text-[var(--primary-foreground)] text-sm font-semibold px-4 py-2.5 rounded-lg uppercase cursor-pointer transition-all"
              >
                {loading ? "Submitting..." : "Submit Now"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
