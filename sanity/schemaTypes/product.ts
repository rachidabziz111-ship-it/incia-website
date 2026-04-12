export const product = {
  name: 'product',
  title: 'المنتجات والباكات',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'اسم المنتج أو الباك',
      type: 'string',
    },
    {
      name: 'isPack',
      title: 'واش هادا باك (مجموعة منتجات)؟',
      description: 'فعّل هاد الخيار يلا كان هادا بروتوكول متكامل أو مجموعة منتجات',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'price',
      title: 'الثمن',
      type: 'number',
    },
    {
      name: 'oldPrice',
      title: 'الثمن القديم (للتخفيضات)',
      description: 'اختياري: كتب الثمن القديم هنا باش يبان مضروب عليه فالموقع',
      type: 'number',
    },
    {
      name: 'inStock',
      title: 'متوفر في المخزون؟',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'image',
      title: 'تصويرة المنتج أو الباك',
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
    {
      name: 'usageInstructions',
      title: 'طريقة الاستعمال / بروتوكول العلاج',
      description: 'شرح للكليان كيفاش يستعمل هاد العلاج (خاص بالعيادة)',
      type: 'text',
      hidden: ({ document }: any) => document?.targetMarket === 'wholesale',
    },
    {
      name: 'ingredients',
      title: 'المكونات الأساسية',
      description: 'مثال: فيتامين سي، هيالورونيك أسيد...',
      type: 'string',
    },
    // --------------------------------------------------------
    // الخانات ديال التقسيم (عيادة / جملة)
    // --------------------------------------------------------
    {
      name: 'targetMarket',
      title: 'القسم المستهدف (فين غيبان هاد المنتج؟)',
      type: 'string',
      options: {
        list: [
          { title: 'قسم الجملة (Brand & B2B)', value: 'wholesale' },
          { title: 'قسم العيادة والعلاجات (B2C)', value: 'clinic' },
          { title: 'كيبان في القسمين بجوج', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'wholesale',
    },
    {
      name: 'minOrder',
      title: 'الحد الأدنى للطلب',
      type: 'number',
      initialValue: 50,
      // هاد الخانة غتبان غير يلا كان المنتج ديال الجملة أو القسمين
      hidden: ({ document }: any) => document?.targetMarket === 'clinic',
    },
    {
      name: 'treatmentType',
      title: 'نوع العلاج (خاص بقسم العيادة)',
      description: 'شنو المشكل لي كيعالجو هاد الباك؟',
      type: 'string',
      options: {
        list: [
          { title: 'حب الشباب والمسام الواسعة', value: 'acne' },
          { title: 'الكلف والتصبغات', value: 'pigmentation' },
          { title: 'التجاعيد وشد البشرة', value: 'anti-aging' },
          { title: 'نضارة وترطيب', value: 'hydration' },
          { title: 'عناية يومية روتينية', value: 'daily' },
        ],
      },
      // هاد الخانة غتبان غير يلا كان المنتج خاص بالعيادة أو بيهم بجوج
      hidden: ({ document }: any) => document?.targetMarket === 'wholesale',
    },
  ],
};