import React from 'react'

import { FaGithub, FaGlobe } from "react-icons/fa";

const JurnalTable = ({ jurnal, index  }) => {
    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-secondary-surface';
    return (
        <>
            <tr className={rowColor}>
                 <td className="px-4">
                    <td className="px-1">
                        {jurnal.cover ? (
                            <img
                                src={jurnal.cover}
                                alt="Cover Jurnal"
                                className="w-10 h-auto rounded shadow img-cover"
                            />
                        ) : (
                            <img
                                src="/images/notfoundimage.png"
                                alt="notfoundimage"
                                className="w-10 h-auto rounded shadow img-cover"
                            />
                        )}
                    </td>
                </td>
                <td className="px-4"><span>{jurnal.name}</span></td>
                <td className="px-2"><span>{jurnal.url}</span></td>
                <td className="px-2"><span>{jurnal.apc}</span></td>
                <td className="px-2"><span>{jurnal.contact}</span></td>
                <td className="px-2"><span>{jurnal.email}</span></td>
                {/* <td lassName="px-2"><span>{jurnal.languages?.name || '-'}</span></td> */}
                <td className="px-2 text-primary-main cursor-pointer py-4">
                    <a href={`/jurnalall/${jurnal.slug}`}>Lihat Detail</a>
                </td>
            </tr>
        </>
    )
}

export default JurnalTable
