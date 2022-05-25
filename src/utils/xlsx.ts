import * as xlsxReader from 'xlsx';

export const nextNColumn = (col: string, n: number) => {
  return xlsxReader.utils.encode_col(xlsxReader.utils.decode_col(col) + n);
};
