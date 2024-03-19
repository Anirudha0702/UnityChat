export default function formatime(date) {
    const jsDate = new Date(date);
    let hours = jsDate.getHours();
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const readableTime = `${hours}:${minutes} ${ampm}`;

    return readableTime;
}