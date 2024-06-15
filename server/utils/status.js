const getCanteenStatus = (openingMainTime, closingMainTime, currentTime) => {
  const currentTimeString = currentTime.toISOString();
  const [date, time] = currentTimeString.split("T");
  const [hours, minutes, seconds] = time.split(":");

  const currentHour = parseInt(hours);
  const currentMinutes = parseInt(minutes);

 const openingTime = openingMainTime.toString();
 const [openHour, openMinutes] = openingTime.split(":");
 const closingTime = closingMainTime.toString();
 const [closeHour, closeMinutes] = closingTime.split(":");

 
const openingHour = parseInt(openHour);
const openingMinutes = parseInt(openMinutes);
const closingHour = parseInt(closeHour);
const closingMinutes = parseInt(closeMinutes);

  let status = "Closed";

 if (openingHour < closingHour) {
   // Canteen closes the same day
   if (
     (currentHour > openingHour ||
       (currentHour === openingHour && currentMinutes >= openingMinutes)) &&
     (currentHour < closingHour ||
       (currentHour === closingHour && currentMinutes <= closingMinutes))
   ) {
     status = "Open";
   }
 } else {
   // Canteen closes the next day
   if (
     currentHour > openingHour ||
     (currentHour === openingHour && currentMinutes >= openingMinutes) ||
     currentHour < closingHour ||
     (currentHour === closingHour && currentMinutes <= closingMinutes)
   ) {
     status = "Open";
   }
 }

  return status;
};

module.exports = {
  getCanteenStatus,
};
