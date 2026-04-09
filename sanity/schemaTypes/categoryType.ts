export default {
  name: 'category',
  title: 'التصنيفات (Categories)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'اسم التصنيف',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'الرابط (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'وصف التصنيف',
      type: 'text',
    },
  ],
}