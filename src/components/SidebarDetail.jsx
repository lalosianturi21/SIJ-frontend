export default function SidebarDetail({ setIsDetailSidebarOpen }) {
  return (
    <div className='fixed top-0 z-[49] h-full w-[75%] bg-white right-0 p-5 shadow-2xl md:hidden'>
      <div className='mt-[100px]'>
        <ul className='list-none space-y-5 font-medium text-lg pl-0'>
          <li>
            <div
              className='inline-flex items-center gap-2 cursor-pointer'
              onClick={() => setIsDetailSidebarOpen(false)}
            >
              <img
                src="https://pddikti.kemdiktisaintek.go.id/static/media/dropdown-down.1936f1781dd5fc375bc89a8b4c65f3af.svg"
                alt=""
                style={{ transform: 'rotate(90deg)' }}
              />
              Kembali
            </div>
          </li>
          <li><a href="/profil-lembaga">Profil Lembaga</a></li>
          <li><a href="/standar-pelayanan">Standar Pelayanan</a></li>
          <li><a href="https://kanalpengetahuandikti.kemdiktisaintek.go.id" target="_blank" rel="noreferrer">FAQ</a></li>
        </ul>
      </div>
    </div>
  );
}
