export function formatDate(dateString){
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return (days[date.getDay()] + ", " + months[date.getMonth()] + " " + dateString.split('-')[2] + ", " + dateString.split('-')[0]);
}