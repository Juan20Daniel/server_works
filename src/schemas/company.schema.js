const { z } = require('zod');

const createCompany = z.object({
    body: z.object({
        name: z
            .string('El nombre es requerido')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \[\]\.,-_$%&()+ ]{1,50}$/),
        desc: z
            .string('La descripción es requerida')
            .regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ \"\'\.?¿!¡#,-_$%&()+ ]{1,50}$/)
    })
});

module.exports = {
    createCompany
}