export function capitalizeFirstLetter(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function filterByKeyword<T extends { name: string }>(items: T[], keyword: string): T[] {
  const trimmed = keyword.trim().toLowerCase();
  if (!trimmed) return items;
  return items.filter((item) => item.name.toLowerCase().includes(trimmed));
}
