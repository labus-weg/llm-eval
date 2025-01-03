// script.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new ExperimentResult entry
  const result = await prisma.experimentResult.create({
    data: {
      prompt: "Test Prompt",
      modelName: "Test Model",
      provider: "Test Provider",
      response: "Test Response",
      responseTime: 1.23,
    },
  });
  console.log(result);

  // Fetch all ExperimentResults
  const results = await prisma.experimentResult.findMany();
  console.log(results);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
