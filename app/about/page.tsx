import React from 'react';
import { Metadata } from 'next';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NewsletterForm from "@/components/news/NewsletterForm";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: 'About Us | Solar Safety Journal',
    description: 'Vision and mission of Solar Safety Journal.',
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-['Montserrat',sans-serif]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-24 bg-gray-50 border-b border-gray-100">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-12 w-12 bg-gradient-to-br from-[var(--color-solar-orange)] to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-[#1a202c] tracking-tighter">
                                <span className="text-[var(--color-solar-orange)]">Solar</span> Safety Journal
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            태양광 산업의 안전한 미래를<br />함께 만들어갑니다.
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Solar Safety Journal은 태양광 발전 시설의 안전 중심 가치를 전달하고,<br className="hidden md:block" /> 최신 산업 동향을 제공하여 지속 가능한 에너지 생태계를 구축하는 데 기여합니다.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            {/* Mission */}
                            <div className="space-y-6">
                                <Badge variant="orange" className="mb-2">Our Mission</Badge>
                                <h2 className="text-3xl font-bold text-gray-900">현장 중심의<br />안전 가치 전달</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    우리는 태양광 발전소 현장에서 발생하는 다양한 안전 문제를 심도 있게 다룹니다.
                                    단순한 정보 전달을 넘어, 실질적인 해결책과 가이드라인을 제시하여
                                    작업자와 관리자 모두가 안전한 환경에서 일할 수 있도록 돕습니다.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="space-y-6">
                                <Badge variant="green" className="mb-2">Our Vision</Badge>
                                <h2 className="text-3xl font-bold text-gray-900">지속 가능한<br />안전 생태계 구축</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    국내 태양광 산업이 양적 성장을 넘어 질적 성장을 이룰 수 있도록,
                                    안전 문화를 정착시키고 관련 법규와 정책의 올바른 방향성을 제시합니다.
                                    안전이 곧 경쟁력이 되는 시대를 선도합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Activities Section */}
                <section className="py-20 bg-gray-50/50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Activities</h2>
                            <p className="text-gray-600">우리는 다음과 같은 핵심 활동을 통해 가치를 창출합니다.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 text-[var(--color-solar-orange)]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Industry News</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    태양광 업계의 최신 뉴스, 기술 동향, 시장 변화를 신속하고 정확하게 전달합니다.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Insight</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    현장 점검 체크리스트, 유지보수 매뉴얼 등 실무에 즉시 적용 가능한 안전 가이드를 제공합니다.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Regulation & Policy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    복잡한 법규와 정책을 알기 쉽게 풀이하고, 사업자가 알아야 할 필수 리스크 관리 정보를 분석합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="bg-orange-50/50 py-20 border-t border-orange-100">
                    <div className="container mx-auto px-4 text-center">
                        <Badge variant="orange" className="mb-4">Newsletter</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                            안전한 미래를 위한 인사이트,<br />놓치지 마세요.
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            매주 발행되는 뉴스레터를 통해 최신 안전 정보와 업계 소식을 가장 먼저 받아보세요.
                        </p>
                        <NewsletterForm />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
