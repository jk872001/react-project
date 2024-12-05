import { z } from 'zod';

export const OfferingFormSchema = z.object({
    name: z.string().min(1, "Name is required"), // Validates that name is a non-empty string
    defaultPrice: z
        .string()
        .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
            message: "Default price must be a non-negative number",
        }),
    defaultCost: z
        .string()
        .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
            message: "Default cost must be a non-negative number",
        }),
    defaultEffort: z
        .string()
        .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
            message: "Default effort must be a non-negative number",
        }),
    defaultDuration: z
        .string()
        .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
            message: "Default duration must be a non-negative number",
        }),
    isRecurring: z.string().min(1, "Recurring status is required"), // Ensures this field is non-empty
});

export const DeliveryFormSchema = z.object({
    name: z.string().min(1, "Name is required"),  
    // customerId: z
    // .string()
    // .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
    //     message: "Default duration must be a non-negative number",
    // }),
    // offeringId: z
    // .string()
    // .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
    //     message: "Default duration must be a non-negative number",
    // }),  
    customerId: z.string().min(1, "Customer Id is required"), 
    offeringId: z.string().min(1, "Offering Id is required"), 
    planStartDate: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Invalid start date format",
        }), 
    planEndDate: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Invalid end date format",
        }), 
    price: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) >= 0, {
        message: "Default duration must be a non-negative number",
    }),
    
});