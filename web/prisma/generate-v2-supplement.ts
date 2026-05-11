/**
 * V2 补充：按附件方案新增2个大类 + 各现有大类强化
 * 运行：npx tsx prisma/generate-v2-supplement.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PLACEHOLDER = {
  essence: "（待补充：问题本质分析）",
  mistakes: "（待补充：常见误区）",
  principles: "（待补充：正确原则）",
  steps: "（待补充：操作步骤SOP）",
  script: "（待补充：沟通话术示例）",
  prompt: "（待补充：可复制AI提示词）",
};

/* ── 新增大类 ── */
const NEW_CATEGORIES: { name: string; description: string; problems: { title: string; tags: string[] }[] }[] = [
  {
    name: "青春期与性教育",
    description: "涵盖青春期身体变化、早恋、恋爱、网恋、失恋、异性交往、身体边界、性教育、自我保护等问题。",
    problems: [
      { title: "初中生早恋怎么办", tags: ["初中", "早恋", "青春期", "亲子沟通"] },
      { title: "高中生恋爱影响学习怎么办", tags: ["高中", "恋爱", "学习影响", "边界"] },
      { title: "孩子失恋后情绪崩溃怎么办", tags: ["失恋", "情绪", "青春期", "心理支持"] },
      { title: "孩子偷偷网恋怎么办", tags: ["网恋", "网络安全", "青春期", "隐私"] },
      { title: "怎么跟孩子谈性教育", tags: ["性教育", "身体边界", "沟通", "安全"] },
      { title: "孩子问性相关问题怎么回答", tags: ["性教育", "提问", "家长话术"] },
      { title: "女孩青春期身体变化怎么沟通", tags: ["女孩", "青春期", "月经", "身体变化"] },
      { title: "男孩青春期身体变化怎么沟通", tags: ["男孩", "青春期", "身体变化", "尊重"] },
      { title: "孩子偷偷看成人内容怎么办", tags: ["成人内容", "网络", "青春期", "边界"] },
      { title: "孩子和异性交往过密怎么办", tags: ["异性交往", "边界", "青春期"] },
      { title: "如何培养孩子的身体边界感", tags: ["身体边界", "安全", "自我保护"] },
      { title: "如何帮助孩子建立健康的亲密关系观", tags: ["亲密关系", "恋爱观", "尊重", "责任"] },
      { title: "家长发现孩子暧昧聊天怎么办", tags: ["暧昧聊天", "隐私", "青春期", "沟通"] },
      { title: "孩子网恋要线下见面怎么办", tags: ["网恋", "线下见面", "网络安全", "高风险"] },
      { title: "孩子因恋爱出现自伤威胁怎么办", tags: ["自伤", "恋爱", "危机干预", "心理安全"] },
    ],
  },
  {
    name: "安全教育与边界感",
    description: "涵盖人身安全、网络安全、隐私保护、身体边界、危险识别、求助能力等问题。",
    problems: [
      { title: "孩子被陌生人搭话怎么办", tags: ["陌生人", "安全", "自我保护"] },
      { title: "怎么教孩子拒绝陌生人", tags: ["拒绝", "陌生人", "安全"] },
      { title: "孩子独自上下学如何保证安全", tags: ["上下学", "路线", "安全"] },
      { title: "如何教孩子保护隐私部位", tags: ["身体边界", "隐私部位", "安全教育"] },
      { title: "孩子遇到危险不会求助怎么办", tags: ["求助", "危险", "安全"] },
      { title: "孩子在外被欺负不敢说怎么办", tags: ["欺负", "求助", "安全", "沟通"] },
      { title: "孩子遭遇不当接触怎么办", tags: ["不当接触", "身体安全", "危机"] },
      { title: "如何培养孩子的危险意识", tags: ["危险意识", "安全", "判断力"] },
      { title: "孩子沉迷陌生网友聊天怎么办", tags: ["网友", "网络安全", "社交", "风险"] },
      { title: "孩子泄露个人隐私怎么办", tags: ["隐私", "网络安全", "个人信息"] },
      { title: "孩子被偷拍上传网络怎么办", tags: ["偷拍", "隐私", "网络", "维权"] },
      { title: "如何教孩子保护个人信息", tags: ["个人信息", "隐私", "安全"] },
      { title: "孩子轻易相信别人怎么办", tags: ["判断力", "安全", "社交"] },
      { title: "孩子被威胁不敢告诉父母怎么办", tags: ["威胁", "霸凌", "安全", "求助"] },
      { title: "如何教孩子建立边界感", tags: ["边界感", "尊重", "自我保护"] },
    ],
  },
];

