/**
 * 全面补充：
 * 1. 新增大类：校园适应与社交、厌学·躺平·复学
 * 2. 现有大类补充缺失场景（畏难玻璃心、住校AI、被霸凌、老师批评等）
 * 3. 全面覆盖：学校、家庭、社会各场景
 *
 * 运行：npx tsx prisma/generate-comprehensive.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ── 新增大类 ── */
const NEW_CATEGORIES: {
  name: string;
  description: string;
  problems: { title: string; tags: string[] }[];
}[] = [
  {
    name: "校园适应与社交",
    description: "被霸凌、被老师批评、社交能力差、不合群、转学适应…",
    problems: [
      // 霸凌
      { title: "小学生被同学欺负怎么办", tags: ["小学", "霸凌", "欺负"] },
      { title: "初中生被校园霸凌家长怎么介入", tags: ["初中", "霸凌", "介入"] },
      { title: "高中生遭遇网络霸凌怎么处理", tags: ["高中", "网络霸凌", "处理"] },
      // 老师批评
      { title: "小学生被老师批评后不想上学", tags: ["小学", "老师批评", "抗拒"] },
      { title: "初中生跟老师关系紧张怎么办", tags: ["初中", "师生关系", "紧张"] },
      { title: "高中生觉得老师不公平怎么沟通", tags: ["高中", "老师", "不公平"] },
      // 社交能力
      { title: "小学生不会交朋友怎么引导", tags: ["小学", "交朋友", "社交"] },
      { title: "初中生在班里没朋友很孤单", tags: ["初中", "孤单", "社交"] },
      { title: "高中生人际关系复杂不想处理", tags: ["高中", "人际", "社交"] },
      // 不合群 / 自卑
      { title: "孩子总觉得别人不喜欢自己", tags: ["自卑", "社交", "认知"] },
      { title: "孩子在学校不敢举手发言", tags: ["胆小", "课堂", "表达"] },
      { title: "孩子被同学排挤怎么帮他走出来", tags: ["排挤", "心理", "恢复"] },
      // 转学 / 新环境
      { title: "小学生转学后不适应怎么办", tags: ["小学", "转学", "适应"] },
      { title: "初中生进入新班级融不进去", tags: ["初中", "新环境", "融入"] },
      { title: "高中生住校不适应想回家", tags: ["高中", "住校", "适应"] },
      // 同伴影响
      { title: "孩子交了不好的朋友怎么引导", tags: ["交友", "影响", "引导"] },
      { title: "孩子盲目跟风攀比怎么办", tags: ["攀比", "跟风", "价值观"] },
    ],
  },
  {
    name: "厌学·躺平·复学",
    description: "不想上学、长期请假、休学在家、复学困难、躺平摆烂…",
    problems: [
      // 轻度厌学
      { title: "小学生说不想去上学怎么办", tags: ["小学", "厌学", "不想上学"] },
      { title: "初中生频繁找借口请假不上学", tags: ["初中", "请假", "逃避"] },
      { title: "高中生说读书没用想退学", tags: ["高中", "退学", "厌学"] },
      // 躺平
      { title: "孩子在家躺平什么都不想干", tags: ["躺平", "摆烂", "动力"] },
      { title: "初中生躺平不学习家长能做什么", tags: ["初中", "躺平", "家长策略"] },
      { title: "高中生彻底放弃学习怎么拉回来", tags: ["高中", "放弃", "挽救"] },
      // 休学
      { title: "孩子已经休学在家怎么办", tags: ["休学", "在家", "应对"] },
      { title: "休学半年了怎么帮孩子准备复学", tags: ["休学", "复学", "准备"] },
      { title: "休学期间孩子每天打游戏怎么干预", tags: ["休学", "游戏", "干预"] },
      { title: "复学后孩子又退缩怎么办", tags: ["复学", "退缩", "反复"] },
      // 心理层面
      { title: "厌学背后是心理问题还是学习问题", tags: ["厌学", "心理", "诊断"] },
      { title: "要不要带厌学的孩子看心理咨询", tags: ["心理咨询", "厌学", "求助"] },
      { title: "孩子说活着没意思怎么紧急处理", tags: ["危机", "心理", "紧急"] },
    ],
  },
];

