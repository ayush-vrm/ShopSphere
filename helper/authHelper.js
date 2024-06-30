import bcrypt from "bcrypt"

export const hashpassword = async (password)=>{
    try {
        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(password,saltrounds)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparepassword = async(password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword)
}