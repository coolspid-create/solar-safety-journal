"use client";

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/Button';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isMarketingChecked, setIsMarketingChecked] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email.trim()) {
            setErrorMessage('이메일을 입력해주세요.');
            return;
        }
        if (!isPrivacyChecked) {
            setErrorMessage('개인정보 수집 및 이용에 동의해야 합니다.');
            return;
        }

        setStatus('loading');

        try {
            // EmailJS Configuration
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

            if (!serviceId || !templateId || !publicKey) {
                console.warn('EmailJS environment variables are missing.');
            }

            const templateParams = {
                email: email, // Matches {{email}} in template
                subscription_email: email,
                marketing_agreed: isMarketingChecked ? 'Yes' : 'No',
                to_email: 'coolspid@gmail.com',
                message: 'New Newsletter Subscription',
                from_name: 'Solar Safety Journal'
            };

            console.log('발송 시작 (Sending EmailJS with params):', templateParams);

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setStatus('success');
            setEmail('');
            setIsPrivacyChecked(false);
            setIsMarketingChecked(false);
        } catch (error: any) {
            console.error('EmailJS Error:', JSON.stringify(error));
            if (error?.text) {
                console.error('Error Details:', error.text);
            }
            setStatus('error');
            setErrorMessage(`구독 신청 실패: ${error?.text || '알 수 없는 오류가 발생했습니다.'}`);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 주소를 입력해주세요"
                        className="flex-grow bg-white border border-gray-300 rounded-full px-6 py-4 text-base focus:outline-none focus:border-[var(--color-solar-orange)] focus:ring-1 focus:ring-[var(--color-solar-orange)] transition-shadow placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-8 py-4 bg-[var(--color-solar-orange)] text-white text-lg font-bold rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {status === 'loading' ? '처리중...' : '구독하기'}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start mt-2 px-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPrivacyChecked}
                            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[var(--color-solar-orange)] focus:ring-[var(--color-solar-orange)]"
                        />
                        <span className="text-sm text-gray-500">
                            (필수) <span className="underline decoration-1 underline-offset-2 hover:text-gray-800">개인정보 수집 및 이용에 동의합니다.</span>
                        </span>
                    </label>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-sm font-medium text-center sm:text-left px-2">{errorMessage}</p>
                )}

                {status === 'success' && (
                    <div className="text-green-600 text-sm font-bold text-center sm:text-left px-2">
                        🎉 구독 신청이 완료되었습니다!
                    </div>
                )}
            </form>
        </div>
    );
}
