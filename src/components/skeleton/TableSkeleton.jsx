const TableSkeleton = ({ count = 5 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary-surface"}>
                    <td className="px-4 py-3 w-12">
                        <div className="h-4 w-6 bg-gray-300 rounded animate-pulse" />
                    </td>
                    <td className="px-4 py-3">
                        <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableSkeleton;
