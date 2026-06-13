import React, { useState } from 'react'
import doctor from '../data/doctorData'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name || !form.phone || !form.email || !form.date || !form.message) {
      setError('Please fill in all fields.')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setError('')

    // Simulation mode - just wait a second and show success
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setForm({ name: '', phone: '', email: '', date: '', message: '' })
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('error')
      setError('Something went wrong. Please try again later.')
    }
  }

  return (
    <section id="contact" className="py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-strong rounded-lg overflow-hidden">
          <div className="w-full h-64 md:h-full">
            <iframe
              title="clinic-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(doctor.address)}&output=embed`}
              className="w-full h-full border-0"
              style={{ filter: 'grayscale(0.2) contrast(0.9) brightness(0.8)', minHeight: 260 }}
              loading="lazy"
            />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">Visit the Clinic</h3>
            <p className="text-[var(--muted)] mb-3">{doctor.address}</p>
            <div className="flex gap-3 items-center">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-md glass cursor-pointer text-[var(--accent-cyan)]"
              >
                Open in Maps
              </a>

              <div className="text-sm text-[var(--muted)]">
                  <div>Phone: <a href={`tel:${doctor.phone.replace(/\s+/g,'')}`} className="text-[var(--accent-cyan)]">{doctor.phone}</a></div>
                  <div>Email: <a href={`mailto:${doctor.email}`} className="text-[var(--accent-gold)]">{doctor.email}</a></div>
                </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact & Appointment</h2>
          <p className="text-[var(--muted)] mb-6">Fill out the form to request an appointment. We'll confirm availability shortly.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-3 rounded border bg-transparent text-[var(--text)] border-transparent" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="p-3 rounded border bg-transparent text-[var(--text)] border-transparent" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 rounded border bg-transparent text-[var(--text)] border-transparent" />
            <input name="date" value={form.date} onChange={handleChange} type="date" className="p-3 rounded border bg-transparent text-[var(--text)] border-transparent" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows="4" className="p-3 rounded border bg-transparent text-[var(--text)] border-transparent" />

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-5 py-2 rounded-md btn-accent"
              >
                {status === 'sending' ? 'Sending...' : 'Submit'}
              </button>
            </div>

            {status === 'success' && <div className="text-sm text-green-600">Your appointment request was sent.</div>}
            {status === 'error' && <div className="text-sm text-red-600">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  )
}
