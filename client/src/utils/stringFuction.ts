function joinStrings(str1: string, str2: string, separator: string = ''): string {
  return `${str1} - CAD ${separator}${str2}`;
}
export { joinStrings }