export function isValidMacroName(name: string)
{
  if (typeof name !== "string") return false;

  const trimmed = name.trim();

  if (trimmed.length === 0) return false;
  if (/[\x00-\x1F\x7F]/.test(trimmed)) return false;
  
  return true;

}