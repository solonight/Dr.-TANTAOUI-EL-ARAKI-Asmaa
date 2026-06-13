import React, { useState } from 'react'
import doctor from '../data/doctorData'

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneDigits = doctor.phone.replace(/\D/g, '')
  const email = doctor.email
  const locationQuery = encodeURIComponent(doctor.address)
  const whatsappMessage = encodeURIComponent(`Hello ${doctor.name}, I would like to inquire about an appointment.`)

  const actions = [
    {
      id: 'location',
      label: 'Location',
      href: `https://www.google.com/maps/search/?api=1&query=${locationQuery}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
        </svg>
      ),
      color: '#3B82F6'
    },
    {
      id: 'call',
      label: 'Call',
      href: `tel:${phoneDigits}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 3.11 1 1 0 014 2h4.09a1 1 0 011 .75 12.75 12.75 0 00.7 2.63 1 1 0 01-.23 1l-2.1 2.1a16 16 0 006.98 7l2.09-2.09a1 1 0 011-.24 12.7 12.7 0 002.66.7 1 1 0 01.76 1V16.92z" fill="currentColor" />
        </svg>
      ),
      color: '#10B981'
    },
    {
      id: 'email',
      label: 'Email',
      href: `mailto:${email}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
        </svg>
      ),
      color: '#F59E0B'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/${phoneDigits}?text=${whatsappMessage}`,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M20.52 3.48A11.93 11.93 0 1 0 23.999 12c0-3.21-1.25-6.28-3.48-8.52z" fill="currentColor" opacity="0.06" />
          <path d="M17.472 14.382c-.295-.148-1.742-.859-2.014-.959-.273-.099-.472-.148-.671.15-.2.295-.774.959-.95 1.156-.174.198-.347.222-.642.074-1.745-.873-2.89-1.557-4.057-3.342-.305-.526.305-.49.882-1.62.099-.198.05-.37-.025-.518-.074-.148-.671-1.611-.918-2.2-.242-.578-.487-.5-.671-.51l-.573-.01c-.198 0-.518.074-.79.372s-1.037 1.014-1.037 2.479 1.062 2.87 1.21 3.07c.148.198 2.093 3.19 5.063 4.47 1.41.608 2.508.971 3.37 1.244 1.414.45 2.704.387 3.724.235.113-.055.344-.148.393-.295.05-.148.05-.548.05-.99 0-.44-.164-.152-.459-.295z" fill="currentColor" />
        </svg>
      ),
      color: '#25D366'
    }
  ]

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[9999]">
      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 mb-3">
        {actions.map((action, index) => (
          <div
            key={action.id}
            className={`flex items-center justify-end gap-3 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="bg-[var(--card)] px-3 py-1 rounded-lg shadow-md text-[var(--text)] text-sm">
              {action.label}
            </span>
            <a
              href={action.href}
              target={action.href.startsWith('http') ? '_blank' : '_self'}
              rel={action.href.startsWith('http') ? 'noreferrer' : ''}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              style={{ backgroundColor: action.color }}
              aria-label={action.label}
            >
              {action.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-10"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white dark:text-gray-900 md:w-8 md:h-8">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </button>
    </div>
  )
}
