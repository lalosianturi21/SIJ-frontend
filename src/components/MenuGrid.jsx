

export default function MenuGrid() {
    return (
        <div className="max-w-7xl mt-10 flex justify-center items-center mx-auto">
            <div className="w-full grid grid-cols-6 lg:grid-cols-9 justify-center items-center gap-3 sm:gap-5">
                <a className="flex col-span-3 lg:col-span-3 h-[148px] bg-white justify-center text-center items-center shadow-shadow-2 rounded-lg hover:translate-y-[-8px] ease-in-out cursor-pointer transition-all" href="/countriesall" target="_top">
                    <div className="">
                        <div className="flex justify-center items-center mb-4">
                            <div id="book-wrapper" className="wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <defs>
                                        <radialGradient id="gradGlobe" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stop-color="#4FC3F7" />
                                            <stop offset="100%" stop-color="#0288D1" />
                                        </radialGradient>
                                        <linearGradient id="gradLines" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stop-color="#B3E5FC" />
                                            <stop offset="100%" stop-color="#0288D1" />
                                        </linearGradient>
                                    </defs>

                                    <circle cx="32" cy="32" r="24" fill="url(#gradGlobe)" />

                                    <ellipse cx="32" cy="32" rx="20" ry="24" fill="none" stroke="url(#gradLines)" stroke-width="1.5" />
                                    <ellipse cx="32" cy="32" rx="12" ry="24" fill="none" stroke="url(#gradLines)" stroke-width="1.5" />

                                    <circle cx="32" cy="32" r="20" fill="none" stroke="url(#gradLines)" stroke-width="1.5" />
                                    <circle cx="32" cy="32" r="12" fill="none" stroke="url(#gradLines)" stroke-width="1.5" />


                                    <line x1="8" y1="32" x2="56" y2="32" stroke="#E1F5FE" stroke-width="1.5" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-base font-medium">Negara</p>
                    </div>
                </a>
                <a className="flex col-span-3 lg:col-span-3 h-[148px] bg-white justify-center text-center items-center shadow-shadow-2 rounded-lg hover:translate-y-[-8px] ease-in-out cursor-pointer transition-all" href="/institutionsall" target="_top">
                    <div className="">
                        <div className="flex justify-center items-center mb-4">
                            <div id="book-wrapper" className="wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <defs>
                                        <linearGradient id="gradCampusBiru" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#0494DC" />
                                            <stop offset="100%" stop-color="#4FC3F7" />
                                        </linearGradient>

                                        <linearGradient id="gradWindowBiru" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#E0F7FF" />
                                            <stop offset="100%" stop-color="#B3E5FC" />
                                        </linearGradient>
                                    </defs>

                                    <path d="M32 6L6 20v4h4v30h16V38h12v16h16V24h4v-4L32 6z" fill="url(#gradCampusBiru)" />

                                    <path d="M14 54V26h6v28h-6zM44 54V26h6v28h-6zM25 54V38h6v16h-6zM33 38h6v16h-6V38z" fill="url(#gradCampusBiru)" />

                                    <path d="M6 20L32 6l26 14-26 14L6 20z" fill="url(#gradCampusBiru)" opacity="0.4" />

                                    <rect x="20" y="54" width="24" height="4" rx="1" fill="url(#gradCampusBiru)" />
                                    <rect x="22" y="58" width="20" height="2" rx="1" fill="url(#gradCampusBiru)" />

                                    <circle cx="18" cy="30" r="2" fill="url(#gradWindowBiru)" />
                                    <circle cx="46" cy="30" r="2" fill="url(#gradWindowBiru)" />
                                    <circle cx="18" cy="40" r="2" fill="url(#gradWindowBiru)" />
                                    <circle cx="46" cy="40" r="2" fill="url(#gradWindowBiru)" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-base font-medium">Perguruan Tinggi</p>
                    </div>
                </a>
                <a className="flex col-span-3 lg:col-span-3 h-[148px] bg-white justify-center text-center items-center shadow-shadow-2 rounded-lg hover:translate-y-[-8px] ease-in-out cursor-pointer transition-all" href="/languagesall" target="_top">
                    <div className="">
                        <div className="flex justify-center items-center mb-4">
                            <div id="book-wrapper" className="wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <defs>
                                        <linearGradient id="bubble1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#4FC3F7" />
                                            <stop offset="100%" stop-color="#0288D1" />
                                        </linearGradient>
                                        <linearGradient id="bubble2" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stop-color="#B3E5FC" />
                                            <stop offset="100%" stop-color="#039BE5" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 14h28c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H20l-8 6v-6h0c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4z"
                                        fill="url(#bubble1)" stroke="#0277BD" stroke-width="1.5" />

                                    <text x="20" y="30" font-size="16" fill="white" font-family="Arial" font-weight="bold">A</text>

                                    <path d="M36 32h16c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4h-6l-6 5v-5h-4c-2.2 0-4-1.8-4-4v-10c0-2.2 1.8-4 4-4z"
                                        fill="url(#bubble2)" stroke="#0288D1" stroke-width="1.5" />
                                    <text x="42" y="46" font-size="16" fill="white" font-family="Arial" font-weight="bold">文</text>
                                </svg>
                            </div>
                        </div>
                        <p className="text-base font-medium">Bahasa</p>
                    </div>
                </a>


            </div>
        </div>
    )
}