import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"

export async function crearUsuario () {
    while (true) {
        console.clear()
        console.log("Querés crear una cuenta nueva? (s/n)")
        const opcion = await input(": ")
        if (opcion.toLowerCase() === "s") {
            await crear()
            break
        } else if (opcion.toLowerCase() === "n") {
            break
        }
    }
}

async function crear () {
    console.clear()
    console.log("----------- CREAR CUENTA -----------")
    console.log("")
    
    const nombre = await input("Nombre: ")
    const apellido = await input("Apellido: ")
    const dni = await input("DNI: ")
    const email = await input("Email: ")

    const existente = await Usuario.buscarPorEmail(email)
    if (existente) {
        console.log("")
        console.log("Ese email ya está registrado, probá con otro")
        await input("Presiona enter para continuar...")
        return
    }

    const usuario = new Usuario(nombre, apellido, dni, email)
    await usuario.guardar()
    console.log("")
    console.log("Listo! Ya podés iniciar sesión con tu cuenta")
    await input("Presione enter para continuar...")
}