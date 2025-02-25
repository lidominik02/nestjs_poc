import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      eduID: faker.string.uuid(),
      name: faker.person.fullName(),
    },
  });

  await prisma.task.createMany({
    data: new Array(10).fill(0).map(() => ({
      languages: new Array(10)
        .fill(2)
        .map(() => faker.location.language().alpha2),
      points: faker.number.int({ max: 100, min: 0 }),
      public: faker.datatype.boolean(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      userId: user.id,
    })),
  });
}

main();
