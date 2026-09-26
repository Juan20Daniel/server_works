const { z } = require('zod');

const createSchema = z.object({
    body: z.object({
        name: z
            .string('El nombre es requerido')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \[\]\.,-_$%&()+ ]{1,50}$/),
        desc: z
            .string('La descripción es requerida')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \"\'\.?¿!¡#,-_$%&()+ ]{1,200}$/)
    }),

});

const getSchema = z.object({
    query: z.object({  
        createdBy: z
            .coerce
            .string()
            .length(24,'createdBy debe tener 24 caracteres')
            .optional(),
        page: z
            .coerce
            .number()
            .int()
            .min(1)
            .default(1),
        limit: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .default(10),
        active: z
            .enum(['true', 'false'])
            .transform(value => {
                return value === 'true' ? true : false
            })
            .optional(),
    })
});

module.exports = {
    createSchema,
    getSchema
}