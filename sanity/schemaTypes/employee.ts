export default {
  name: 'employee',
  title: 'فريق العمل (المستشارين)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم الموظف',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'الصفة (مثلاً: مستشار طبي، خدمة العملاء)',
      type: 'string',
    },
    {
      name: 'whatsapp',
      title: 'رقم الواتساب',
      description: 'اكتب الرقم مع رمز البلد بدون زائد (مثال: 212600000000)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'صورة الموظف (اختياري)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}