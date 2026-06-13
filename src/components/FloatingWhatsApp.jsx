import React from 'react'
import doctor from '../data/doctorData'

export default function FloatingWhatsApp() {
  const phoneDigits = doctor.phone.replace(/\D/g, '')
  const message = encodeURIComponent(`Hello ${doctor.name}, I would like to inquire about an appointment.`)
  const href = `https://wa.me/${phoneDigits}?text=${message}`

  return (
    <div className="whatsapp-fab fixed right-4 bottom-4 z-50">
      <a href={href} target="_blank" rel="noreferrer" aria-label="Open WhatsApp">
        <div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg pulse" style={{background: '#25D366'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M20.52 3.48A11.93 11.93 0 1 0 23.999 12c0-3.21-1.25-6.28-3.48-8.52z" fill="currentColor" opacity="0.06" />
            <path d="M17.472 14.382c-.295-.148-1.742-.859-2.014-.959-.273-.099-.472-.148-.671.15-.2.295-.774.959-.95 1.156-.174.198-.347.222-.642.074-1.745-.873-2.89-1.557-4.057-3.342-.305-.526.305-.49.882-1.62.099-.198.05-.37-.025-.518-.074-.148-.671-1.611-.918-2.2-.242-.578-.487-.5-.671-.51l-.573-.01c-.198 0-.518.074-.79.372s-1.037 1.014-1.037 2.479 1.062 2.87 1.21 3.07c.148.198 2.093 3.19 5.063 4.47 1.41.608 2.508.971 3.37 1.244 1.414.45 2.704.387 3.724.235.113-.055.344-.148.393-.295.05-.148.05-.548.05-.99 0-.44-.164-.152-.459-.295z" fill="currentColor" />
          </svg>
        </div>
      </a>
    </div>
  )
}
