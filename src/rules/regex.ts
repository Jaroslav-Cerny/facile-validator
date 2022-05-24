import { Rule } from '@/types';
import { RuleError } from '@/modules/rule-error';
import { when } from '@/utils/helpers';
import { ARGUMENT_MUST_BE_PROVIDED, INVALID_PATTERN } from '@/types/error-dev';

const isValidPattern = (pattern: string) => {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
};

const stringToRegex = (str: string) => {
  // Main regex
  const main = str.match(/\/(.+)\/.*/)?.[1] ?? '';

  // Regex options
  const options = str.match(/\/.+\/(.*)/)?.[1] ?? '';

  // Compiled regex
  return new RegExp(main, options);
};

function required(value: string, pattern: string): true | RuleError {
  when(!pattern).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(isValidPattern(pattern) === false).throwError(INVALID_PATTERN);

  const regExp = stringToRegex(pattern);

  return regExp.test(value) || new RuleError("The value doesn't match the pattern");
}

export default required as Rule;
