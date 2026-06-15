const { z } = require("zod");

const createUserSchema = z.object({
    body: z.object({
        firstname: z.string().regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ ]{3,50}$/,"El nombre no es válido"),
        lastname: z.string().regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ ]{3,50}$/,"El apellido no es válido"),
        email: z.email("El correo no es válido"),
        password: z.string("La contraseña no es válida").regex(/^.{8,100}$/, "La contraseña no es válida")
    })
});

const loginSchema = z.object({
    body: z.object({
        email: z.email("El correo no es válido"),
        password: z.string("La contraseña no es válida").regex(/^.{8,100}$/, "La contraseña no es válida")
    })
});

module.exports = {
    createUserSchema,
    loginSchema
};