import { input } from "../utils.mjs"
import { Post } from "./posts.mjs"
import { Usuario } from "../models/usuarios.mjs"

export async function menuPosts(usuarioActual) {
    while (true) {
        console.clear()
        console.log(`Hola ${usuarioActual.nombre}!`)
        console.log("----------- MENÚ POSTS -----------")
        console.log(`
        1. Crear Post
        2. Ver todos los Posts
        3. Ver un Post específico
        4. Cerrar Sesión
        `)
        
        const opcion = await input(": ")
        
        if (opcion === "1") {
            await crearPost(usuarioActual)
        } else if (opcion === "2") {
            await listarPosts()
        } else if (opcion === "3") {
            await verPost(usuarioActual)
        } else if (opcion === "4") {
            break
        } else {
            console.log("Esa opción no existe, maestro")
            await input("...")
        }
    }
}

async function crearPost(usuario) {
    console.clear()
    console.log("----------- CREAR POST -----------")
    console.log("")
    
    const titulo = await input("Título del post: ")
    const contenido = await input("Contenido: ")
    
    const post = new Post(usuario.id, titulo, contenido)
    await post.guardar()
    
    await input("Presione enter para continuar...")
}

async function listarPosts() {
    console.clear()
    console.log("----------- TODOS LOS POSTS -----------")
    console.log("")
    
    const posts = await Post.listar()
    
    if (posts.length === 0) {
        console.log("No hay posts todavía, hace uno flaco")
    } else {
        console.log("ID | Título                          | Autor")
        console.log("------------------------------------------------")
        
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i]
            const usuario = await post.obtenerUsuario()
            const tituloCorto = post.titulo.length > 30 ? post.titulo.substring(0, 27) + "..." : post.titulo
            const autorNombre = usuario ? `${usuario.nombre} ${usuario.apellido}` : "Usuario eliminado"
            
            let idStr = post.id.toString()
            while (idStr.length < 2) idStr = " " + idStr
            
            let tituloStr = tituloCorto
            while (tituloStr.length < 31) tituloStr = tituloStr + " "
            
            console.log(`${idStr} | ${tituloStr} | ${autorNombre}`)
        }
    }
    
    console.log("")
    await input("Presione enter para continuar...")
}

async function verPost(usuarioActual) {
    console.clear()
    const idStr = await input("Ingrese el ID del post a ver: ")
    const id = parseInt(idStr)
    
    const post = await Post.buscarPorId(id)
    
    if (!post) {
        console.log("Ese post no existe, fijate bien el ID")
        await input("...")
        return
    }
    
    const autor = await post.obtenerUsuario()
    
    console.clear()
    console.log("----------- DETALLE DEL POST -----------")
    console.log("")
    console.log(`Título: ${post.titulo}`)
    console.log(`Autor: ${autor ? autor.nombre + " " + autor.apellido : "Usuario eliminado"}`)
    console.log("----------------------------------------")
    console.log("")
    console.log(post.contenido)
    console.log("")
    console.log("----------------------------------------")
    
    if (post.usuario_id === usuarioActual.id) {
        console.log("")
        console.log("Este es tu post, querés eliminarlo? (s/n)")
        const opcion = await input(": ")
        
        if (opcion.toLowerCase() === "s") {
            const confirmacion = await input("Seguro? No hay vuelta atrás eh (s/n): ")
            if (confirmacion.toLowerCase() === "s") {
                await Post.eliminar(post.id)
                console.log("Post eliminado!")
                await input("...")
            }
        }
    } else {
        await input("Presione enter para volver...")
    }
}