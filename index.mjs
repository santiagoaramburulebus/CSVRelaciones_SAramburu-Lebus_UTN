import { input } from "./utils.mjs"
import { crearUsuario } from "./menues/crear_usuario.mjs"
import { iniciarSesion } from "./menues/sesiones.mjs"
import { menuPosts } from "./menues/posts.mjs"

while (true) {
    console.clear()
    console.log("========================================")
    console.log("        CONSOLA SOCIAL ARGENTINA        ")
    console.log("========================================")
    console.log(`
        1. Iniciar Sesión
        2. Crear Cuenta
        3. Salir
        `)

    const opcion = await input(": ")

    if (opcion === "1") {
        const usuario = await iniciarSesion()
        if (usuario) {
            await menuPosts(usuario)
        }
    }
    else if (opcion === "2") {
        await crearUsuario()
    }
    else if (opcion === "3") {
        break
    }
    else {
        console.log("Esa opción no existe, dale que no es tan difícil")
        await input("...")
    }
}

console.clear()
console.log("Chausito, volvé pronto")
console.log("")