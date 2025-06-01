
export default function InfoCardSection() {
    return (
        <div className="max-w-7xl w-full mx-auto gap-y-4 items-center mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex h-full justify-center items-center">
                    <div className="flex h-full justify-between items-center w-full bg-linear-main rounded-3xl px-7 shadow-inner-shadow-1 p-4">
                        <div>
                            <h2 className="text-white font-semibold text-2xl">Visi dan Misi Sistem Informasi Jurnal (SIJ)</h2>
                            <p className="text-white font-normal text-lg mt-5">Menjadi platform rujukan utama dalam pencarian jurnal ilmiah nasional yang terpercaya, transparan, dan mudah diakses oleh seluruh civitas akademika di Indonesia.</p>
                        </div>
                            <img src="/images/imagecard.svg" alt="" className="hidden sm:flex"></img>
                    </div>
                </div>
                 <div className="flex h-full justify-center items-center">
                    <div className="flex h-full justify-between items-center w-full bg-linear-main rounded-3xl px-7 shadow-inner-shadow-1 p-4">
                        <div>
                            <h2 className="text-white font-semibold text-2xl">Tujuan Sistem Informasi Jurnal (SIJ)</h2>
                            <p className="text-white font-normal text-lg mt-5">Menyediakan akses informasi jurnal ilmiah yang cepat, relevan, dan terstruktur guna menunjang kebutuhan publikasi civitas akademika secara lebih efisien dan tepat sasaran.</p>
                        </div>
                            <img src="/images/imagecard1.svg" alt="" className="hidden sm:flex"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}