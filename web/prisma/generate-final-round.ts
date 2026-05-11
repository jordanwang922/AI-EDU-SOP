/**
 * 最终一轮全面查缺补漏：
 * - 夫妻教育理念分歧（深化）
 * - 隔代教育冲突（深化）
 * - 各大类仍缺失的场景
 *
 * 运行：npx tsx prisma/generate-final-round.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SUPPLEMENT: Record<string, { title: string; tags: string[] }[]> = {

  /* ── 亲子沟通：夫妻分歧 + 隔代 + 其他缺失 ── */
  亲子沟通: [
    // 夫妻教育理念分歧
    { title: "夫妻一个严一个松孩子钻空子怎么办", tags: ["夫妻", "教育分歧", "一严一松"] },
    { title: "爸爸不管教育全靠妈妈怎么拉他参与", tags: ["父亲", "缺位", "参与"] },
    { title: "夫妻当着孩子面吵教育问题怎么办", tags: ["夫妻", "争吵", "影响"] },
    { title: "夫妻教育理念不合怎么达成一致", tags: ["夫妻", "理念", "协商"] },
    // 隔代教育
    { title: "老人溺爱孩子家长怎么温和纠正", tags: ["隔代", "溺爱", "纠正"] },
    { title: "老人带娃规则跟父母不一样孩子很混乱", tags: ["隔代", "规则不一致", "混乱"] },
    { title: "老人当面拆台怎么沟通", tags: ["隔代", "拆台", "沟通"] },
    { title: "孩子跟爷爷奶奶更亲不听父母话", tags: ["隔代", "依赖", "权威"] },
    // 其他
    { title: "孩子被宠坏了自私不懂感恩怎么办", tags: ["溺爱", "自私", "感恩"] },
    { title: "怎么跟青春期孩子谈性教育", tags: ["性教育", "青春期", "沟通"] },
  ],

  /* ── 家长自我成长：夫妻关系对教育的影响 ── */
  "家长自我成长": [
    { title: "夫妻关系不好对孩子的影响有多大", tags: ["夫妻关系", "影响", "孩子"] },
    { title: "夫妻怎么统一教育战线不拆台", tags: ["夫妻", "统一", "战线"] },
    { title: "妈妈焦虑爸爸佛系怎么平衡", tags: ["焦虑", "佛系", "互补"] },
    { title: "单亲家长怎么一个人做好教育", tags: ["单亲", "独立", "教育"] },
    { title: "怎么处理跟自己父母在教育上的分歧", tags: ["隔代", "分歧", "沟通"] },
  ],

  /* ── 情绪与心理：更多缺失场景 ── */
  "情绪与心理": [
    { title: "孩子嫉妒心强、见不得别人好", tags: ["嫉妒", "心理", "比较"] },
    { title: "孩子完美主义、做不好就崩溃", tags: ["完美主义", "焦虑", "标准"] },
    { title: "孩子总说「没人喜欢我」怎么回应", tags: ["自我否定", "社交", "回应"] },
    { title: "孩子有自伤行为家长怎么应对", tags: ["自伤", "危机", "心理"] },
    { title: "考前焦虑到肚子痛头痛是真是假", tags: ["躯体化", "焦虑", "考试"] },
  ],

  /* ── 校园适应与社交：更多场景 ── */
  "校园适应与社交": [
    { title: "孩子在学校被老师偏见对待怎么办", tags: ["偏见", "老师", "应对"] },
    { title: "孩子当了班干部管不好同学很挫败", tags: ["班干部", "挫败", "领导力"] },
    { title: "孩子在学校被起外号嘲笑怎么办", tags: ["嘲笑", "外号", "欺凌"] },
    { title: "小学生幼升小不适应怎么帮助过渡", tags: ["小学", "幼升小", "适应"] },
    { title: "初中生小升初不适应怎么帮助过渡", tags: ["初中", "小升初", "适应"] },
    { title: "高中生对集体活动没兴趣不合群", tags: ["高中", "不合群", "集体"] },
    { title: "孩子性格内向不是缺点但被误解怎么办", tags: ["内向", "误解", "接纳"] },
    { title: "女孩之间的小团体排挤怎么处理", tags: ["女孩", "小团体", "排挤"] },
    { title: "男孩之间打架动手家长怎么介入", tags: ["男孩", "打架", "介入"] },
  ],

  /* ── 学习问题：更多场景 ── */
  学习问题: [
    { title: "孩子补课没效果还要不要继续补", tags: ["补课", "效果", "选择"] },
    { title: "孩子抄作业被发现怎么处理", tags: ["抄作业", "诚信", "处理"] },
    { title: "小学生幼小衔接学习跟不上", tags: ["小学", "幼小衔接", "跟不上"] },
    { title: "初中生从小学尖子变中等怎么调整", tags: ["初中", "落差", "调整"] },
    { title: "高中生选了理科/文科后后悔怎么办", tags: ["高中", "选科", "后悔"] },
  ],

  /* ── 手机与游戏管理：网络安全 ── */
  "手机与游戏管理": [
    { title: "孩子在网上交了不认识的人怎么办", tags: ["网络安全", "交友", "风险"] },
    { title: "孩子看到不良信息受到影响怎么引导", tags: ["不良信息", "引导", "网络"] },
    { title: "孩子拍短视频发社交平台要不要管", tags: ["短视频", "社交媒体", "隐私"] },
  ],

  /* ── 家庭规则与陪伴：更多场景 ── */
  "家庭规则与陪伴": [
    { title: "怎么培养孩子的责任感", tags: ["责任感", "培养", "自律"] },
    { title: "孩子不尊重长辈怎么教", tags: ["尊重", "长辈", "礼貌"] },
    { title: "怎么给孩子做挫折教育", tags: ["挫折教育", "韧性", "成长"] },
    { title: "怎么教孩子学会道歉和承担后果", tags: ["道歉", "后果", "规则"] },
    { title: "家有二胎怎么公平分配关注", tags: ["二胎", "公平", "关注"] },
  ],

  /* ── 厌学·躺平·复学：补充 ── */
  "厌学·躺平·复学": [
    { title: "孩子上学前总肚子疼是装的吗", tags: ["躯体化", "逃避", "上学"] },
    { title: "初中生跟学校请了长假怎么慢慢回去", tags: ["初中", "长假", "回归"] },
    { title: "孩子说同学都讨厌我不想去学校", tags: ["社交", "逃避", "上学"] },
    { title: "家长要不要同意孩子休学的请求", tags: ["休学", "决策", "家长"] },
    { title: "休学在家孩子日夜颠倒怎么调整", tags: ["休学", "作息", "调整"] },
  ],

  /* ── 升学与规划 ── */
  "升学与规划": [
    { title: "孩子成绩好但不知道学什么专业", tags: ["专业", "选择", "迷茫"] },
    { title: "家长和孩子选专业意见不一致怎么办", tags: ["专业", "分歧", "沟通"] },
  ],

  /* ── 兴趣与能力培养 ── */
  "兴趣与能力培养": [
    { title: "怎么培养孩子的批判性思维", tags: ["批判思维", "思考", "能力"] },
    { title: "怎么培养孩子的自我管理能力", tags: ["自我管理", "自律", "能力"] },
    { title: "孩子做事拖延没有行动力怎么破", tags: ["拖延", "行动力", "执行"] },
  ],

  /* ── 学习习惯 ── */
  学习习惯: [
    { title: "小学生怎么建立写作业的仪式感", tags: ["小学", "仪式感", "作业"] },
    { title: "初中生怎么从被动学习转为主动学习", tags: ["初中", "主动", "学习"] },
    { title: "高中生怎么利用碎片时间学习", tags: ["高中", "碎片时间", "效率"] },
    { title: "怎么帮孩子养成不懂就问的习惯", tags: ["提问", "习惯", "主动"] },
  ],

  /* ── AI提示词工具箱 ── */
  "AI提示词工具箱": [
    { title: "用AI帮孩子做情绪疏导的提示词", tags: ["提示词", "情绪", "疏导"] },
    { title: "用AI模拟亲子沟通场景的提示词", tags: ["提示词", "沟通", "模拟"] },
    { title: "用AI制定家庭规则的提示词", tags: ["提示词", "规则", "家庭"] },
    { title: "用AI分析孩子学习风格的提示词", tags: ["提示词", "学习风格", "分析"] },
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

async function main() {
  console.log("\n===== 最终补充：夫妻分歧/隔代教育/全场景查漏 =====\n");

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { problems: { select: { title: true } } },
  });

  let totalCreated = 0;

  for (const cat of categories) {
    const problems = SUPPLEMENT[cat.name];
    if (!problems) continue;

    const existingTitles = new Set(cat.problems.map((p) => p.title));
    const existingCount = await prisma.problem.count({ where: { categoryId: cat.id } });
    let sortOrder = existingCount;
    let created = 0;

    for (const p of problems) {
      if (existingTitles.has(p.title)) continue;
      const problem = await prisma.problem.create({
        data: {
          title: p.title,
          categoryId: cat.id,
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

    if (created > 0) {
      totalCreated += created;
      console.log(`  ✓ ${cat.name}：+${created} 条`);
    }
  }

  const allCats = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { problems: true } } },
  });
  const totalProblems = allCats.reduce((s, c) => s + c._count.problems, 0);

  console.log(`\n===== 完成 =====`);
  console.log(`本次新增 ${totalCreated} 条`);
  console.log(`当前共 ${allCats.length} 个大类，${totalProblems} 条问题\n`);
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
