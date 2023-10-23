// INPUT:
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel77439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// OUTPUT:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//               Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//             Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
  const [status, from, to, time] = flight.split(';');
  const output = `${status.startsWith('_Delayed') ? '🔴' : ''}${status.replaceAll('_', ' ')} ${from
    .slice(0, 3)
    .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(':', 'h')})`;
  console.log(output.padStart(40));
}
