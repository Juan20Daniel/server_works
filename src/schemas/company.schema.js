const { z } = require('zod');

const createCompanySchema = z.object({
    body: z.object({
        name: z
            .string('El nombre es requerido')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \[\]\.,-_$%&()+ ]{1,50}$/),
        desc: z
            .string('La descripción es requerida')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \"\'\.?¿!¡#,-_$%&()+ ]{1,50}$/)
    }),

});

const getByCreatorIdSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10)
});

module.exports = {
    createCompanySchema,
    getByCreatorIdSchema
}