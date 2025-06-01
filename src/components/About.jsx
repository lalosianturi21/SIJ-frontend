import React from 'react'
import MainLayout from './MainLayout'

const About = () => {
  return (
    <MainLayout>
    <div className='w-full px-6 mt-[120px]'>
      <div className='mx-auto items-center justify-center max-w-7xl flex mt-[120px]'>
        <div className='pb-4 lg:text-l w-full justify-between text-m'>
            <span className='cursor-pointer'>Beranda</span>
            <span className="cursor-pointer"> &gt; </span>
            <span className="cursor-pointer font-semibold">Tentang SIJ</span>
        </div>
      </div>
      <div className='mx-auto items-center justify-center max-w-7xl flex my-5'>
        <div className='flex flex-col'>
            <div className='overflow-hidden rounded-md'>
                <div className='flex transition ease-out duration-1000'>
                    <img src="/images/banner1.png" alt="slide-0"></img>
                </div>
            </div>
        </div>
      </div>
      <div className='mx-auto items-center justify-center max-w-7xl flex my-5'>
         <h1 className='text-3xl font-semibold text-center'>Tentang Sistem Informasi Jurnal (SIJ)</h1>
      </div>
      <div className='mx-auto max-w-7xl flex my-5'>
       <p className='text-lg mt-4 text-justify'>
  <strong>Sistem Informasi Jurnal (SIJ)</strong> adalah platform digital yang dirancang untuk membantu akademisi, peneliti, dan mahasiswa dalam menemukan jurnal ilmiah yang relevan, kredibel, dan sesuai kebutuhan publikasi mereka. SIJ menyediakan fitur pencarian jurnal berbasis peringkat <strong>SINTA</strong> dan <strong>SCOPUS</strong>, biaya publikasi (APC), skema fast-track, periode publikasi, hingga informasi kontak penerbit jurnal secara terstruktur dan mudah diakses.
  <br /><br />
  Dalam dunia akademik yang semakin kompetitif, publikasi ilmiah menjadi elemen krusial dalam mendukung pengembangan ilmu pengetahuan. Namun, proses pencarian jurnal yang tepat seringkali memakan waktu dan membingungkan, terutama bagi peneliti pemula. SIJ hadir sebagai solusi untuk mempercepat proses pencarian jurnal dengan cara yang efisien, transparan, dan informatif.
  <br /><br />
  SIJ dibangun secara independen dengan pendekatan teknologi <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, dan Node.js) untuk menjamin performa, skalabilitas, dan kemudahan integrasi. Melalui antarmuka yang ramah pengguna, pengguna dapat memfilter jurnal berdasarkan berbagai kriteria seperti:
  <ul className="list-disc list-inside mt-2">
    <li>Peringkat jurnal (SQOPUS 1-4)</li>
    <li>Peringkat jurnal (SINTA 1–6)</li>
    <li>Skema fast-track atau reguler</li>
    <li>Biaya publikasi (gratis atau berbayar)</li>
    <li>Periode dan frekuensi terbit</li>
    <li>Kategori subjek atau bidang ilmu</li>
    <li>Kontak langsung dan alamat email editor</li>
  </ul>
  <br />
  Selain itu, platform ini memungkinkan pengguna untuk memberikan ulasan dan rating terhadap jurnal tertentu, sehingga tercipta ekosistem yang kolaboratif dan saling mendukung antar peneliti.
  <br /><br />
  <strong>Visi dari SIJ</strong> adalah menjadi platform referensi utama dalam pencarian jurnal ilmiah di Indonesia yang bersifat inklusif, transparan, dan terpercaya. Sedangkan <strong>misi kami</strong> mencakup:
  <ol className="list-decimal list-inside mt-2">
    <li>Menyediakan akses terbuka terhadap informasi jurnal ilmiah secara akurat dan terstruktur.</li>
    <li>Mempercepat proses pencarian dan seleksi jurnal untuk kebutuhan publikasi.</li>
    <li>Mendorong transparansi biaya publikasi dan proses editorial dari berbagai jurnal ilmiah.</li>
    <li>Menjadi media yang menjembatani antara penulis dan pengelola jurnal secara langsung.</li>
  </ol>
  <br />
  <strong>SIJ bukan merupakan bagian dari lembaga pemerintah atau institusi pendidikan mana pun</strong>, melainkan dikembangkan secara independen sebagai kontribusi terhadap ekosistem publikasi ilmiah di Indonesia.
  <br /><br />
  Jika Anda memiliki kritik, saran, atau ingin berkolaborasi dalam pengembangan SIJ, silakan hubungi kami melalui halaman kontak yang tersedia. Kami percaya bahwa sistem informasi yang terbuka dan kolaboratif akan membawa manfaat yang luas bagi komunitas akademik Indonesia.
</p>

                </div>
    </div>
    </MainLayout>
  )
}

export default About
