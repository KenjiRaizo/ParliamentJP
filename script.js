let d = new Date();
const cal = document.getElementById("calendar-table");
const m = document.getElementById("month-year");
const prev = document.getElementById("prev-month");
const next = document.getElementById("next-month");

function drawCalendar(){
    cal.innerHTML = "";
    m.textContent = d.toLocaleString("pl",{month:"long",year:"numeric"});
    const y = d.getFullYear(), mo = d.getMonth();
    const firstDay = new Date(y, mo, 1).getDay() || 7;
    const days = new Date(y, mo+1, 0).getDate();

    let row = cal.insertRow();
    ["P","W","Ś","C","P","S","N"].forEach(x=>{
        let cell = row.insertCell();
        cell.innerHTML = "<b>" + x + "</b>";
    });

    row = cal.insertRow();
    for(let i=1;i<firstDay;i++) row.insertCell();

    for(let i=1;i<=days;i++){
        if(row.cells.length===7) row = cal.insertRow();
        let cell = row.insertCell();
        cell.textContent = i;
        const today = new Date();
        if(i===today.getDate() && mo===today.getMonth() && y===today.getFullYear()) {
            cell.className = "today";
        }
    }
}

prev.addEventListener("click", () => { d.setMonth(d.getMonth()-1); drawCalendar(); });
next.addEventListener("click", () => { d.setMonth(d.getMonth()+1); drawCalendar(); });

drawCalendar();
