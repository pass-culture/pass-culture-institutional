export function protectedValue(sensitiveValue: string | false): string {
  if (sensitiveValue === false) return;

  return sensitiveValue && sensitiveValue.substring(0, 10) + "...";
}
