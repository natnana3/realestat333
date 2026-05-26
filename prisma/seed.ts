import { getPrisma } from "../src/lib/prisma";
import { MARYLAND_COUNTIES, slugifyCounty } from "../src/lib/md-counties";

const prisma = getPrisma();

async function main() {
  for (const name of MARYLAND_COUNTIES) {
    const slug = slugifyCounty(name.replace(/ County$/i, ""));
    await prisma.county.upsert({
      where: { slug },
      update: { name, stateCode: "MD" },
      create: { name, slug, stateCode: "MD" },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

