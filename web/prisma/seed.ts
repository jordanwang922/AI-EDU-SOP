import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.problemTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.problem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.templateField.deleteMany();
  await prisma.feedback.deleteMany();

  const pwd = await bcrypt.hash("Admin@123456", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@ai-sop.cn" },
    update: { passwordHash: pwd },
    create: { email: "admin@ai-sop.cn", passwordHash: pwd },
  });

  const categorySeeds = [
    ["学习问题", "不爱学、拖拉磨蹭、注意力不集中、考试心态…"],
    ["亲子沟通", "不听话、顶嘴、冷战、吼完后悔…"],
    ["情绪与心理", "发脾气、焦虑、不自信、压力和睡眠…"],
    ["学习习惯", "时间管理、自主学习、复盘与错题…"],
    ["AI学习方法", "家长入门、孩子使用边界、预习复习流程…"],
    ["语文学习", "作文、阅读、古诗文、表达能力…"],
    ["数学学习", "小学·初中·高中数学难点突破…"],
    ["英语学习", "单词、口语、阅读写作听力…"],
    ["升学与规划", "选科、志愿、生涯方向…"],
    ["兴趣与能力培养", "专注力、表达力、项目实践…"],
    ["手机与游戏管理", "规则共建、执行监督、替代活动…"],
    ["家长自我成长", "情绪管理、沟通技巧、教养升级…"],
    ["家庭规则与陪伴", "作息、家务、家庭会议…"],
    ["AI提示词工具箱", "家庭教育、学科辅导、安全边界…"],
    ["课程配套资料区", "训练营 Day1-Day5 资料与复盘模板…"],
  ];
  const categories = [];
  for (let i = 0; i < categorySeeds.length; i++) {
    const [name, description] = categorySeeds[i];
    categories.push(
      await prisma.category.create({
        data: { name, description, sortOrder: i + 1, isActive: true },
      }),
    );
  }

  const problemSeeds: Array<{
    title: string;
    tags: string[];
    essence: string;
    mistakes: string;
    principles: string;
    steps: string;
    script: string;
    prompt: string;
  }> = [
    { title: "孩子写作业拖拉怎么办", tags: ["拖拉", "作业", "执行力", "小学"], essence: "常见是启动困难和任务焦虑，不是单纯懒惰。", mistakes: "高频催促、情绪指责、一次布置过多任务。", principles: "拆小任务、先启动后优化、用过程反馈代替结果施压。", steps: "1. 把今晚任务拆成3段，每段10-15分钟\n2. 先做最容易的一题\n3. 每段完成后休息3分钟", script: "我看到你已经把本子拿出来了，我们先做第一题，做完我给你计时休息3分钟。", prompt: "请按“小学三年级+作业拖拉”场景，生成20分钟可执行陪伴脚本，包含开场话术、任务拆分、哭闹应对。" },
    { title: "孩子不爱学习怎么办", tags: ["不爱学习", "学习动力", "初中"], essence: "动力不足通常来自看不到意义+频繁受挫。", mistakes: "只盯分数、不谈目标、拿别人做对比。", principles: "把目标转成可见小成果，先恢复学习自信。", steps: "1. 共定周目标\n2. 每天记录小进步\n3. 每周复盘并调整", script: "这周我们只盯一个小目标：把数学作业独立完成率提高到80%。", prompt: "请为“初中生不爱学习”生成7天激活动机计划，包含每日行动、鼓励话术和复盘问题。" },
    { title: "孩子总说等一下怎么办", tags: ["拖拉", "等一下", "执行力"], essence: "回避开始本质是对难任务的心理逃避。", mistakes: "连续追问、当场讲大道理、把焦点放在“态度不好”。", principles: "把“等一下”改成“几分钟后开始”的可执行约定。", steps: "1. 先确认情绪\n2. 约定具体开始时间\n3. 到点只提醒一次并执行", script: "你可以先休息5分钟，5分钟后我们从第一小题开始。", prompt: "请生成“孩子总说等一下”的温和执行脚本，包含到点提醒话术。" },
    { title: "小学生不爱学习怎么办", tags: ["不爱学习", "小学", "学习兴趣"], essence: "小学生更多是学习体验差导致兴趣下降。", mistakes: "直接上难题、只批评不鼓励、忽略成功体验。", principles: "先易后难，优先建立胜任感。", steps: "1. 每天先做会的题\n2. 记录一次进步\n3. 再过渡到提升题", script: "先从你最有把握的那道题开始，完成后我们再挑战下一题。", prompt: "请给出小学低年级不爱学习的7天激励计划。" },
    { title: "初中生不爱学习怎么办", tags: ["不爱学习", "初中", "学习动力"], essence: "初中阶段常见“看不到学习回报”与挫败叠加。", mistakes: "只谈成绩排名、忽视学科优势、目标过大。", principles: "短周期目标 + 可见反馈 + 自主参与。", steps: "1. 设一周目标\n2. 每日打卡\n3. 周末复盘奖励", script: "这周我们只盯数学一门，目标是把错题本补齐并订正完成。", prompt: "请输出初中生学习动力重建计划，包含家长每日跟进话术。" },
    { title: "孩子觉得学习没用怎么办", tags: ["学习意义", "不爱学习", "价值感"], essence: "孩子缺少“学习与生活目标”的连接。", mistakes: "空泛说教、灌输式说理、忽视孩子兴趣方向。", principles: "把学习和孩子关心的目标绑定。", steps: "1. 讨论兴趣目标\n2. 找到对应学科连接\n3. 设行动任务", script: "你想做动画设计，那数学和英语就是你以后做项目的工具。", prompt: "请生成“孩子觉得学习没用”场景下的目标连接对话脚本。" },
    { title: "孩子一提学习就烦怎么办", tags: ["学习冲突", "情绪", "沟通"], essence: "学习话题已和负面情绪绑定。", mistakes: "开口就问成绩、追责式提问、忽略情绪状态。", principles: "先修复关系，再推进学习任务。", steps: "1. 先聊感受\n2. 设最小任务\n3. 完成后正反馈", script: "我先不说成绩，想听听你最近最烦学习里的哪件事。", prompt: "请生成“孩子一提学习就烦”的去冲突沟通模板。" },
    { title: "写作业走神、小动作多怎么办", tags: ["注意力", "作业", "走神"], essence: "任务时长超过注意力窗口，导致频繁分心。", mistakes: "强行长时间坐住、环境干扰多、无节奏。", principles: "短时专注+短休息循环。", steps: "1. 15分钟专注\n2. 3分钟休息\n3. 重复2-3轮", script: "我们先专注15分钟，时间到你可以起来活动3分钟。", prompt: "请输出针对写作业走神的番茄钟执行SOP。" },
    { title: "上课分心、记不住老师讲的内容", tags: ["注意力", "课堂", "记忆"], essence: "课堂输入无抓手，复述与提炼不足。", mistakes: "只要求认真听讲，不教笔记方法。", principles: "课堂三点笔记法 + 当天复述。", steps: "1. 记录关键词\n2. 课后3分钟复述\n3. 当晚回看巩固", script: "今天每节课只记3个关键词，回家讲给我听。", prompt: "请给出“上课分心”改进的课堂笔记训练计划。" },
  ];

  for (let i = 0; i < problemSeeds.length; i++) {
    const p = problemSeeds[i];
    const problem = await prisma.problem.create({
      data: {
        title: p.title,
        categoryId: categories[0].id,
        sortOrder: i,
        essence: p.essence,
        mistakes: p.mistakes,
        principles: p.principles,
        steps: p.steps,
        script: p.script,
        prompt: p.prompt,
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
  }

  const fields = ["问题本质", "常见误区", "正确原则", "操作步骤SOP", "沟通话术", "可复制提示词", "可搜索标签"];
  for (let i = 0; i < fields.length; i++) {
    await prisma.templateField.upsert({
      where: { name: fields[i] },
      update: { sortOrder: i + 1 },
      create: { name: fields[i], sortOrder: i + 1 },
    });
  }

  await prisma.feedback.create({
    data: {
      source: "详情页",
      type: "内容建议",
      content: "希望增加更多初中阶段案例。",
      rating: 4,
      status: "待处理",
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
