export default function GraduateStatsCard() {
    return (
        <div className="flex-col max-w-7xl justify-center items-center mx-auto mt-8">
            <div className="flex w-full justify-between text-secondary-main items-center">
                <div className="flex items-center gap-1 sm:gap-4 text-2xl">
                    <h1 className="sm:w-full w-[140px] font-medium">Bidang Ilmu Terpopuler</h1>
                    <span className="relative"><svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.1426C16.9706 21.1426 21 17.1131 21 12.1426C21 7.17202 16.9706 3.14258 12 3.14258C7.02944 3.14258 3 7.17202 3 12.1426C3 17.1131 7.02944 21.1426 12 21.1426Z" stroke="#BB3CC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.14355H12.01V8.15355H12V8.14355Z" stroke="#BB3CC6" strokeWidth="2" strokeLinejoin="round"></path><path d="M12 12.1426V16.1426" stroke="#BB3CC6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                </div>
                <div className="cursor-pointer text-lg"><p>Lihat semua</p></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <a href="/program-studi/Pendidikan">
                    <div className="flex p-4 bg-white shadow-shadow-2 rounded-2xl gap-3 items-center cursor-pointer transition-all hover:translate-y-[-8px]">
                        <img src="https://pddikti.kemdiktisaintek.go.id/static/media/pendidikan.bedf68788d1578d09451.svg" alt="pendidikan"></img>
                        <div>
                            <h2 className="font-bold mb-2">Pendidikan</h2>
                            <p className="mb-1">Total Lulusan Mahasiswa: 11.489.637</p>
                            <p className="mb-1">Persentase Lulusan: 58,29%</p>
                        </div>
                    </div>
                </a>
                <a href="/program-studi/Pendidikan">
                    <div className="flex p-4 bg-white shadow-shadow-2 rounded-2xl gap-3 items-center cursor-pointer transition-all hover:translate-y-[-8px]">
                        <img src="https://pddikti.kemdiktisaintek.go.id/static/media/ekonomi.46275b27dbdb6737f8ad.svg" alt="pendidikan"></img>
                        <div>
                            <h2 className="font-bold mb-2">Ekonomi</h2>
                            <p className="mb-1">Total Lulusan Mahasiswa: 11.489.637</p>
                            <p className="mb-1">Persentase Lulusan: 58,29%</p>
                        </div>
                    </div>
                </a>
                 <a href="/program-studi/Pendidikan">
                    <div className="flex p-4 bg-white shadow-shadow-2 rounded-2xl gap-3 items-center cursor-pointer transition-all hover:translate-y-[-8px]">
                        <img src="https://pddikti.kemdiktisaintek.go.id/static/media/teknik.c1305397ce1cb7c9af46.svg" alt="pendidikan"></img>
                        <div>
                            <h2 className="font-bold mb-2">Teknik</h2>
                            <p className="mb-1">Total Lulusan Mahasiswa: 11.489.637</p>
                            <p className="mb-1">Persentase Lulusan: 58,29%</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}