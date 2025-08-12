import fs from "fs/promises"

export class Usuario {

    static file = "usuarios.csv"
    static columns = ["ID", "Nombre", "Apellido", "DNI", "Email"]
    
    constructor (nombre, apellido, dni, email) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
        this.id = null
    }

    async guardar () {
        try {
            await fs.access(this.constructor.file)
        } catch {
            const header = this.constructor.columns.join(";") + "\n"
            await fs.writeFile(this.constructor.file, header)
        }

        const contenido = await fs.readFile(this.constructor.file, { encoding: "utf-8" })
        const lineas = contenido.trim().split("\n")
        
        let maxId = 0
        for (let i = 1; i < lineas.length; i++) {
            if (lineas[i].trim()) {
                const campos = lineas[i].split(";")
                const id = parseInt(campos[0])
                if (id > maxId) maxId = id
            }
        }
        
        this.id = maxId + 1
        const nuevaLinea = `${this.id};${this.nombre};${this.apellido};${this.dni};${this.email}\n`
        await fs.appendFile(this.constructor.file, nuevaLinea)
        
        console.log("Usuario creado exitosamente")
        return this.id
    }

    static async buscarPorEmail(email) {
        try {
            const contenido = await fs.readFile(this.file, { encoding: "utf-8" })
            const lineas = contenido.trim().split("\n")
            
            for (let i = 1; i < lineas.length; i++) {
                if (lineas[i].trim()) {
                    const campos = lineas[i].split(";")
                    if (campos[4] === email) {
                        const usuario = new Usuario(campos[1], campos[2], campos[3], campos[4])
                        usuario.id = parseInt(campos[0])
                        return usuario
                    }
                }
            }
        } catch {
            return null
        }
        return null
    }

    static async buscarPorId(id) {
        try {
            const contenido = await fs.readFile(this.file, { encoding: "utf-8" })
            const lineas = contenido.trim().split("\n")
            
            for (let i = 1; i < lineas.length; i++) {
                if (lineas[i].trim()) {
                    const campos = lineas[i].split(";")
                    if (parseInt(campos[0]) === id) {
                        const usuario = new Usuario(campos[1], campos[2], campos[3], campos[4])
                        usuario.id = parseInt(campos[0])
                        return usuario
                    }
                }
            }
        } catch {
            return null
        }
        return null
    }

    static async listar() {
        try {
            const contenido = await fs.readFile(this.file, { encoding: "utf-8" })
            const lineas = contenido.trim().split("\n")
            const usuarios = []
            
            for (let i = 1; i < lineas.length; i++) {
                if (lineas[i].trim()) {
                    const campos = lineas[i].split(";")
                    const usuario = new Usuario(campos[1], campos[2], campos[3], campos[4])
                    usuario.id = parseInt(campos[0])
                    usuarios.push(usuario)
                }
            }
            return usuarios
        } catch {
            return []
        }
    }
}