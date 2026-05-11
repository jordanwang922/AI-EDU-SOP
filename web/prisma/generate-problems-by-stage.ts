/**
 * 为各一级目录补充按学段（小学/初中/高中）细分的典型问题。
 * 运行方式: npx tsx prisma/generate-problems-by-stage.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SUPPLEMENT: Record<string, { title: string; tags: string[] }[]> = {
  学习问题: [
    { title: "小学生写作业拖拉磨蹭怎么办", tags: ["小学", "拖拉", "作业"] },
    { title: "初中生写作业拖拉怎么办", tags: ["初中", "拖拉", "作业"] },
    { title: "高中生不爱学习怎么办", tags: ["高中", "不爱学习", "学习动力"] },
    { title: "高中生写作业效率低怎么办", tags: ["高中", "效率", "作业"] },
    { title: "小学生注意力不集中怎么训练", tags: ["小学", "注意力", "训练"] },
    { title: "初中生上课走神怎么办", tags: ["初中", "走神", "注意力"] },
    { title: "高中生学习压力大不想学怎么办", tags: ["高中", "压力", "学习动力"] },
    { title: "小学生考试粗心丢分怎么办", tags: ["小学", "考试", "粗心"] },
    { title: "初中生考试焦虑怎么缓解", tags: ["初中", "考试", "焦虑"] },
    { title: "高中生大考前失眠怎么办", tags: ["高中", "考试", "失眠"] },
  ],
  亲子沟通: [
    { title: "小学生不听话总哭闹怎么沟通", tags: ["小学", "不听话", "哭闹"] },
    { title: "初中生叛逆不愿沟通怎么办", tags: ["初中", "叛逆", "沟通"] },
    { title: "高中生跟父母完全不说话怎么破", tags: ["高中", "沟通", "冷战"] },
    { title: "小学生当众发脾气家长怎么应对", tags: ["小学", "情绪", "公共场合"] },
    { title: "初中生嫌父母唠叨怎么调整", tags: ["初中", "唠叨", "沟通方式"] },
    { title: "高中生谈恋爱家长怎么沟通", tags: ["高中", "恋爱", "沟通"] },
    { title: "小学生不愿意分享学校事情怎么引导", tags: ["小学", "分享", "信任"] },
    { title: "初中生总顶嘴对着干怎么回应", tags: ["初中", "顶嘴", "对抗"] },
    { title: "高中生觉得父母不理解自己怎么办", tags: ["高中", "理解", "代沟"] },
  ],
  "情绪与心理": [
    { title: "小学生容易哭、情绪敏感怎么引导", tags: ["小学", "情绪", "敏感"] },
    { title: "初中生情绪波动大怎么疏导", tags: ["初中", "情绪", "青春期"] },
    { title: "高中生抑郁倾向家长怎么识别", tags: ["高中", "抑郁", "心理健康"] },
    { title: "小学生怕输、输了就哭怎么办", tags: ["小学", "怕输", "挫折"] },
    { title: "初中生自卑不自信怎么帮助", tags: ["初中", "自卑", "自信"] },
    { title: "高中生对未来迷茫焦虑怎么办", tags: ["高中", "迷茫", "焦虑"] },
    { title: "小学生社交恐惧不敢交朋友", tags: ["小学", "社交", "恐惧"] },
    { title: "初中生被同学孤立怎么处理", tags: ["初中", "孤立", "人际"] },
    { title: "高中生厌学想休学怎么办", tags: ["高中", "厌学", "休学"] },
  ],
  学习习惯: [
    { title: "小学生怎么培养每日阅读习惯", tags: ["小学", "阅读", "习惯"] },
    { title: "初中生怎么建立高效的学习节奏", tags: ["初中", "学习节奏", "效率"] },
    { title: "高中生怎么做时间管理和规划", tags: ["高中", "时间管理", "规划"] },
    { title: "小学生不愿意预习怎么办", tags: ["小学", "预习", "习惯"] },
    { title: "初中生不会做笔记怎么教", tags: ["初中", "笔记", "方法"] },
    { title: "高中生怎么做考前复习计划", tags: ["高中", "复习", "计划"] },
  ],
  "AI学习方法": [
    { title: "小学生可以用AI学什么", tags: ["小学", "AI", "适龄"] },
    { title: "初中生怎么用AI辅助各科学习", tags: ["初中", "AI", "学科"] },
    { title: "高中生如何用AI做深度自学", tags: ["高中", "AI", "自学"] },
    { title: "小学生用AI要注意什么安全边界", tags: ["小学", "AI", "安全"] },
    { title: "初中生用AI写作文算抄袭吗", tags: ["初中", "AI", "诚信"] },
    { title: "高中生用AI备考的正确姿势", tags: ["高中", "AI", "备考"] },
  ],
  语文学习: [
    { title: "小学生不爱看书怎么培养阅读兴趣", tags: ["小学", "阅读", "兴趣"] },
    { title: "初中生议论文不会写怎么突破", tags: ["初中", "议论文", "写作"] },
    { title: "高中生文言文翻译总丢分怎么练", tags: ["高中", "文言文", "翻译"] },
    { title: "小学生拼音和识字慢怎么办", tags: ["小学", "拼音", "识字"] },
    { title: "初中生名著阅读怎么精读", tags: ["初中", "名著", "精读"] },
    { title: "高中生现代文阅读答题技巧", tags: ["高中", "现代文", "技巧"] },
  ],
  数学学习: [
    { title: "小学生加减乘除不熟练怎么练", tags: ["小学", "计算", "数学"] },
    { title: "初中生代数方程总出错怎么办", tags: ["初中", "代数", "方程"] },
    { title: "高中生函数学不会怎么突破", tags: ["高中", "函数", "数学"] },
    { title: "小学生应用题不会列式怎么引导", tags: ["小学", "应用题", "数学"] },
    { title: "初中生几何证明没思路怎么办", tags: ["初中", "几何", "证明"] },
    { title: "高中生导数难题怎么入手", tags: ["高中", "导数", "数学"] },
    { title: "小学生数学思维怎么启蒙", tags: ["小学", "数学思维", "启蒙"] },
    { title: "初中生数学成绩突然下滑怎么办", tags: ["初中", "下滑", "数学"] },
    { title: "高中生数学怎么从80分提到120", tags: ["高中", "提分", "数学"] },
  ],
  英语学习: [
    { title: "小学生英语启蒙怎么开始", tags: ["小学", "启蒙", "英语"] },
    { title: "初中生英语语法总混淆怎么办", tags: ["初中", "语法", "英语"] },
    { title: "高中生英语完形填空丢分多", tags: ["高中", "完形填空", "英语"] },
    { title: "小学生怎么积累英语词汇", tags: ["小学", "词汇", "英语"] },
    { title: "初中生英语作文模板怎么用", tags: ["初中", "写作", "英语"] },
    { title: "高中生英语阅读速度怎么提升", tags: ["高中", "阅读速度", "英语"] },
  ],
  "升学与规划": [
    { title: "小升初择校需要关注什么", tags: ["小学", "小升初", "择校"] },
    { title: "初中生要不要上衔接班", tags: ["初中", "衔接", "规划"] },
    { title: "高中生怎么规划高一到高三", tags: ["高中", "三年规划", "路径"] },
    { title: "小学阶段需要提前学奥数吗", tags: ["小学", "奥数", "超前学习"] },
    { title: "初中生要不要参加竞赛", tags: ["初中", "竞赛", "规划"] },
    { title: "高中生强基计划怎么准备", tags: ["高中", "强基", "招生"] },
  ],
  "兴趣与能力培养": [
    { title: "小学生兴趣班怎么选不踩坑", tags: ["小学", "兴趣班", "选择"] },
    { title: "初中生课外活动怎么平衡学业", tags: ["初中", "课外活动", "平衡"] },
    { title: "高中生怎么发展特长助力升学", tags: ["高中", "特长", "升学"] },
    { title: "小学生怎么培养阅读兴趣", tags: ["小学", "阅读", "培养"] },
    { title: "初中生沉迷小说不爱课本怎么办", tags: ["初中", "小说", "兴趣转化"] },
    { title: "高中生想走艺术路线怎么规划", tags: ["高中", "艺术", "路线"] },
  ],
  "手机与游戏管理": [
    { title: "小学生要不要给配手机", tags: ["小学", "手机", "配备"] },
    { title: "初中生手机管不住怎么定规则", tags: ["初中", "手机", "规则"] },
    { title: "高中生住校手机管理怎么约定", tags: ["高中", "住校", "手机"] },
    { title: "小学生看短视频上瘾怎么办", tags: ["小学", "短视频", "上瘾"] },
    { title: "初中生打游戏影响成绩怎么办", tags: ["初中", "游戏", "成绩"] },
    { title: "高中生说打游戏解压是不是借口", tags: ["高中", "游戏", "解压"] },
  ],
  "家长自我成长": [
    { title: "小学家长怎么做到不陪写作业也放心", tags: ["小学", "陪写", "放手"] },
    { title: "初中家长怎么适应孩子的独立期", tags: ["初中", "独立", "适应"] },
    { title: "高中家长怎么做好后勤不过度干预", tags: ["高中", "后勤", "边界"] },
    { title: "小学阶段最重要的家长功课是什么", tags: ["小学", "家长", "核心"] },
    { title: "初中阶段家长最容易犯的错", tags: ["初中", "家长", "误区"] },
    { title: "高考前家长怎么稳定自己的心态", tags: ["高中", "高考", "心态"] },
  ],
  "家庭规则与陪伴": [
    { title: "小学生作息表怎么设计合理", tags: ["小学", "作息", "安排"] },
    { title: "初中生要求更多自由怎么平衡规则", tags: ["初中", "自由", "规则"] },
    { title: "高中生住校后家庭规则怎么调整", tags: ["高中", "住校", "规则"] },
    { title: "小学生周末怎么安排学习和玩", tags: ["小学", "周末", "安排"] },
    { title: "初中生假期怎么规划不荒废", tags: ["初中", "假期", "规划"] },
    { title: "高中生寒暑假怎么高效利用", tags: ["高中", "假期", "效率"] },
  ],
  "AI提示词工具箱": [
    { title: "小学生语数英AI辅导提示词", tags: ["小学", "提示词", "辅导"] },
    { title: "初中生各科预习复习AI提示词", tags: ["初中", "提示词", "预习复习"] },
    { title: "高中生刷题纠错AI提示词", tags: ["高中", "提示词", "刷题"] },
    { title: "小学生作文AI批改提示词", tags: ["小学", "提示词", "作文"] },
    { title: "初中生错题归因AI分析提示词", tags: ["初中", "提示词", "错题"] },
    { title: "高中生考前冲刺AI计划提示词", tags: ["高中", "提示词", "冲刺"] },
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

  console.log(`\n为 ${categories.length} 个一级目录补充小学/初中/高中问题...\n`);

  let totalCreated = 0;

  for (const cat of categories) {
    const problems = SUPPLEMENT[cat.name];
    if (!problems) {
      console.log(`  — "${cat.name}" 无补充数据，跳过`);
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
    console.log(`  ✓ ${cat.name}：新增 ${created} 条（跳过已有 ${problems.length - created} 条）`);
  }

  console.log(`\n✅ 完成！共新增 ${totalCreated} 条按学段细分的二级问题。`);
  console.log(`请到后台检查，确认问题列表无误后再补充详情内容。\n`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
