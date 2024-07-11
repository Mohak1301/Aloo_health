import bcrypt from "bcrypt"

export const hashPassword = async(password)=>{
    try {
      const saltrounds = 10;
      const hash = await bcrypt.hash(password, saltrounds);
      return hash;
    } catch (error) {
        console.log(error)
    }
}


export const comparePassword = async(password,hashPassword) =>{
    try {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    } catch (error) {
        console.log(error)
    }
}