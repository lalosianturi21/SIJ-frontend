const InstitutionTable = ({ institution, index, startIndex }) => {
    const rowColor = index % 2 === 0 ? 'bg-white' : 'bg-secondary-surface';
    return (
        <tr className={rowColor}>
            <td className="px-4 py-3 w-12">{startIndex + index + 1}</td>
            <td className="px-4 py-3"><span>{institution.name}</span></td>
        </tr>
    );
};

export default InstitutionTable;
