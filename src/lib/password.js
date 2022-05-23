import md5 from "md5-nodejs";

export default async function encrypt(password) {
    return await md5(password);
}


