"use client"

import { X, MessageCircle, Mail } from "lucide-react"

interface ReplyModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  phone: string
}

export default function ReplyModal({ isOpen, onClose, email, phone }: ReplyModalProps) {
  if (!isOpen) return null

  const handleWhatsApp = () => {
    const message = "Hi, "
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodedMessage}`, "_blank")
    onClose()
  }

  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=Re: Your Quote Request`
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Choose Reply Method</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <MessageCircle size={20} className="text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">WhatsApp</p>
              <p className="text-sm text-gray-600">{phone}</p>
            </div>
          </button>

          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-[#ff6600] transition-colors"
          >
            <Mail size={20} className="text-[#ff6600]" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
