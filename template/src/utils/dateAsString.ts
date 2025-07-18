type DateAsString = {
  format?: 'short' | 'long';
  date?: Date;
};

export function dateAsString({
  format = 'short',
  date = new Date(),
}: DateAsString = {}): string {
  const options = {
    short: {} as Intl.DateTimeFormatOptions,
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  };

  return date.toLocaleDateString('en-GB', options[format]);
}
