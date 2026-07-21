const { z } = require("zod");

const createUserSchema = z.object({
    body: z.object({
        firstname: z.string().regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ ]{3,50}$/,"El nombre no es válido"),
        lastname: z.string().regex(/^[a-zA-ZáÁéÉíÍóÓúÚñÑ ]{3,50}$/,"El apellido no es válido"),
        email: z.email("El correo no es válido"),
        password: z.string("La contraseña no es válida").regex(/^.{8,100}$/, "La contraseña no es válida")
    })
});

const loginWihEmailSchema = z.object({
    body: z.object({
        email: z.email("El correo no es válido"),
        password: z.string("La contraseña no es válida").regex(/^.{8,100}$/, "La contraseña no es válida")
    })
});

const continueWithGoogleSchema = z.object({
    body: z.object({
        accessToken: z.string("AccessToken no válido").regex(/^.{50,}$/, "El accessToken no es válido")
    })
});

const continueWithFacebookSchema = z.object({
    body: z.object({
        token: z.string("Token no válido").regex(/^.{50,}$/, "El token no es válido"),
        tokenType: z.string("TypeToken no válido").regex(/^authentication_token|access_token$/, "El typeToken no es válido")
    })
});


const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string("El refreshToken no es válido").regex(/^.{100,}$/, "El refreshToken no es válido")
    })
});

module.exports = {
    createUserSchema,
    loginWihEmailSchema,
    continueWithGoogleSchema,
    continueWithFacebookSchema,
    refreshSchema
};