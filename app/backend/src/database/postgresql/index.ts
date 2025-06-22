import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient<
  {
    log: {
      emit: "event";
      level: "query";
    }[];
  },
  "query"
  >;
}

declare const global: CustomNodeJsGlobal;

const prisma =
  global.prisma ||
  new PrismaClient({ log: [{ emit: "event", level: "query" }], });

global.prisma = prisma;

// prisma.$on("query", (e) =>
//   console.log(
//     `
//     ${"=".repeat(50)}
//     QUERY - ${e.query}\nPARAMS - ${e.params}
//     ${"=".repeat(50)}
//     `
//   )
// );

process.on("exit", () => {
  prisma.$disconnect();
  console.info("o cliente prisma foi desconectado. (exit)");
});

export default prisma;