/* ── 现有大类强化 ── */
const SUPPLEMENT: Record<string, { title: string; tags: string[] }[]> = {
  "家庭规则与陪伴": [
    // 金钱观与消费管理
    { title: "孩子乱花钱怎么办", tags: ["金钱观", "消费", "规则"] },
    { title: "孩子攀比名牌怎么办", tags: ["攀比", "消费观", "价值观"] },
    { title: "孩子偷偷拿家里钱怎么办", tags: ["偷拿钱", "诚信", "金钱观"] },
    { title: "孩子压岁钱怎么管理", tags: ["压岁钱", "理财", "金钱观"] },
    { title: "如何培养孩子延迟满足", tags: ["延迟满足", "自控力", "金钱观"] },
    { title: "孩子总要买贵东西怎么办", tags: ["消费", "攀比", "规则"] },
    { title: "如何让孩子理解赚钱不容易", tags: ["金钱观", "责任", "家庭教育"] },
    { title: "怎么用零花钱培养责任感", tags: ["零花钱", "责任感", "规则"] },
    // 行为边界与价值观
    { title: "孩子偷东西怎么办", tags: ["偷东西", "诚信", "边界"] },
    { title: "孩子故意破坏东西怎么办", tags: ["破坏", "情绪", "规则"] },
    { title: "孩子喜欢炫耀怎么办", tags: ["炫耀", "价值观", "社交"] },
    { title: "孩子总推卸责任怎么办", tags: ["责任感", "推卸", "规则"] },
    { title: "孩子说脏话怎么办", tags: ["语言", "礼貌", "规则"] },
    { title: "孩子欺负别人怎么办", tags: ["欺负别人", "社交", "责任"] },
    { title: "孩子没有礼貌怎么办", tags: ["礼貌", "规则", "价值观"] },
    { title: "孩子总找借口怎么办", tags: ["责任", "借口", "行为习惯"] },
    { title: "孩子喜欢攀比怎么办", tags: ["攀比", "价值观", "社交"] },
    { title: "孩子见不得别人好怎么办", tags: ["嫉妒", "比较", "心理"] },
    // 生活习惯与身体成长
    { title: "孩子挑食偏食怎么办", tags: ["挑食", "饮食", "健康"] },
    { title: "孩子不爱运动怎么办", tags: ["运动", "健康", "习惯"] },
    { title: "孩子体重焦虑怎么办", tags: ["体重", "焦虑", "身体"] },
    { title: "孩子肥胖家长怎么引导", tags: ["肥胖", "健康", "引导"] },
    { title: "孩子近视加深怎么办", tags: ["近视", "用眼", "健康"] },
    { title: "孩子睡眠长期不足怎么办", tags: ["睡眠", "健康", "作息"] },
    { title: "孩子卫生习惯差怎么办", tags: ["卫生", "习惯", "健康"] },
    { title: "孩子不爱洗澡刷牙怎么办", tags: ["卫生", "习惯", "小学"] },
    { title: "孩子青春期身体变化焦虑怎么办", tags: ["青春期", "身体", "焦虑"] },
    { title: "孩子作息日夜颠倒怎么办", tags: ["作息", "日夜颠倒", "健康"] },
    { title: "孩子总喊累没精神怎么办", tags: ["疲劳", "精神", "健康"] },
    { title: "孩子运动能力差不愿体育课怎么办", tags: ["体育", "运动", "自信"] },
    // 特殊家庭
    { title: "父母长期异地怎么陪伴孩子", tags: ["异地", "远程", "陪伴"] },
    { title: "父母长期加班缺少陪伴怎么办", tags: ["加班", "陪伴", "时间"] },
  ],
  "兴趣与能力培养": [
    // AI时代核心能力
    { title: "如何培养孩子提问能力", tags: ["提问力", "AI力", "思考"] },
    { title: "如何培养孩子拆解问题能力", tags: ["拆解力", "问题解决", "AI力"] },
    { title: "如何培养孩子判断AI答案真假的能力", tags: ["判断力", "AI安全", "批判性思维"] },
    { title: "如何培养孩子信息搜索能力", tags: ["信息搜索", "研究能力", "AI力"] },
    { title: "如何培养孩子项目制学习能力", tags: ["PBL", "项目制学习", "能力培养"] },
    { title: "如何培养孩子作品集意识", tags: ["作品集", "项目成果", "未来能力"] },
    { title: "如何培养孩子公开表达能力", tags: ["表达力", "演讲", "展示"] },
    { title: "如何让孩子用AI做一个小项目", tags: ["AI项目", "PBL", "实践"] },
    { title: "如何让孩子用AI做研究报告", tags: ["研究报告", "AI学习", "资料整理"] },
    { title: "如何培养孩子未来AI竞争力", tags: ["AI力", "未来竞争力", "成长路径"] },
  ],
  亲子沟通: [
    // 特殊家庭情境
    { title: "重组家庭孩子不适应怎么办", tags: ["重组", "家庭", "适应"] },
    { title: "家庭经济压力大怎么跟孩子沟通", tags: ["经济压力", "沟通", "家庭"] },
    { title: "单亲家庭孩子缺少安全感怎么办", tags: ["单亲", "安全感", "情感"] },
    { title: "父母离婚后孩子夹在中间怎么办", tags: ["离婚", "夹在中间", "沟通"] },
    { title: "家里老人重病或去世怎么跟孩子解释", tags: ["丧亲", "解释", "情绪"] },
  ],
  "情绪与心理": [
    { title: "家庭重大变故后孩子情绪变化怎么办", tags: ["变故", "情绪", "心理"] },
  ],
  "校园适应与社交": [
    { title: "搬家后孩子不适应怎么办", tags: ["搬家", "适应", "环境"] },
    { title: "转学后孩子社交困难怎么办", tags: ["转学", "社交", "困难"] },
  ],
};