/* ── 现有大类补充 ── */
const SUPPLEMENT: Record<string, { title: string; tags: string[] }[]> = {
  "情绪与心理": [
    // 畏难 / 玻璃心
    { title: "小学生畏难、一遇到难题就放弃", tags: ["小学", "畏难", "放弃"] },
    { title: "小学生玻璃心、一说就哭怎么办", tags: ["小学", "玻璃心", "脆弱"] },
    { title: "小学生害怕犯错不敢尝试怎么引导", tags: ["小学", "怕犯错", "尝试"] },
    { title: "小学生输不起、比赛输了就崩溃", tags: ["小学", "输不起", "竞争"] },
    { title: "孩子不敢迎接挑战总想逃避", tags: ["畏难", "逃避", "挑战"] },
    { title: "怎么培养孩子的抗挫折能力", tags: ["抗挫", "韧性", "培养"] },
    // 其他缺失
    { title: "孩子有分离焦虑不愿去学校", tags: ["小学", "分离焦虑", "入学"] },
    { title: "青春期孩子突然性格大变怎么办", tags: ["青春期", "性格", "变化"] },
  ],
  亲子沟通: [
    { title: "孩子犯错了怎么批评不伤关系", tags: ["批评", "方法", "关系"] },
    { title: "怎么跟孩子谈成绩不引发冲突", tags: ["成绩", "沟通", "冲突"] },
    { title: "孩子撒谎怎么处理", tags: ["撒谎", "诚信", "应对"] },
    { title: "离异家庭怎么跟孩子沟通", tags: ["离异", "单亲", "沟通"] },
  ],
  学习问题: [
    { title: "孩子偏科严重怎么办", tags: ["偏科", "均衡", "学习"] },
    { title: "小学生做题太慢总写不完怎么办", tags: ["小学", "速度", "作业"] },
    { title: "初中生成绩忽上忽下不稳定", tags: ["初中", "不稳定", "成绩"] },
    { title: "高中生各科都一般没有优势科目", tags: ["高中", "均衡", "突破"] },
  ],
  "AI学习方法": [
    { title: "初中生住校没有手机怎么用AI学习", tags: ["初中", "住校", "AI", "无手机"] },
    { title: "高中生住校无法用AI该怎么替代", tags: ["高中", "住校", "AI", "替代方案"] },
    { title: "周末回家短时间内怎么高效用AI", tags: ["住校", "周末", "AI", "高效"] },
    { title: "家长远程帮住校孩子用AI的方法", tags: ["住校", "家长", "AI", "远程"] },
  ],
  "手机与游戏管理": [
    { title: "孩子在学校偷玩手机被老师没收", tags: ["学校", "偷玩", "手机"] },
    { title: "孩子用学习机打游戏怎么管", tags: ["学习机", "游戏", "监管"] },
  ],
  "家长自我成长": [
    { title: "家长怎么处理自己的教育焦虑", tags: ["焦虑", "家长", "教育"] },
    { title: "全职妈妈怎么平衡带娃和自我成长", tags: ["全职", "平衡", "成长"] },
    { title: "爷爷奶奶带娃教育理念冲突怎么办", tags: ["隔代", "冲突", "教育"] },
  ],
  "升学与规划": [
    { title: "孩子成绩一般要不要走职校", tags: ["职校", "中职", "规划"] },
    { title: "体育/美术/音乐特长生怎么规划", tags: ["特长生", "艺体", "规划"] },
    { title: "中考分流家长怎么帮孩子选路", tags: ["中考", "分流", "选择"] },
  ],
  "家庭规则与陪伴": [
    { title: "留守儿童怎么保持亲子连接", tags: ["留守", "远程", "连接"] },
    { title: "双职工家庭怎么保证陪伴质量", tags: ["双职工", "时间", "陪伴"] },
    { title: "怎么给孩子做金钱观教育", tags: ["金钱观", "理财", "教育"] },
    { title: "怎么跟孩子一起制定家庭公约", tags: ["公约", "规则", "共建"] },
  ],
  "兴趣与能力培养": [
    { title: "孩子什么兴趣都没有怎么办", tags: ["无兴趣", "发现", "引导"] },
    { title: "兴趣和学业冲突怎么取舍", tags: ["冲突", "取舍", "平衡"] },
    { title: "怎么把孩子的游戏兴趣转化为学习动力", tags: ["游戏", "转化", "动力"] },
  ],
};

const PLACEHOLDER = {
  essence: "（待补充：问题本质分析）",
  mistakes: "（待补充：常见误区）",
  principles: "（待补充：正确原则）",
  steps: "（待补充：操作步骤SOP）",
  script: "（待补充：沟通话术示例）",
  prompt: "（待补充：可复制AI提示词）",
};

async function createProblems(
  categoryId: string,
  problems: { title: string; tags: string[] }[],
  existingTitles: Set<string>,
  startSortOrder: number,
) {
  let sortOrder = startSortOrder;
  let created = 0;
  for (const p of problems) {
    if (existingTitles.has(p.title)) continue;
    const problem = await prisma.problem.create({
      data: {
        title: p.title,
        categoryId,
        sortOrder: sortOrder++,
        ...PLACEHOLDER,
        isPublished: true,
      },
    });
    for (const tagName of p.tags) {
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
      await prisma.problemTag.create({
        data: { problemId: problem.id, tagId: tag.id },
      });
    }
    created++;
  }
  return created;
}

async function main() {
  console.log("\n===== 全面补充：新增大类 + 现有大类扩充 =====\n");

  let totalCreated = 0;
  const maxSort = await prisma.category.aggregate({ _max: { sortOrder: true } });
  let catSort = (maxSort._max.sortOrder ?? 15) + 1;

  // 1. 新增大类
  for (const nc of NEW_CATEGORIES) {
    let cat = await prisma.category.findFirst({ where: { name: nc.name } });
    if (!cat) {
      cat = await prisma.category.create({
        data: { name: nc.name, description: nc.description, sortOrder: catSort++, isActive: true },
      });
      console.log(`  ★ 新建大类「${nc.name}」`);
    } else {
      console.log(`  — 大类「${nc.name}」已存在，跳过创建`);
    }
    const existing = await prisma.problem.findMany({
      where: { categoryId: cat.id },
      select: { title: true },
    });
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
      console.log(`  ✓ ${cat.name}：补充 ${created} 条`);
    }
  }

  // 3. 统计
  const allCats = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { problems: true } } },
  });
  const totalProblems = allCats.reduce((s, c) => s + c._count.problems, 0);

  console.log(`\n===== 完成 =====`);
  console.log(`本次新增 ${totalCreated} 条问题`);
  console.log(`当前共 ${allCats.length} 个大类，${totalProblems} 条问题\n`);
  console.log("大类概览：");
  allCats.forEach((c, i) => console.log(`  ${i + 1}. ${c.name} (${c._count.problems}条)`));
  console.log("");
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
