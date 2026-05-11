/**
 * Migrate all data from SQLite (dev.db) to PostgreSQL.
 * Run: npx tsx prisma/migrate-sqlite-to-pg.ts
 */
import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";

const sqlite = new Database("prisma/dev.db", { readonly: true });
const pg = new PrismaClient();

async function main() {
  console.log("开始从 SQLite 迁移数据到 PostgreSQL...\n");

  // 1. AdminUser
  const admins = sqlite.prepare("SELECT * FROM AdminUser").all() as any[];
  for (const row of admins) {
    await pg.adminUser.create({
      data: {
        id: row.id,
        email: row.email,
        passwordHash: row.passwordHash,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
  }
  console.log(`✓ AdminUser: ${admins.length} 条`);

  // 2. Category
  const categories = sqlite.prepare("SELECT * FROM Category").all() as any[];
  for (const row of categories) {
    await pg.category.create({
      data: {
        id: row.id,
        name: row.name,
        description: row.description,
        sortOrder: row.sortOrder,
        isActive: row.isActive === 1,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
  }
  console.log(`✓ Category: ${categories.length} 条`);

  // 3. Problem
  const problems = sqlite.prepare("SELECT * FROM Problem").all() as any[];
  let problemCount = 0;
  for (const row of problems) {
    await pg.problem.create({
      data: {
        id: row.id,
        title: row.title,
        categoryId: row.categoryId,
        sortOrder: row.sortOrder,
        essence: row.essence || "",
        mistakes: row.mistakes || "",
        principles: row.principles || "",
        steps: row.steps || "",
        script: row.script || "",
        prompt: row.prompt || "",
        isPublished: row.isPublished === 1,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
    problemCount++;
    if (problemCount % 100 === 0) console.log(`  Problem 进度: ${problemCount}/${problems.length}`);
  }
  console.log(`✓ Problem: ${problems.length} 条`);

  // 4. Tag
  const tags = sqlite.prepare("SELECT * FROM Tag").all() as any[];
  for (const row of tags) {
    await pg.tag.create({
      data: {
        id: row.id,
        name: row.name,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
  }
  console.log(`✓ Tag: ${tags.length} 条`);

  // 5. ProblemTag
  const problemTags = sqlite.prepare("SELECT * FROM ProblemTag").all() as any[];
  let ptCount = 0;
  for (const row of problemTags) {
    try {
      await pg.problemTag.create({
        data: { problemId: row.problemId, tagId: row.tagId },
      });
      ptCount++;
    } catch {
      // skip orphaned relations
    }
  }
  console.log(`✓ ProblemTag: ${ptCount} 条`);

  // 6. TemplateField
  const templates = sqlite.prepare("SELECT * FROM TemplateField").all() as any[];
  for (const row of templates) {
    await pg.templateField.create({
      data: {
        id: row.id,
        name: row.name,
        sortOrder: row.sortOrder,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
  }
  console.log(`✓ TemplateField: ${templates.length} 条`);

  // 7. Feedback
  const feedbacks = sqlite.prepare("SELECT * FROM Feedback").all() as any[];
  for (const row of feedbacks) {
    await pg.feedback.create({
      data: {
        id: row.id,
        source: row.source,
        type: row.type,
        content: row.content,
        rating: row.rating,
        status: row.status,
        createdAt: new Date(row.createdAt),
      },
    });
  }
  console.log(`✓ Feedback: ${feedbacks.length} 条`);

  console.log("\n===== 迁移完成 =====");
}

main()
  .finally(() => pg.$disconnect())
  .catch((e) => {
    console.error(e);
    pg.$disconnect();
    process.exit(1);
  });
