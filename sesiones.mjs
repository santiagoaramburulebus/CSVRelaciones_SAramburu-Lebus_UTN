import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"

export async function iniciarSesion() {
    console.clear()
    console.log("----------- INICIO DE SESIÓN -----------")
    console.log("")
    
    const email = await input("Email: ")
    const dni = await input("DNI: ")
    
    const usuario = await Usuario.buscarPorEmail(email)
    
    if (usuario && usuario.dni === dni) {
        console.log("")
        console.log(`Bienvenido ${usuario.nombre} ${usuario.apellido}!`)
        await input("Presione enter para continuar...")
        return usuario
    } else {
        console.log("")
        console.log("Todo incorrecto che, de nuevo")
        await input("Presione enter para continuar...")
        return null
    }
}