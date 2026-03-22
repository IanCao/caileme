export interface LegalAid {
  id: string;
  type: 'free' | 'paid';
  name: string;
  description: string;
  organization?: string;
  contact?: string;
  phone?: string;
  url?: string;
  price?: string;
  discount?: string;
  tags: string[];
  city?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  expertise?: string[];
}

export const legalAidData: LegalAid[] = [
  // 免费法律援助
  {
    id: "free-1",
    type: "free",
    name: "法律援助中心",
    description: "政府设立的法律援助机构，为符合条件的困难群众提供免费法律服务",
    organization: "各地司法局",
    phone: "12348",
    url: "http://www.12348.gov.cn",
    tags: ["免费", "政府", "官方"],
    verified: true,
    rating: 4.8,
    reviewCount: 1250,
    expertise: ["劳动纠纷", "合同纠纷", "民事赔偿"],
  },
  {
    id: "free-2",
    type: "free",
    name: "劳动仲裁委员会",
    description: "处理劳动争议的专业机构，免费受理劳动仲裁申请",
    organization: "人社局",
    phone: "12333",
    url: "http://www.12333.gov.cn",
    tags: ["免费", "仲裁", "官方"],
    verified: true,
    rating: 4.7,
    reviewCount: 890,
    expertise: ["劳动仲裁", "违法裁员", "工资纠纷"],
  },
  {
    id: "free-3",
    type: "free",
    name: "工会法律援助",
    description: "工会为职工提供的免费法律咨询服务，帮助维护职工合法权益",
    organization: "各地总工会",
    phone: "12351",
    url: "http://www.workercn.cn",
    tags: ["免费", "工会", "职工"],
    verified: true,
    rating: 4.6,
    reviewCount: 567,
    expertise: ["劳动合同", "工伤赔偿", "社保纠纷"],
  },
  {
    id: "free-4",
    type: "free",
    name: "公益律师服务",
    description: "各地律师协会组织的公益律师，为困难群体提供免费法律咨询",
    organization: "律师协会",
    tags: ["免费", "公益", "律师"],
    verified: true,
    rating: 4.5,
    reviewCount: 432,
    expertise: ["劳动法", "民商事", "行政诉讼"],
  },

  // 付费法律援助（示例数据）
  {
    id: "paid-1",
    type: "paid",
    name: "张律师",
    description: "专注劳动法领域10年，擅长违法裁员、2N赔偿、经济补偿金计算等案件",
    organization: "京华律师事务所",
    phone: "138****1234",
    price: "2000-5000元/小时",
    discount: "本站网友专享8折",
    city: "北京",
    tags: ["劳动法", "违法裁员", "2N赔偿"],
    verified: true,
    rating: 4.9,
    reviewCount: 234,
    expertise: ["违法裁员", "2N赔偿", "经济补偿"],
  },
  {
    id: "paid-2",
    type: "paid",
    name: "李律师",
    description: "前HR转型律师，深谙企业用工管理，擅长从HR视角分析劳动争议",
    organization: "君信律师事务所",
    phone: "139****5678",
    price: "1500-4000元/小时",
    discount: "首案咨询免费",
    city: "上海",
    tags: ["劳动法", "HR视角", "协商谈判"],
    verified: true,
    rating: 4.8,
    reviewCount: 189,
    expertise: ["协商谈判", "离职协商", "竞业限制"],
  },
  {
    id: "paid-3",
    type: "paid",
    name: "王律师",
    description: "劳动仲裁专家，代理劳动仲裁案件300+起，胜诉率达90%以上",
    organization: "大成律师事务所",
    phone: "137****9012",
    price: "3000-6000元/小时",
    discount: "本站网友9折",
    city: "广州",
    tags: ["劳动仲裁", "违法裁员", "工资纠纷"],
    verified: true,
    rating: 4.9,
    reviewCount: 312,
    expertise: ["劳动仲裁", "违法解除", "工资追讨"],
  },
  {
    id: "paid-4",
    type: "paid",
    name: "刘律师",
    description: "互联网行业劳动纠纷专家，熟悉大厂裁员流程和常见问题",
    organization: "金杜律师事务所",
    phone: "136****3456",
    price: "2500-5000元/小时",
    discount: "打包价优惠",
    city: "深圳",
    tags: ["互联网", "大厂裁员", "期权纠纷"],
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    expertise: ["大厂裁员", "期权纠纷", "竞业限制"],
  },
  {
    id: "paid-5",
    type: "paid",
    name: "陈律师",
    description: "工伤赔偿专家，处理过大量工伤认定和赔偿案件",
    organization: "德恒律师事务所",
    phone: "135****7890",
    price: "2000-4500元/小时",
    discount: "工伤案件特惠",
    city: "杭州",
    tags: ["工伤赔偿", "职业病", "伤残评定"],
    verified: true,
    rating: 4.8,
    reviewCount: 98,
    expertise: ["工伤认定", "伤残赔偿", "职业病"],
  },
  {
    id: "paid-6",
    type: "paid",
    name: "赵律师",
    description: "经济性裁员专家，熟悉大规模裁员的法律程序和员工权益保护",
    organization: "中伦律师事务所",
    phone: "134****6789",
    price: "3500-7000元/小时",
    discount: "企业客户优惠",
    city: "成都",
    tags: ["经济性裁员", "大规模裁员", "企业合规"],
    verified: true,
    rating: 4.6,
    reviewCount: 67,
    expertise: ["经济性裁员", "企业合规", "集体纠纷"],
  },
];

export const legalAidFilters = [
  { id: "all", label: "全部" },
  { id: "free", label: "免费援助" },
  { id: "paid", label: "付费服务" },
];

export const popularCities = [
  "全部城市",
  "北京",
  "上海",
  "广州",
  "深圳",
  "杭州",
  "成都",
  "武汉",
  "重庆",
  "天津",
];
