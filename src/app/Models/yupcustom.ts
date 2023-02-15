import { setLocale } from 'yup';
import i18n from 'app/trans/i18n';
import { keyValue, errorMessage } from 'app/trans';

export const translateMessage = () => {
  return setLocale({
    mixed: {
      required: ({ path }) =>
        i18n.t(errorMessage.validate_required, { value: i18n.t(keyValue[path]) }),
      oneOf: ({ path }) => i18n.t(errorMessage[path]),
    },
    string: {
      min: ({ min, path }) =>
        i18n.t(errorMessage.validate_min, undefined, { value: i18n.t(keyValue[path]), min: min }),
      matches: ({ path }) => `${i18n.t(path ? errorMessage[path] : '는 정의되지 않은 문자열')}`,
      email: () =>
        i18n.t(errorMessage.validate_input_not_valid, undefined, { value: i18n.t(keyValue.email) }),
    },
  });
};
