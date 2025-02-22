function SortSelect({ sortOrder, onSort }) {
  return (
    <select value={sortOrder} onChange={(e) => onSort(e.target.value)}>
      <option value="id-asc">ID (Menor para Maior)</option>
      <option value="id-desc">ID (Maior para Menor)</option>
      <option value="name-asc">Nome (A-Z)</option>
      <option value="name-desc">Nome (Z-A)</option>
    </select>
  );
}

export default SortSelect;
