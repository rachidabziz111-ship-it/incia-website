import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('لوحة التحكم')
    .id('root') // هاد السطر هو اللي غيفك المشكل ديال الرابط
    .items(S.documentTypeListItems())