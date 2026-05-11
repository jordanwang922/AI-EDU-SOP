/**
 * Merge all content JSON files and update database.
 * Run: npx tsx prisma/update-all-content.ts
 */
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

type ContentEntry = {
  essence: string;
  mistakes: string;
  principles: string;
  steps: string;
  script: string;
  prompt: string;
  extraTags?: string[];
};

async function main() {
  // Load all content files
  const files = [
    "/tmp/content-group-a.json",
    "/tmp/content-group-b.json",
    "/tmp/content-group-c.json",
    "/tmp/content-group-d.json",
  ];

  const allContent: Record<string, ContentEntry> = {};
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(f, "utf-8")) as Record<string, ContentEntry>;
    Object.assign(allContent, data);
  }

  const ids = Object.keys(allContent);
  console.log(`\n合并完成：共 ${ids.length} 条问题内容待写入\n`);

  let updated = 0;
  let failed = 0;
  let tagsAdded = 0;

  for (const id of ids) {
    const c = allContent[id];
    if (!c || !c.essence) {
      failed++;
      continue;
    }

    try {
      // Update problem content
      await prisma.problem.update({
        where: { id },
        data: {
          essence: c.essence,
          mistakes: c.mistakes,
          principles: c.principles,
          steps: c.steps,
          script: c.script,
          prompt: c.prompt,
        },
      });

      // Add extra tags
      if (c.extraTags && c.extraTags.length > 0) {
        for (const tagName of c.extraTags) {
          const trimmed = tagName.trim();
          if (!trimmed) continue;
          try {
            const tag = await prisma.tag.upsert({
              where: { name: trimmed },
              update: {},
              create: { name: trimmed },
            });
            // Check if relation exists
            const existing = await prisma.problemTag.findUnique({
              where: { problemId_tagId: { problemId: id, tagId: tag.id } },
            });
            if (!existing) {
              await prisma.problemTag.create({
                data: { problemId: id, tagId: tag.id },
              });
              tagsAdded++;
            }
          } catch {
            // skip duplicate tag errors
          }
        }
      }

      updated++;
      if (updated % 50 === 0) {
        console.log(`  进度：${updated}/${ids.length}...`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`  ✗ 更新失败 [${id}]: ${msg}`);
      failed++;
    }
  }

  console.log(`\n===== 完成 =====`);
  console.log(`  成功更新：${updated} 条`);
  console.log(`  新增标签关联：${tagsAdded} 条`);
  if (failed > 0) console.log(`  失败：${failed} 条`);

  // Verify: count problems with non-placeholder content
  const filled = await prisma.problem.count({
    where: { essence: { not: { contains: "待补充" } } },
  });
  const total = await prisma.problem.count();
  console.log(`\n  数据库验证：${filled}/${total} 条问题已有实际内容\n`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
