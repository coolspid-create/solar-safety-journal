import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-[var(--color-dark-grey)] text-white py-10 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Solar Safety Journal</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Providing the latest news, safety guidelines, and policy updates for the solar energy industry. Dedicated to a safer, sustainable future.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--color-solar-orange)]">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter/Contact */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--color-solar-orange)]">Connect</h4>
                        <div className="flex space-x-4 mb-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[var(--color-solar-orange)] transition-colors cursor-pointer">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[var(--color-solar-orange)] transition-colors cursor-pointer">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            &copy; 2026 Solar Safety Journal. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
