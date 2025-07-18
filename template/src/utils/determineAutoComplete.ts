import { AutoCompleteType } from '@/schema';

export function determineInputAutoComplete(label: string): AutoCompleteType {
  const lowerLabel = label.toLowerCase();

  if (!lowerLabel || lowerLabel.trim() === '') {
    // https://stackoverflow.com/questions/2530/how-do-you-disable-browser-autocomplete-on-web-form-field-input-tags#:~:text=Always%20working%20solution
    // Chrome trying to be as helpful as possible :) autofills even if autoComplete='off' setting a random string seems to disable this thankfully
    return 'rutjfkde';
  }

  switch (true) {
    case /address line 1/.test(lowerLabel):
    case /street/.test(lowerLabel):
      return 'street-address';

    case /address line 2/.test(lowerLabel):
      return 'address-level2';

    case /city/.test(lowerLabel):
      return 'address-level1';

    case /postcode/.test(lowerLabel):
      return 'postal-code';

    case /country/.test(lowerLabel):
      return 'country';

    case /title/.test(lowerLabel):
      return 'honorific-prefix';

    case /first name/.test(lowerLabel):
      return 'given-name';

    case /last name/.test(lowerLabel):
      return 'family-name';

    case /email/.test(lowerLabel):
      return 'email';

    case /phone/.test(lowerLabel):
    case /mobile/.test(lowerLabel):
      return 'tel';

    case /company/.test(lowerLabel):
      return 'organization';

    default:
      return 'rutjfkde';
  }
}
