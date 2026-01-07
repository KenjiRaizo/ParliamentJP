const cal = document.getElementById("calendar-table");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
let d = new Date();

function drawCalendar(){
    cal.innerHTML = "";
    monthYear.textContent = d.toLocaleString("pl",{month:"long",year:"numeric"});
    const y = d.getFullYear(), m = d.getMonth();
    const firstDay = new Date(y,m,1).getDay() || 7;
    const days = new Date(y,m+1,0).getDate();
    let row = cal.insertRow();
    ["P","W","Ś","C","P","S","N"].forEach(x=>{
        let c = row.insertCell();
        c.innerHTML = "<b>"+x+"</b>";
    });
    row = cal.insertRow();
    for(let i=1;i<firstDay;i++) row.insertCell();
    for(let i=1;i<=days;i++){
        if(row.cells.length===7) row = cal.insertRow();
        let cell = row.insertCell();
        cell.textContent = i;
        let t = new Date();
        if(i===t.getDate() && m===t.getMonth() && y===t.getFullYear()) cell.className="today";
    }
}

prevBtn.addEventListener("click", ()=>{ d.setMonth(d.getMonth()-1); drawCalendar(); });
nextBtn.addEventListener("click", ()=>{ d.setMonth(d.getMonth()+1); drawCalendar(); });
drawCalendar();
