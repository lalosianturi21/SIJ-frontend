
export default function InfoCardSection() {
    return (
        <div className="max-w-7xl w-full mx-auto gap-y-4 items-center mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex h-full justify-center items-center">
                    <div className="flex h-full justify-between items-center w-full bg-linear-main rounded-3xl px-7 shadow-inner-shadow-1 p-4">
                        <div>
                            <h2 className="text-white font-semibold text-2xl">Ada kendala terkait data Pendidikan Tinggi?</h2>
                            <p className="text-white font-normal text-lg mt-5">Cari informasi <a href="https://kanalpengetahuandikti.kemdiktisaintek.go.id" target="_blank" className="underline font-semibold cursor-pointer" rel="noreferrer">di sini</a>!</p>
                        </div>
                            <img src="/images/imagecard.svg" alt="" className="hidden sm:flex"></img>
                    </div>
                </div>
                 <div className="flex h-full justify-center items-center">
                    <div className="flex h-full justify-between items-center w-full bg-linear-main rounded-3xl px-7 shadow-inner-shadow-1 p-4">
                        <div>
                            <h2 className="text-white font-semibold text-2xl">Cari tahu perbedaannya!</h2>
                            <p className="text-white font-normal text-lg mt-5">Komparasi perguruan tinggi dan program studi impianmu <a href="/allinstitutions" target="_blank" className="underline font-semibold cursor-pointer" rel="noreferrer">di sini</a>!</p>
                        </div>
                            <img src="/images/imagecard1.svg" alt="" className="hidden sm:flex"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}