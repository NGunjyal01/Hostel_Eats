export function formatTime(time){
    const [hour,min] = time.split(":");
    return ( hour%12 || 12) + ":" + min + (+hour<12?" AM":" PM"); 
}