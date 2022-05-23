export default function random(){
    const posible = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = 0;
    for(let i=0; i<6; i++){
       name += posible.charAt(Math.floor(Math.random() * posible.length));
    }
    return name;
}