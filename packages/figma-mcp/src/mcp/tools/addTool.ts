import { z } from "zod";

export const addTool = {
  name: "calculate-bmi",
  input: {
    weightKg: z.number(),
    heightM: z.number(),
  },
  handler: async ({
    weightKg,
    heightM,
  }: {
    weightKg: number;
    heightM: number;
  }) => ({
    content: [
      { type: "text" as const, text: String(weightKg / (heightM * heightM)) },
    ],
  }),
};
