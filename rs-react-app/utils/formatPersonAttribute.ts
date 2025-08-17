export default function formatPersonAttribute(key: string): string {
  return key
    .split('_')
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
    .join(' ');
}
