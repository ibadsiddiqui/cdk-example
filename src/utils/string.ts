export function ensureString(
  object: { [name: string]: any },
  propName: string
): string {
  if (!object[propName] || object[propName].trim().length === 0)
    throw new Error(propName + " does not exist or is empty");

  return object[propName];
}
