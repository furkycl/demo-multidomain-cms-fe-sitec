'use client';

import { useState } from 'react';
import type { ContactFormBlock } from '@/lib/types';
import type { Locale } from '@/lib/locales';
import { submitLead } from '@/lib/api';

export function ContactForm({
  content,
  locale,
}: {
  content: ContactFormBlock['content'];
  locale: Locale;
}) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      name: fd.get('name')?.toString() ?? '',
      email: fd.get('email')?.toString() ?? '',
      phone: fd.get('phone')?.toString() ?? '',
      message: fd.get('message')?.toString() ?? '',
      course_interest: fd.get('course_interest')?.toString() ?? '',
    };

    const utm = {
      source: new URLSearchParams(window.location.search).get('utm_source') ?? undefined,
      medium: new URLSearchParams(window.location.search).get('utm_medium') ?? undefined,
      campaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? undefined,
    };

    const result = await submitLead({
      locale,
      formType: content.form_type ?? 'contact',
      payload,
      utm,
    });

    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'unknown_error');
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="px-6 py-16 max-w-2xl mx-auto text-center">
        <div className="border border-green-300 bg-green-50 text-green-800 rounded-lg p-8">
          <div className="text-4xl mb-3">✓</div>
          <h2 className="text-2xl font-bold mb-2">{content.success_message ?? 'Teşekkürler!'}</h2>
          <p>En kısa sürede size dönüş yapacağız.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="px-6 py-16 max-w-2xl mx-auto">
      {content.title && <h2 className="text-3xl font-bold mb-2">{content.title}</h2>}
      {content.intro && <p className="text-lg opacity-80 mb-6">{content.intro}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ad Soyad</label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        {content.show_phone !== false && (
          <div>
            <label className="block text-sm font-medium mb-1">Telefon</label>
            <input
              name="phone"
              type="tel"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}
        {content.show_course_interest && (
          <div>
            <label className="block text-sm font-medium mb-1">İlgilendiğiniz kurs</label>
            <input
              name="course_interest"
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}
        {content.show_message !== false && (
          <div>
            <label className="block text-sm font-medium mb-1">Mesaj</label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {status === 'error' && (
          <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-3">
            Bir hata oluştu: {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Gönderiliyor...' : (content.cta_label ?? 'Gönder')}
        </button>
        <p className="text-xs opacity-60 text-center">
          Form gönderildiğinde dilinize göre doğru ekibe yönlendirilirsiniz.
        </p>
      </form>
    </section>
  );
}
