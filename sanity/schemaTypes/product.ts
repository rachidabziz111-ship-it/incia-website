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
    // --------------------------------------------------------
    // تعديل 1: ردينا الثمن string باش يقبل ليك العوارض وكلمة "درهم"
    // --------------------------------------------------------
    {
      name: 'price',
      title: 'الثمن',
      description: 'تقدر تكتب رقم أو نص بحال "150 - 250 درهم" أو "350د/400/550"',
      type: 'string', 
    },
    {
      name: 'oldPrice',
      title: 'الثمن القديم (للتخفيضات)',
      description: 'اختياري: كتب الثمن القديم هنا باش يبان مضروب عليه فالموقع',
      type: 'string', // حتى هادا رديناه string باش يمشي مع الثمن العادي
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
      hidden: ({ document }: any) => document?.targetMarket === 'clinic',
    },
    // --------------------------------------------------------
    // تعديل 2: الأقسام الجديدة باش ننظمو المنتجات
    // --------------------------------------------------------
    {
      name: 'treatmentType',
      title: 'القسم (خاص بقسم العيادة)',
      description: 'اختار القسم المناسب باش يبان المنتج فالبلاصة ديالو فالموقع',
      type: 'string',
      options: {
        list: [
          { title: 'العناية بالبشرة والوجه', value: 'skin_care' },
          { title: 'الجسم والمناطق الأنثوية', value: 'body_intimate' },
          { title: 'الصحة والهضم والمفاصل', value: 'health_digestion' },
          { title: 'الرشاقة (الزيادة ونقصان الوزن)', value: 'weight_fitness' },
          { title: 'العناية بالشعر، الأسنان والعطور', value: 'hair_teeth_perfume' },
        ],
      },
      hidden: ({ document }: any) => document?.targetMarket === 'wholesale',
    },
  ],
};