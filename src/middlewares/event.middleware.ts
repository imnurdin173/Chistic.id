import { z } from "zod";

export const createEventSchema = z
  .object({
    title: z.string().min(5, "Event title must be at least 5 characters").max(100, "Maximum is 100 Character"),
    category: z.enum(["MUSIC", "SEMINAR", "TALKSHOW", "SPORTS", "EXHIBITION"]),

    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date Format"),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date format"),

    description: z.string().min(20, "Description must be at least 20 characters").max(250, "Maximum Character in Description is 250 characters"),
    province: z.string().min(1, "City is required"),
    city: z.string().min(1, "City is required"),
    venueDetail: z.string().min(3, "Venue detail is required"),
    venueMaps: z.string().url().optional().or(z.literal("")),
    totalTicket: z.number().int().positive("Total ticket must be greater than 0"),

    ticketTiers: z
      .array(
        z.object({
          name: z.string().min(1, "Ticket tier name is required"),
          price: z.number().min(0, "Price cannot be negative"),
          finalPrice: z.number().min(0, "Final Price cannot be negative"),
          quota: z.number().int().min(1, "Quota must be at least 1"),
        }),
      )
      .min(1, "Must have at least 1 ticket tier"),

    presale: z
      .object({
        enabled: z.boolean(),
        amount: z.number().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
      .optional(),
  })

  .refine((data) => {
    const sumTierQuota = data.ticketTiers.reduce((acc, t) => acc + t.quota, 0);
    const presaleQuota = data.presale?.enabled ? Number(data.presale.amount || 0) : 0;
    return sumTierQuota + presaleQuota === data.totalTicket;
  }, {
    message: "Total alokasi tiket tier (VIP + Regular + Presale) must matching with Total Ticket Amount",
    path: ["ticketTiers"],
  });

export type createEventInput = z.infer<typeof createEventSchema>;