async function createProblems(
  categoryId: string,
  problems: { title: string; tags: string[] }[],
  existingTitles: Set<string>,
  startSort: number,
) {
  let sortOrder = startSort;
  let created = 0;
  for (const p of problems) {
    if (existingTitles.has(p.title)) continue;
    const problem = await prisma.problem.create({
      data: { title: p.title, categoryId, sortOrder: sortOrder++, ...PLACEHOLDER, isPublished: true },
    });
    for (const tagName of p.tags) {
      const tag = await prisma.tag.upsert({ where: { name: tagName }, update: {}, create: { name: tagName } });
      await prisma.problemTag.create({ data: { problemId: problem.id, tagId: tag.id } });
    }
    created++;
  }
  return created;
}

async function main() {
  console.log("\n===== V2 补充：青春期与性教育 / 安全教育与边界感 + 多方向强化 =====\n");

  let totalCreated = 0;
  const maxSort = await prisma.category.aggregate({ _max: { sortOrder: true } });
  let catSort = (maxSort._max.sortOrder ?? 17) + 1;

  // 1. 新增大类
  for (const nc of NEW_CATEGORIES) {
    let cat = await prisma.category.findFirst({ where: { name: nc.name } });
    if (!cat) {
      cat = await prisma.category.create({
        data: { name: nc.name, description: nc.description, sortOrder: catSort++, isActive: true },
      });
      console.log(`  ★ 新建大类「${nc.name}」`);
    } else {
      console.log(`  — 大类「${nc.name}」已存在`);
    }
    const existing = await prisma.problem.findMany({ where: { categoryId: cat.id }, select: { title: true } });
    const existingTitles = new Set(existing.map((p) => p.title));
    const count = await prisma.problem.count({ where: { categoryId: cat.id } });
    const created = await createProblems(cat.id, nc.problems, existingTitles, count);
    totalCreated += created;
    console.log(`    → 新增 ${created} 条问题`);
  }

  // 2. 现有大类补充
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { problems: { select: { title: true } } },
  });
  for (const cat of categories) {
    const problems = SUPPLEMENT[cat.name];
    if (!problems) continue;
    const existingTitles = new Set(cat.problems.map((p) => p.title));
    const count = await prisma.problem.count({ where: { categoryId: cat.id } });
    const created = await createProblems(cat.id, problems, existingTitles, count);
    if (created > 0) {
      totalCreated += created;
      console.log(`  ✓ ${cat.name}：+${created} 条`);
    }
  }

  // 3. 重新排序：AI提示词工具箱 和 课程配套资料区 排最后
  const ORDER = [
    "学习问题", "亲子沟通", "情绪与心理", "学习习惯", "AI学习方法",
    "语文学习", "数学学习", "英语学习", "升学与规划", "兴趣与能力培养",
    "手机与游戏管理", "校园适应与社交", "厌学·躺平·复学",
    "青春期与性教育", "安全教育与边界感",
    "家长自我成长", "家庭规则与陪伴",
    "AI提示词工具箱", "课程配套资料区",
  ];
  for (let i = 0; i < ORDER.length; i++) {
    await prisma.category.updateMany({ where: { name: ORDER[i] }, data: { sortOrder: i + 1 } });
  }

  // 4. 汇总
  const allCats = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { problems: true } } },
  });
  const totalProblems = allCats.reduce((s, c) => s + c._count.problems, 0);

  console.log(`\n===== 完成 =====`);
  console.log(`本次新增 ${totalCreated} 条问题`);
  console.log(`当前共 ${allCats.length} 个大类，${totalProblems} 条问题\n`);
  allCats.forEach((c, i) => console.log(`  ${i + 1}. ${c.name} (${c._count.problems}条)`));
  console.log("");
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
