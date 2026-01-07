let d=new Date();
const cal=document.getElementById("calendar-table");
const m=document.getElementById("month-year");
const prev=document.getElementById("prev-month");
const next=document.getElementById("next-month");

function drawCalendar(){
  cal.innerHTML="";
  m.textContent=d.toLocaleString("pl",{month:"long",year:"numeric"});
  const y=d.getFullYear(), mo=d.getMonth();
  const f=new Date(y,mo,1).getDay()||7;
  const days=new Date(y,mo+1,0).getDate();
  let r=cal.insertRow();
  ["P","W","Ś","C","P","S","N"].forEach(x=>{
    let c=r.insertCell();c.innerHTML="<b>"+x+"</b>";
  });
  r=cal.insertRow();
  for(let i=1;i<f;i++) r.insertCell();
  for(let i=1;i<=days;i++){
    if(r.cells.length==7) r=cal.insertRow();
    let c=r.insertCell();c.textContent=i;
    let t=new Date();
    if(i==t.getDate()&&mo==t.getMonth()&&y==t.getFullYear()) c.className="today";
  }
}

prev.addEventListener("click",()=>{d.setMonth(d.getMonth()-1);drawCalendar();});
next.addEventListener("click",()=>{d.setMonth(d.getMonth()+1);drawCalendar();});
drawCalendar();
