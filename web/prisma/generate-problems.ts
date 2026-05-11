/**
 * 自动为每个一级目录生成典型二级问题（标题+标签），详情字段填入占位内容。
 * 运行方式: npx tsx prisma/generate-problems.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PROBLEMS_BY_CATEGORY: Record<string, { title: string; tags: string[] }[]> = {
  学习问题: [
    { title: "孩子写作业拖拉怎么办", tags: ["拖拉", "作业", "执行力"] },
    { title: "孩子不爱学习怎么办", tags: ["不爱学习", "学习动力"] },
    { title: "孩子总说等一下怎么办", tags: ["拖拉", "等一下"] },
    { title: "写作业走神、小动作多怎么办", tags: ["注意力", "走神"] },
    { title: "上课分心、记不住老师讲的内容", tags: ["注意力", "课堂"] },
    { title: "考试紧张发挥失常怎么办", tags: ["考试", "心态", "焦虑"] },
  ],
  亲子沟通: [
    { title: "孩子不听话、总和你对着干", tags: ["不听话", "对抗", "叛逆"] },
    { title: "孩子顶嘴怎么回应", tags: ["顶嘴", "沟通", "情绪"] },
    { title: "亲子冷战怎么破冰", tags: ["冷战", "关系修复"] },
    { title: "吼完孩子很后悔怎么办", tags: ["情绪失控", "后悔", "自我调节"] },
    { title: "孩子什么都不跟你说怎么办", tags: ["沟通", "信任", "倾听"] },
    { title: "二胎争宠引发的沟通困境", tags: ["二胎", "公平", "沟通"] },
  ],
  "情绪与心理": [
    { title: "孩子动不动就发脾气怎么办", tags: ["发脾气", "情绪管理"] },
    { title: "孩子容易焦虑紧张怎么疏导", tags: ["焦虑", "心理", "疏导"] },
    { title: "孩子不自信、总说我不行", tags: ["不自信", "自我评价"] },
    { title: "孩子压力大睡不好怎么办", tags: ["压力", "睡眠", "身心"] },
    { title: "孩子遇到挫折就放弃怎么办", tags: ["挫折", "韧性", "坚持"] },
    { title: "孩子在学校被排挤不开心", tags: ["社交", "排挤", "情绪"] },
  ],
  学习习惯: [
    { title: "孩子不会管理时间怎么培养", tags: ["时间管理", "习惯"] },
    { title: "怎么让孩子学会自主学习", tags: ["自主学习", "独立"] },
    { title: "错题本怎么用才有效", tags: ["错题本", "复盘"] },
    { title: "孩子做完题从不检查怎么办", tags: ["检查", "粗心", "习惯"] },
    { title: "孩子只刷题不复盘没有提升", tags: ["复盘", "提升", "方法"] },
  ],
  "AI学习方法": [
    { title: "家长如何入门AI辅助教育", tags: ["AI入门", "家长", "工具"] },
    { title: "孩子用AI写作业的边界在哪", tags: ["AI边界", "诚信", "规则"] },
    { title: "如何用AI帮孩子做预习", tags: ["AI预习", "学习方法"] },
    { title: "如何用AI帮孩子做复习巩固", tags: ["AI复习", "巩固"] },
    { title: "AI生成的内容怎么辨别对错", tags: ["AI识别", "批判思维"] },
  ],
  语文学习: [
    { title: "孩子不会写作文怎么引导", tags: ["作文", "写作", "语文"] },
    { title: "阅读理解总是丢分怎么办", tags: ["阅读理解", "语文", "丢分"] },
    { title: "古诗文背不下来怎么办", tags: ["古诗文", "记忆", "背诵"] },
    { title: "孩子表达能力差怎么提升", tags: ["表达能力", "口语", "语文"] },
    { title: "文言文看不懂怎么突破", tags: ["文言文", "语文", "理解"] },
  ],
  数学学习: [
    { title: "应用题读不懂题意怎么办", tags: ["应用题", "审题", "数学"] },
    { title: "计算老出错粗心怎么改", tags: ["计算", "粗心", "数学"] },
    { title: "几何空间想象力差怎么练", tags: ["几何", "空间", "数学"] },
    { title: "数学公式记不住怎么办", tags: ["公式", "记忆", "数学"] },
    { title: "数学基础薄弱如何补回来", tags: ["基础", "补课", "数学"] },
  ],
  英语学习: [
    { title: "单词背了就忘怎么办", tags: ["单词", "记忆", "英语"] },
    { title: "口语不敢开口怎么练", tags: ["口语", "英语", "表达"] },
    { title: "英语阅读理解做不对", tags: ["阅读", "英语", "理解"] },
    { title: "英语写作没思路怎么破", tags: ["写作", "英语", "思路"] },
    { title: "听力跟不上速度怎么办", tags: ["听力", "英语", "速度"] },
  ],
  "升学与规划": [
    { title: "初升高该怎么选学校", tags: ["升学", "择校", "初中"] },
    { title: "高中选科怎么选不后悔", tags: ["选科", "高中", "规划"] },
    { title: "志愿填报怎么避坑", tags: ["志愿", "高考", "填报"] },
    { title: "孩子不知道未来想做什么怎么引导", tags: ["生涯", "方向", "兴趣"] },
    { title: "要不要让孩子出国读书", tags: ["出国", "留学", "规划"] },
  ],
  "兴趣与能力培养": [
    { title: "怎么发现孩子的天赋兴趣", tags: ["天赋", "兴趣", "发现"] },
    { title: "孩子做事三分钟热度怎么办", tags: ["坚持", "兴趣", "毅力"] },
    { title: "如何培养孩子的专注力", tags: ["专注力", "训练", "能力"] },
    { title: "如何培养孩子的表达力", tags: ["表达力", "演讲", "能力"] },
    { title: "怎么让孩子在项目中学到东西", tags: ["项目实践", "学习", "能力"] },
  ],
  "手机与游戏管理": [
    { title: "孩子沉迷手机怎么管", tags: ["手机", "沉迷", "管理"] },
    { title: "游戏规则怎么跟孩子协商", tags: ["游戏", "规则", "协商"] },
    { title: "说好玩一小时但到时间不停", tags: ["执行", "游戏", "时间"] },
    { title: "用什么替代活动转移注意力", tags: ["替代活动", "兴趣", "转移"] },
    { title: "孩子偷偷充钱怎么处理", tags: ["充钱", "游戏", "金钱观"] },
  ],
  "家长自我成长": [
    { title: "控制不住冲孩子发火怎么办", tags: ["情绪管理", "发火", "家长"] },
    { title: "家长怎么学会有效倾听", tags: ["倾听", "沟通", "家长"] },
    { title: "教养理念跟另一半不一致怎么办", tags: ["教养", "分歧", "家庭"] },
    { title: "家长如何避免过度焦虑", tags: ["焦虑", "家长", "心态"] },
    { title: "从虎妈/虎爸模式如何转型", tags: ["转型", "教养", "方式"] },
  ],
  "家庭规则与陪伴": [
    { title: "家庭作息规则怎么制定", tags: ["作息", "规则", "家庭"] },
    { title: "怎么让孩子主动做家务", tags: ["家务", "参与", "规则"] },
    { title: "家庭会议怎么开才有效", tags: ["家庭会议", "沟通", "民主"] },
    { title: "高质量陪伴每天需要多久", tags: ["陪伴", "时间", "质量"] },
    { title: "周末怎么安排才有教育意义", tags: ["周末", "安排", "活动"] },
  ],
  "AI提示词工具箱": [
    { title: "家庭教育通用提示词怎么写", tags: ["提示词", "家庭教育", "通用"] },
    { title: "学科辅导提示词模板", tags: ["提示词", "学科", "辅导"] },
    { title: "安全使用AI的提示词边界", tags: ["提示词", "安全", "边界"] },
    { title: "一键生成学习计划的提示词", tags: ["提示词", "学习计划", "生成"] },
    { title: "用AI做错题分析的提示词", tags: ["提示词", "错题", "分析"] },
  ],
  "课程配套资料区": [
    { title: "训练营 Day1：认识孩子学习风格", tags: ["训练营", "Day1", "学习风格"] },
    { title: "训练营 Day2：沟通话术实操", tags: ["训练营", "Day2", "沟通"] },
    { title: "训练营 Day3：AI工具初体验", tags: ["训练营", "Day3", "AI"] },
    { title: "训练营 Day4：制定家庭学习SOP", tags: ["训练营", "Day4", "SOP"] },
    { title: "训练营 Day5：复盘与持续改进", tags: ["训练营", "Day5", "复盘"] },
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
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { problems: { select: { title: true } } },
  });

  console.log(`\n找到 ${categories.length} 个一级目录，开始生成二级问题...\n`);

  let totalCreated = 0;

  for (const cat of categories) {
    const problems = PROBLEMS_BY_CATEGORY[cat.name];
    if (!problems) {
      console.log(`  ⚠ "${cat.name}" 未找到预设问题模板，跳过`);
      continue;
    }

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

    totalCreated += created;
    console.log(`  ✓ ${cat.name}：新增 ${created} 条问题（已有 ${existingTitles.size} 条跳过重复）`);
  }

  console.log(`\n✅ 完成！共新增 ${totalCreated} 条二级问题。`);
  console.log(`\n请到后台「一级/二级目录管理」页面检查生成结果。`);
  console.log(`详情字段目前为占位内容（待补充），后续可在「问题详情编辑」中逐条完善。\n`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
