export const product = {
  name: 'product',
  title: 'المنتجات',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم المنتج',
      type: 'string',
    },
    {
      name: 'price',
      title: 'الثمن',
      type: 'number',
    },
    {
      name: 'minOrder',
      title: 'الحد الأدنى للطلب',
      type: 'number',
      initialValue: 50,
    },
    {
      name: 'image',
      title: 'تصويرة المنتج',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'وصف المنتج',
      type: 'text',
    },
  ],
}