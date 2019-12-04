const displayedMonCon = document.querySelector(".mon");
const x = document.querySelectorAll(".mon-val");
const monArr = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];
const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let year,month;
let timeJsonObj;
let weekJsonObj;
let week = [' '];
var l = document.querySelectorAll(".duty-row").length;
var tot_col;
var b;
var dutyArray=[];

// IIFE BLOCK 
{
    displayedMonCon.style.display = "none";
    document.querySelector(".month-display").style.display = "none";
    document.querySelector(".year-display").style.display = "none";
    let date = new Date();
    document.querySelector(".year").value = date.getFullYear();
    document.querySelector(".input-table-con").style.display = "none";   
    //localStorage.clear();
    if(localStorage.Time)
        displayTable(); 
          
}

//  EVENT LISTENER FOR MONTH LIST
document.querySelector(".month").addEventListener("focus" , function(){
    displayedMonCon.style.display = "block";
})


// EVENT LISTENER FOR MONTH LIST === NONE
document.querySelector(".ok").addEventListener("click" , function(){
    displayedMonCon.style.display = "none";
})

// EVENT LISTENER FOR SELECTING MON
x.forEach(element => {
    element.addEventListener("click" , function(){
        removeBorder();
        element.style.border = "2px red inset";
        document.querySelector(".month").value = element.innerHTML;
    })
})

function removeBorder(){
    for(let i=0;i<x.length;i++)
    x[i].style.border = "none";
}


// EVENT LISTENER FOR DISPLAYING THE FINAL MONTH AND YEAR
document.querySelector(".confirm").addEventListener("click" , function(){
    year = document.querySelector(".year").value;
    let l = year.length;
    year = parseInt(year);
    month = document.querySelector(".month").value;
    if(month === "")
        alert("Enter Month");
    else 
    {
        let flag=-1;
        for(var i=0;i<monArr.length;i++)
        {
            if(month == monArr[i])
                flag=0;
        }
        if(flag==-1)
            alert("Select The Month From The List.");

        else
        {
            if(isNaN(year))
            {
                alert("Enter Number In The Year Field.");
                document.querySelector(".year").value=" ";
            }
            else if(l<4)
            {
                alert("Enter 4-Digit Number In The Year Field.");
                document.querySelector(".year").value=" ";
            }
        
        
            if(displayedMonCon.style.display === "block")
                displayedMonCon.style.display="none";
        
            timeJsonObj = {month:month , year:year};
            localStorage.Time = JSON.stringify(timeJsonObj);
        
            let days;
            if(month === monArr[0] || month === monArr[2] || month === monArr[4] || month === monArr[6] || month === monArr[7] || month === monArr[9] || month === monArr[11])
                days=31;
            else if(month === monArr[1])
            {
                if(year%4 == 0)
                {
                    if(year%100 == 0)
                    {
                        if(year%400 == 0)
                            days=29;
                        else
                            days=28;
                    }   
                    else
                        days=29;
                }
                else
                    days=28;
            }    
            else if(month === monArr[3] || month === monArr[5] || month === monArr[8] || month === monArr[10])
                days=30;
            setweekDays(days);
            // setting local storage for week days
            localweek(days);
        
            displayTable();
        } 
    }
})

// THE TABLE FUNCTION WHEN MONTH AND YEAR ARE DEFINED
function displayTable()
{
    document.querySelector(".input-table-con").style.display = "block";
    document.querySelector(".year").style.display = "none";
    document.querySelector(".month").style.display = "none";
    document.querySelector(".confirm").style.display = "none";
    document.querySelector(".month-display").style.display = "inline";
    document.querySelector(".year-display").style.display = "inline";
    
    //parsing for getting javascript for month and year
    timeJsonObj = JSON.parse(localStorage.Time);
    month = timeJsonObj.month;
    year = timeJsonObj.year;

    document.querySelector(".month-display").innerHTML = month;
    document.querySelector(".year-display").innerHTML = year;

    if(month === monArr[0] || month === monArr[2] || month === monArr[4] || month === monArr[6] || month === monArr[7] || month === monArr[9] || month === monArr[11])
        document.querySelector(".day31-head").style.display = "inline-table";
    else if(month === monArr[1])
    {
        if(year%4 == 0)
        {
            if(year%100 == 0)
            {
                if(year%400 == 0)
                    document.querySelector(".day29-head").style.display = "inline-table";
                else
                    document.querySelector(".day28-head").style.display = "inline-table";
            }   
            else
                document.querySelector(".day29-head").style.display = "inline-table";
         }
        else
            document.querySelector(".day28-head").style.display = "inline-table";
    }    
    else if(month === monArr[3] || month === monArr[5] || month === monArr[8] || month === monArr[10])
        document.querySelector(".day30-head").style.display = "inline-table";
    else
        clearStorage();

    var a = document.getElementsByTagName("TABLE");
    
    for(let i=0;i<a.length;i++)
    {
        if(a[i].style.display === "inline-table")
            b=a[i].className;
    }

    //parsing for getting javascript for getting weeks array
    weekJsonObj = JSON.parse(localStorage.Week);
    var table = document.querySelector("."+b);
    var st = b.indexOf('y');
    var end = b.indexOf('-');
    tot_col = b.substring(st+1,end);
    tot_col=parseInt(tot_col);
    // creating weekday table 
    if(tot_col == 31)
        var row = '<tr class="weekday-row"><td colspan="2">DAYS OF THE WEEK</td><td>'+weekJsonObj[1]+'</td><td>'+weekJsonObj[2]+'</td><td>'+weekJsonObj[3]+'</td><td>'+weekJsonObj[4]+'</td><td>'+weekJsonObj[5]+'</td><td>'+weekJsonObj[6]+'</td><td>'+weekJsonObj[7]+'</td><td>'+weekJsonObj[8]+'</td><td>'+weekJsonObj[9]+'</td><td>'+weekJsonObj[10]+'</td><td>'+weekJsonObj[11]+'</td><td>'+weekJsonObj[12]+'</td><td>'+weekJsonObj[13]+'</td><td>'+weekJsonObj[14]+'</td><td>'+weekJsonObj[15]+'</td><td>'+weekJsonObj[16]+'</td><td>'+weekJsonObj[17]+'</td><td>'+weekJsonObj[18]+'</td><td>'+weekJsonObj[19]+'</td><td>'+weekJsonObj[20]+'</td><td>'+weekJsonObj[21]+'</td><td>'+weekJsonObj[22]+'</td><td>'+weekJsonObj[23]+'</td><td>'+weekJsonObj[24]+'</td><td>'+weekJsonObj[25]+'</td><td>'+weekJsonObj[26]+'</td><td>'+weekJsonObj[27]+'</td><td>'+weekJsonObj[28]+'</td><td>'+weekJsonObj[29]+'</td><td>'+weekJsonObj[30]+'</td><td>'+weekJsonObj[31]+'</td></tr>';                    
    else if(tot_col == 30)
        var row = '<tr class="weekday-row"><td colspan="2">DAYS OF THE WEEK</td><td>'+weekJsonObj[1]+'</td><td>'+weekJsonObj[2]+'</td><td>'+weekJsonObj[3]+'</td><td>'+weekJsonObj[4]+'</td><td>'+weekJsonObj[5]+'</td><td>'+weekJsonObj[6]+'</td><td>'+weekJsonObj[7]+'</td><td>'+weekJsonObj[8]+'</td><td>'+weekJsonObj[9]+'</td><td>'+weekJsonObj[10]+'</td><td>'+weekJsonObj[11]+'</td><td>'+weekJsonObj[12]+'</td><td>'+weekJsonObj[13]+'</td><td>'+weekJsonObj[14]+'</td><td>'+weekJsonObj[15]+'</td><td>'+weekJsonObj[16]+'</td><td>'+weekJsonObj[17]+'</td><td>'+weekJsonObj[18]+'</td><td>'+weekJsonObj[19]+'</td><td>'+weekJsonObj[20]+'</td><td>'+weekJsonObj[21]+'</td><td>'+weekJsonObj[22]+'</td><td>'+weekJsonObj[23]+'</td><td>'+weekJsonObj[24]+'</td><td>'+weekJsonObj[25]+'</td><td>'+weekJsonObj[26]+'</td><td>'+weekJsonObj[27]+'</td><td>'+weekJsonObj[28]+'</td><td>'+weekJsonObj[29]+'</td><td>'+weekJsonObj[30]+'</td></tr>';                    
    else if(tot_col == 29) 
         var row = '<tr class="weekday-row"><td colspan="2">DAYS OF THE WEEK</td><td>'+weekJsonObj[1]+'</td><td>'+weekJsonObj[2]+'</td><td>'+weekJsonObj[3]+'</td><td>'+weekJsonObj[4]+'</td><td>'+weekJsonObj[5]+'</td><td>'+weekJsonObj[6]+'</td><td>'+weekJsonObj[7]+'</td><td>'+weekJsonObj[8]+'</td><td>'+weekJsonObj[9]+'</td><td>'+weekJsonObj[10]+'</td><td>'+weekJsonObj[11]+'</td><td>'+weekJsonObj[12]+'</td><td>'+weekJsonObj[13]+'</td><td>'+weekJsonObj[14]+'</td><td>'+weekJsonObj[15]+'</td><td>'+weekJsonObj[16]+'</td><td>'+weekJsonObj[17]+'</td><td>'+weekJsonObj[18]+'</td><td>'+weekJsonObj[19]+'</td><td>'+weekJsonObj[20]+'</td><td>'+weekJsonObj[21]+'</td><td>'+weekJsonObj[22]+'</td><td>'+weekJsonObj[23]+'</td><td>'+weekJsonObj[24]+'</td><td>'+weekJsonObj[25]+'</td><td>'+weekJsonObj[26]+'</td><td>'+weekJsonObj[27]+'</td><td>'+weekJsonObj[28]+'</td><td>'+weekJsonObj[29]+'</td></tr>';                    
    else if(tot_col == 28)
        var row = '<tr class="weekday-row"><td colspan="2">DAYS OF THE WEEK</td><td>'+weekJsonObj[1]+'</td><td>'+weekJsonObj[2]+'</td><td>'+weekJsonObj[3]+'</td><td>'+weekJsonObj[4]+'</td><td>'+weekJsonObj[5]+'</td><td>'+weekJsonObj[6]+'</td><td>'+weekJsonObj[7]+'</td><td>'+weekJsonObj[8]+'</td><td>'+weekJsonObj[9]+'</td><td>'+weekJsonObj[10]+'</td><td>'+weekJsonObj[11]+'</td><td>'+weekJsonObj[12]+'</td><td>'+weekJsonObj[13]+'</td><td>'+weekJsonObj[14]+'</td><td>'+weekJsonObj[15]+'</td><td>'+weekJsonObj[16]+'</td><td>'+weekJsonObj[17]+'</td><td>'+weekJsonObj[18]+'</td><td>'+weekJsonObj[19]+'</td><td>'+weekJsonObj[20]+'</td><td>'+weekJsonObj[21]+'</td><td>'+weekJsonObj[22]+'</td><td>'+weekJsonObj[23]+'</td><td>'+weekJsonObj[24]+'</td><td>'+weekJsonObj[25]+'</td><td>'+weekJsonObj[26]+'</td><td>'+weekJsonObj[27]+'</td><td>'+weekJsonObj[28]+'</td></tr>';                    
  
    table.insertAdjacentHTML("beforeend",row);
    displayInputTable(tot_col);
    displayDutyList();
}

// EVENT LISTENER FOR CLEARING THE LOCAL STORAGE
document.querySelector(".clear").addEventListener("click" ,clearStorage);

function clearStorage()
{
    document.querySelector(".weekday-row").remove();
    document.querySelector(".head-input-col").remove();
    document.querySelector(".duty-row").remove();
    localStorage.clear();
    document.querySelector(".month-display").style.display = "none";
    document.querySelector(".year-display").style.display = "none";
    document.querySelector(".input-table-con").style.display = "none";
    document.querySelector(".year").style.display = "inline";
    document.querySelector(".month").style.display = "inline";
    document.querySelector(".confirm").style.display = "inline";
    document.querySelector(".day31-head").style.display = "none";
    document.querySelector(".day30-head").style.display = "none";
    document.querySelector(".day29-head").style.display = "none";
    document.querySelector(".day28-head").style.display = "none";
    location.reload();
}

// FUNCTION FOR CREATING WEEKDAY ARRAY  
function setweekDays(days){
    var selectedMon;
    for (let i=0;i<12;i++)
    {
        if(monArr[i]==month)
        selectedMon=i;
    }
    
    if(days==31)
    {
        for(let i=1; i<=31;i++)
        {
            var d = new Date(year,selectedMon,i);
            //week.push(weekDays[d.getDay()]);
            week[i]=weekDays[d.getDay()];
        }
    }
    
    else if(days==30)
    {
        for(let i=1; i<=30;i++)
        {
            var d = new Date(year,selectedMon,i);
            week.push(weekDays[d.getDay()]);
        }
    }
    else if(days==29)
    {
        for(let i=1; i<=29;i++)
        {
            var d = new Date(year,selectedMon,i);
            week.push(weekDays[d.getDay()]);
        }
    }
    else if(days==28)
    {
        for(let i=1; i<=28;i++)
        {
            var d = new Date(year,selectedMon,i);
            week.push(weekDays[d.getDay()]);
        }
    }
}

function localweek(days)
{
    if(days==31)
        weekJsonObj = {1:week[1] , 2:week[2] , 3:week[3] , 4:week[4] , 5:week[5] , 6:week[6] , 7:week[7] , 8:week[8] , 9:week[9] , 10:week[10] , 11:week[11] , 12:week[12] , 13:week[13] , 14:week[14] , 15:week[15] , 15:week[15] , 16:week[16] , 17:week[17] , 18:week[18] , 19:week[19] , 20:week[20] , 21:week[21] , 22:week[22] , 23:week[23] , 24:week[24] , 25:week[25] , 26:week[26] , 27:week[27] , 28:week[28] , 29:week[29] , 30:week[30] , 31:week[31]};
    else if(days==30)
        weekJsonObj = {1:week[1] , 2:week[2] , 3:week[3] , 4:week[4] , 5:week[5] , 6:week[6] , 7:week[7] , 8:week[8] , 9:week[9] , 10:week[10] , 11:week[11] , 12:week[12] , 13:week[13] , 14:week[14] , 15:week[15] , 15:week[15] , 16:week[16] , 17:week[17] , 18:week[18] , 19:week[19] , 20:week[20] , 21:week[21] , 22:week[22] , 23:week[23] , 24:week[24] , 25:week[25] , 26:week[26] , 27:week[27] , 28:week[28] , 29:week[29] , 30:week[30]};
    else if(days==29)
        weekJsonObj = {1:week[1] , 2:week[2] , 3:week[3] , 4:week[4] , 5:week[5] , 6:week[6] , 7:week[7] , 8:week[8] , 9:week[9] , 10:week[10] , 11:week[11] , 12:week[12] , 13:week[13] , 14:week[14] , 15:week[15] , 15:week[15] , 16:week[16] , 17:week[17] , 18:week[18] , 19:week[19] , 20:week[20] , 21:week[21] , 22:week[22] , 23:week[23] , 24:week[24] , 25:week[25] , 26:week[26] , 27:week[27] , 28:week[28] , 29:week[29]};
    else if(days==28)
        weekJsonObj = {1:week[1] , 2:week[2] , 3:week[3] , 4:week[4] , 5:week[5] , 6:week[6] , 7:week[7] , 8:week[8] , 9:week[9] , 10:week[10] , 11:week[11] , 12:week[12] , 13:week[13] , 14:week[14] , 15:week[15] , 15:week[15] , 16:week[16] , 17:week[17] , 18:week[18] , 19:week[19] , 20:week[20] , 21:week[21] , 22:week[22] , 23:week[23] , 24:week[24] , 25:week[25] , 26:week[26] , 27:week[27] , 28:week[28] };                                                                                                                           
    localStorage.Week = JSON.stringify(weekJsonObj);
}

// TO DISPLAY THE INPUT TABLE
function displayInputTable(days)
{
    //class="duty-row";
    //class="name-input";
    var temp = document.querySelector(".input-table");
    var duty_row;
    if(days == 31)
        duty_row = '<tr class="head-input-col"><th class="s-no">SNo</th><th class="name">Name</th><th>01</th><th>02</th><th>03</th><th>04</th><th>05</th><th>06</th><th>07</th><th>08</th><th>09</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th><th>31</th></tr><tr class="duty-row"><td></td><td><input class="name-input" type="text"></input></td><td><select class="duty1 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty2 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty3 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option><select></td><td><select class="duty4 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td> <td><select class="duty5 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty6 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty7 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty8 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty9 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty10 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty11 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty12 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty13 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty14 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty15 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty16 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty17 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty18 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty19 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty20 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty21 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty22 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty23 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty24 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty25 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty26 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty27 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty28 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty29 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty30 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty31 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td></tr>' ;
	
	else if(days == 30)
		duty_row = '<tr class="head-input-col"><th class="s-no">SNo</th><th class="name">Name</th><th>01</th><th>02</th><th>03</th><th>04</th><th>05</th><th>06</th><th>07</th><th>08</th><th>09</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th></tr><tr class="duty-row"><td></td><td><input class="name-input" type="text"></input></td><td><select class="duty1 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty2 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty3 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option><select></td><td><select class="duty4 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td> <td><select class="duty5 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty6 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty7 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty8 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty9 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty10 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty11 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty12 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty13 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty14 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty15 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty16 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty17 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty18 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty19 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty20 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty21 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty22 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty23 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty24 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty25 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty26 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty27 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty28 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty29 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty30 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td></tr>' ;
	
	else if(days == 29)
		duty_row = '<tr class="head-input-col"><th class="s-no">SNo</th><th class="name">Name</th><th>01</th><th>02</th><th>03</th><th>04</th><th>05</th><th>06</th><th>07</th><th>08</th><th>09</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th></tr><tr class="duty-row"><td></td><td><input class="name-input" type="text"></input></td><td><select class="duty1 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty2 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty3 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option><select></td><td><select class="duty4 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td> <td><select class="duty5 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty6 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty7 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty8 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty9 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty10 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty11 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty12 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty13 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty14 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty15 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty16 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty17 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty18 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty19 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty20 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty21 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty22 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty23 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty24 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty25 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty26 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty27 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty28 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty29 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td></tr>' ;
	
	else if(days == 28)
        duty_row = '<tr class="head-input-col"><th class="s-no">SNo</th><th class="name">Name</th><th>01</th><th>02</th><th>03</th><th>04</th><th>05</th><th>06</th><th>07</th><th>08</th><th>09</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th></tr><tr class="duty-row"><td></td><td><input class="name-input" type="text"></input></td><td><select class="duty1 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty2 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty3 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option><select></td><td><select class="duty4 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td> <td><select class="duty5 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty6 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty7 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty8 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty9 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty10 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty11 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty12 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty13 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty14 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty15 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty16 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty17 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty18 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty19 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty20 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty21 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty22 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty23 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty24 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty25 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty26 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty27 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td><td><select class="duty28 duty-input"><option> </option><option>M</option><option>E</option><option>N</option><option>G</option><option>O</option><option>CL</option><option>EL</option><option>ML</option><option>RH</option></select></td></tr>' ;
    
    temp.insertAdjacentHTML("beforeend",duty_row);

    var tot_col_input = document.querySelectorAll(".head-input-col");
    if(tot_col_input.length != 1)
    {
        for(let i=0;i<tot_col_input;i++)
            tot_col_input[i].remove();
        location.reload();
    }
}

// EVENT LISTENER FOR ADDING THE DUTY ROW TO THE PARENT TABLE

document.querySelector(".add").addEventListener("click" , function(){
    var name_input = document.querySelector(".name-input").value;
    var duty = document.querySelectorAll(".duty-input");
    var duty_row;
    var temp = document.querySelector("."+b);
    var duty_dis ;
    var duty_string=" ";

    if(name_input)
    {
        if(tot_col == 31)
            duty_row = '<tr class="duty-row-current"><td class="s-no">'+(l+1)+'.</td><td class="name">'+name_input+'</td><td class="duty">'+duty[0].value+'</td><td class="duty">'+duty[1].value+'</td><td class="duty">'+duty[2].value+'</td><td class="duty">'+duty[3].value+'</td><td class="duty">'+duty[4].value+'</td><td class="duty">'+duty[5].value+'</td><td class="duty">'+duty[6].value+'</td><td class="duty">'+duty[7].value+'</td><td class="duty">'+duty[8].value+'</td><td class="duty">'+duty[9].value+'</td><td class="duty">'+duty[10].value+'</td><td class="duty">'+duty[11].value+'</td><td class="duty">'+duty[12].value+'</td><td class="duty">'+duty[13].value+'</td><td class="duty">'+duty[14].value+'</td><td class="duty">'+duty[15].value+'</td><td class="duty">'+duty[16].value+'</td><td class="duty">'+duty[17].value+'</td><td class="duty">'+duty[18].value+'</td><td class="duty">'+duty[19].value+'</td><td class="duty">'+duty[20].value+'</td><td class="duty">'+duty[21].value+'</td><td class="duty">'+duty[22].value+'</td><td class="duty">'+duty[23].value+'</td><td class="duty">'+duty[24].value+'</td><td class="duty">'+duty[25].value+'</td><td class="duty">'+duty[26].value+'</td><td class="duty">'+duty[27].value+'</td><td class="duty">'+duty[28].value+'</td><td class="duty">'+duty[29].value+'</td><td class="duty">'+duty[30].value+'</td></tr>';
		
		else if(tot_col ==  30)
			duty_row = '<tr class="duty-row-current"><td class="s-no">'+(l+1)+'.</td><td class="name">'+name_input+'</td><td class="duty">'+duty[0].value+'</td><td class="duty">'+duty[1].value+'</td><td class="duty">'+duty[2].value+'</td><td class="duty">'+duty[3].value+'</td><td class="duty">'+duty[4].value+'</td><td class="duty">'+duty[5].value+'</td><td class="duty">'+duty[6].value+'</td><td class="duty">'+duty[7].value+'</td><td class="duty">'+duty[8].value+'</td><td class="duty">'+duty[9].value+'</td><td class="duty">'+duty[10].value+'</td><td class="duty">'+duty[11].value+'</td><td class="duty">'+duty[12].value+'</td><td class="duty">'+duty[13].value+'</td><td class="duty">'+duty[14].value+'</td><td class="duty">'+duty[15].value+'</td><td class="duty">'+duty[16].value+'</td><td class="duty">'+duty[17].value+'</td><td class="duty">'+duty[18].value+'</td><td class="duty">'+duty[19].value+'</td><td class="duty">'+duty[20].value+'</td><td class="duty">'+duty[21].value+'</td><td class="duty">'+duty[22].value+'</td><td class="duty">'+duty[23].value+'</td><td class="duty">'+duty[24].value+'</td><td class="duty">'+duty[25].value+'</td><td class="duty">'+duty[26].value+'</td><td class="duty">'+duty[27].value+'</td><td class="duty">'+duty[28].value+'</td><td class="duty">'+duty[29].value+'</td></tr>';
		
		else if(tot_col == 29)
			duty_row = '<tr class="duty-row-current"><td class="s-no">'+(l+1)+'.</td><td class="name">'+name_input+'</td><td class="duty">'+duty[0].value+'</td><td class="duty">'+duty[1].value+'</td><td class="duty">'+duty[2].value+'</td><td class="duty">'+duty[3].value+'</td><td class="duty">'+duty[4].value+'</td><td class="duty">'+duty[5].value+'</td><td class="duty">'+duty[6].value+'</td><td class="duty">'+duty[7].value+'</td><td class="duty">'+duty[8].value+'</td><td class="duty">'+duty[9].value+'</td><td class="duty">'+duty[10].value+'</td><td class="duty">'+duty[11].value+'</td><td class="duty">'+duty[12].value+'</td><td class="duty">'+duty[13].value+'</td><td class="duty">'+duty[14].value+'</td><td class="duty">'+duty[15].value+'</td><td class="duty">'+duty[16].value+'</td><td class="duty">'+duty[17].value+'</td><td class="duty">'+duty[18].value+'</td><td class="duty">'+duty[19].value+'</td><td class="duty">'+duty[20].value+'</td><td class="duty">'+duty[21].value+'</td><td class="duty">'+duty[22].value+'</td><td class="duty">'+duty[23].value+'</td><td class="duty">'+duty[24].value+'</td><td class="duty">'+duty[25].value+'</td><td class="duty">'+duty[26].value+'</td><td class="duty">'+duty[27].value+'</td><td class="duty">'+duty[28].value+'</td></tr>';
		
		else if(tot_col == 28)
			duty_row = '<tr class="duty-row-current"><td class="s-no">'+(l+1)+'.</td><td class="name">'+name_input+'</td><td class="duty">'+duty[0].value+'</td><td class="duty">'+duty[1].value+'</td><td class="duty">'+duty[2].value+'</td><td class="duty">'+duty[3].value+'</td><td class="duty">'+duty[4].value+'</td><td class="duty">'+duty[5].value+'</td><td class="duty">'+duty[6].value+'</td><td class="duty">'+duty[7].value+'</td><td class="duty">'+duty[8].value+'</td><td class="duty">'+duty[9].value+'</td><td class="duty">'+duty[10].value+'</td><td class="duty">'+duty[11].value+'</td><td class="duty">'+duty[12].value+'</td><td class="duty">'+duty[13].value+'</td><td class="duty">'+duty[14].value+'</td><td class="duty">'+duty[15].value+'</td><td class="duty">'+duty[16].value+'</td><td class="duty">'+duty[17].value+'</td><td class="duty">'+duty[18].value+'</td><td class="duty">'+duty[19].value+'</td><td class="duty">'+duty[20].value+'</td><td class="duty">'+duty[21].value+'</td><td class="duty">'+duty[22].value+'</td><td class="duty">'+duty[23].value+'</td><td class="duty">'+duty[24].value+'</td><td class="duty">'+duty[25].value+'</td><td class="duty">'+duty[26].value+'</td><td class="duty">'+duty[27].value+'</td></tr>';
		
        l++;
        temp.insertAdjacentHTML("beforeend",duty_row);

        for(let i=0;i<duty.length;i++)
        {
            if(!duty[i].value)
                duty_string += 'X';
            else if(duty[i].value == 'CL')
                duty_string += 'C';
            else if(duty[i].value == 'EL')
                duty_string += 'F';
            else if(duty[i].value == 'ML')
                duty_string += 'L';
            else if(duty[i].value == 'RH')
                duty_string += 'R';
            else 
                duty_string += duty[i].value; 
        }

        var dutyObj = {Name : name_input, Duty : duty_string};
        dutyArray.push(dutyObj);
        localStorage.DutyList = JSON.stringify(dutyArray);  
        document.querySelector(".duty-row-current").classList.add("duty-row");
        document.querySelector(".duty-row-current").classList.remove("duty-row-current");

        displayInputTable(tot_col);
    }
    else
        alert("Enter name in the input field");
})


function displayDutyList()
{
    if(localStorage.DutyList)
    {
        var duty_row;
        var temp = document.querySelector("."+b);
        dutyArray = JSON.parse(localStorage.DutyList);
        for (let i=0;i<dutyArray.length;i++)
        {
            var uc = [];
            for(let j=1;j<dutyArray[i].Duty.length;j++)
            {
                if(dutyArray[i].Duty[j] == 'X')
                    uc.push(' ');
                else if(dutyArray[i].Duty[j] == 'C')
                    uc.push('CL');
                else if(dutyArray[i].Duty[j] == 'F')
                    uc.push('EL');
                else if(dutyArray[i].Duty[j] == 'L')
                    uc.push('ML');
                else if(dutyArray[i].Duty[j] == 'R')
                    uc.push('RH');
                else 
                    uc.push(dutyArray[i].Duty[j]);
            }
            if(uc.length == 31)
                duty_row = '<tr class="duty-row duty-row-displayed"><td class="s-no">'+(i+1)+'.</td><td class="name">'+dutyArray[i].Name+'</td><td class="duty">'+uc[0]+'</td><td class="duty">'+uc[1]+'</td><td class="duty">'+uc[2]+'</td><td class="duty">'+uc[3]+'</td><td class="duty">'+uc[4]+'</td><td class="duty">'+uc[5]+'</td><td class="duty">'+uc[6]+'</td><td class="duty">'+uc[7]+'</td><td class="duty">'+uc[8]+'</td><td class="duty">'+uc[9]+'</td><td class="duty">'+uc[10]+'</td><td class="duty">'+uc[11]+'</td><td class="duty">'+uc[12]+'</td><td class="duty">'+uc[13]+'</td><td class="duty">'+uc[14]+'</td><td class="duty">'+uc[15]+'</td><td class="duty">'+uc[16]+'</td><td class="duty">'+uc[17]+'</td><td class="duty">'+uc[18]+'</td><td class="duty">'+uc[19]+'</td><td class="duty">'+uc[20]+'</td><td class="duty">'+uc[21]+'</td><td class="duty">'+uc[22]+'</td><td class="duty">'+uc[23]+'</td><td class="duty">'+uc[24]+'</td><td class="duty">'+uc[25]+'</td><td class="duty">'+uc[26]+'</td><td class="duty">'+uc[27]+'</td><td class="duty">'+uc[28]+'</td><td class="duty">'+uc[29]+'</td><td class="duty">'+uc[30]+'</td></tr>';
			
			else if(uc.length == 30)
				duty_row = '<tr class="duty-row duty-row-displayed"><td class="s-no">'+(i+1)+'.</td><td class="name">'+dutyArray[i].Name+'</td><td class="duty">'+uc[0]+'</td><td class="duty">'+uc[1]+'</td><td class="duty">'+uc[2]+'</td><td class="duty">'+uc[3]+'</td><td class="duty">'+uc[4]+'</td><td class="duty">'+uc[5]+'</td><td class="duty">'+uc[6]+'</td><td class="duty">'+uc[7]+'</td><td class="duty">'+uc[8]+'</td><td class="duty">'+uc[9]+'</td><td class="duty">'+uc[10]+'</td><td class="duty">'+uc[11]+'</td><td class="duty">'+uc[12]+'</td><td class="duty">'+uc[13]+'</td><td class="duty">'+uc[14]+'</td><td class="duty">'+uc[15]+'</td><td class="duty">'+uc[16]+'</td><td class="duty">'+uc[17]+'</td><td class="duty">'+uc[18]+'</td><td class="duty">'+uc[19]+'</td><td class="duty">'+uc[20]+'</td><td class="duty">'+uc[21]+'</td><td class="duty">'+uc[22]+'</td><td class="duty">'+uc[23]+'</td><td class="duty">'+uc[24]+'</td><td class="duty">'+uc[25]+'</td><td class="duty">'+uc[26]+'</td><td class="duty">'+uc[27]+'</td><td class="duty">'+uc[28]+'</td><td class="duty">'+uc[29]+'</td></tr>';
			
			else if(uc.length == 29)
				duty_row = '<tr class="duty-row duty-row-displayed"><td class="s-no">'+(i+1)+'.</td><td class="name">'+dutyArray[i].Name+'</td><td class="duty">'+uc[0]+'</td><td class="duty">'+uc[1]+'</td><td class="duty">'+uc[2]+'</td><td class="duty">'+uc[3]+'</td><td class="duty">'+uc[4]+'</td><td class="duty">'+uc[5]+'</td><td class="duty">'+uc[6]+'</td><td class="duty">'+uc[7]+'</td><td class="duty">'+uc[8]+'</td><td class="duty">'+uc[9]+'</td><td class="duty">'+uc[10]+'</td><td class="duty">'+uc[11]+'</td><td class="duty">'+uc[12]+'</td><td class="duty">'+uc[13]+'</td><td class="duty">'+uc[14]+'</td><td class="duty">'+uc[15]+'</td><td class="duty">'+uc[16]+'</td><td class="duty">'+uc[17]+'</td><td class="duty">'+uc[18]+'</td><td class="duty">'+uc[19]+'</td><td class="duty">'+uc[20]+'</td><td class="duty">'+uc[21]+'</td><td class="duty">'+uc[22]+'</td><td class="duty">'+uc[23]+'</td><td class="duty">'+uc[24]+'</td><td class="duty">'+uc[25]+'</td><td class="duty">'+uc[26]+'</td><td class="duty">'+uc[27]+'</td><td class="duty">'+uc[28]+'</td></tr>';
			
			else if(uc.length == 28)
				duty_row = '<tr class="duty-row duty-row-displayed"><td class="s-no">'+(i+1)+'.</td><td class="name">'+dutyArray[i].Name+'</td><td class="duty">'+uc[0]+'</td><td class="duty">'+uc[1]+'</td><td class="duty">'+uc[2]+'</td><td class="duty">'+uc[3]+'</td><td class="duty">'+uc[4]+'</td><td class="duty">'+uc[5]+'</td><td class="duty">'+uc[6]+'</td><td class="duty">'+uc[7]+'</td><td class="duty">'+uc[8]+'</td><td class="duty">'+uc[9]+'</td><td class="duty">'+uc[10]+'</td><td class="duty">'+uc[11]+'</td><td class="duty">'+uc[12]+'</td><td class="duty">'+uc[13]+'</td><td class="duty">'+uc[14]+'</td><td class="duty">'+uc[15]+'</td><td class="duty">'+uc[16]+'</td><td class="duty">'+uc[17]+'</td><td class="duty">'+uc[18]+'</td><td class="duty">'+uc[19]+'</td><td class="duty">'+uc[20]+'</td><td class="duty">'+uc[21]+'</td><td class="duty">'+uc[22]+'</td><td class="duty">'+uc[23]+'</td><td class="duty">'+uc[24]+'</td><td class="duty">'+uc[25]+'</td><td class="duty">'+uc[26]+'</td><td class="duty">'+uc[27]+'</td></tr>';
            
            temp.insertAdjacentHTML("beforeend",duty_row);
        }
    }
}

document.querySelectorAll(".duty-row-displayed").forEach((element , index) => {
    element.addEventListener("click" , function(){
        var n = this.cells[1].innerHTML;
        document.querySelector(".update").style.display = "inline-block";
        document.querySelector(".delete").style.display = "inline-block";
        document.querySelector(".add").style.display = "none";
        var num;
        dutyArray = JSON.parse(localStorage.DutyList);
        var uc = [];
        for(let j=1;j<dutyArray[index].Duty.length;j++)
        {
            if(dutyArray[index].Duty[j] == 'X')
                uc.push(' ');
            else if(dutyArray[index].Duty[j] == 'C')
                uc.push('CL');
            else if(dutyArray[index].Duty[j] == 'F')
                uc.push('EL');
            else if(dutyArray[index].Duty[j] == 'L')
                uc.push('ML');
            else if(dutyArray[index].Duty[j] == 'R')
                uc.push('RH');
            else 
                uc.push(dutyArray[index].Duty[j]);
        }
        
        document.querySelector(".name-input").value = n;
        
        document.querySelectorAll(".duty-input").forEach((d,i) => {
            if(uc[i] == " ")
                num=0;
            else if(uc[i] == 'M')
                num=1;
            else if(uc[i] == 'E')
                num=2;
            else if(uc[i] == 'N')
                num=3;
            else if(uc[i] == 'G')
                num=4;
            else if(uc[i] == 'O')
                num=5;
            else if(uc[i] == 'CL')
                num=6;
            else if(uc[i] == 'EL')
                num=7;
            else if(uc[i] == 'ML')
                num=8;
            else if(uc[i] == 'RH')
                num=9;
            d[num].selected = "true";
        })
        document.querySelector(".update").addEventListener("click" , function(){
            dutyArray[index].Name = document.querySelector(".name-input").value;
            var duty_string=" ";
            var duty = document.querySelectorAll(".duty-input");
            console.log(duty[0].value);
            for(let i=0;i<duty.length;i++)
            {
                if(!duty[i].value)
                    duty_string += 'X';
                else if(duty[i].value == 'CL')
                    duty_string += 'C';
                else if(duty[i].value == 'EL')
                    duty_string += 'F';
                else if(duty[i].value == 'ML')
                    duty_string += 'L';
                else if(duty[i].value == 'RH')
                    duty_string += 'R';
                else 
                    duty_string += duty[i].value; 
            }
            dutyArray[index].Duty = duty_string;
            localStorage.DutyList = JSON.stringify(dutyArray);
            location.reload();
        })
        //document.querySelector(".weekday-row").remove();
        document.querySelector(".delete").addEventListener("click" , function(){
            dutyArray.splice(index,1);
            localStorage.DutyList = JSON.stringify(dutyArray);
            location.reload();
        })
    })
}) 

// on brfore printing 
function fun()
{
    document.querySelector(".input-table-con").style.display = "none";
    document.querySelector(".head-table-con").style.height = "95%";
    document.querySelector(".head-table-con").style.overflowY = "none";
    //document.querySelector(".incharge-sign").style.display = "block";
}
function fun2()
{
    document.querySelector(".input-table-con").style.display = "block";
    document.querySelector(".head-table-con").style.height = "65vh";
    document.querySelector(".head-table-con").style.overflowY = "auto";
    //document.querySelector(".incharge-sign").style.display = "none";
}
/* code for the corresponding duty
   '' -> X   
    M -> M
    E -> E
    N -> N
    G -> G
    O -> O
   CL -> C
   EL -> F
   ML -> L
   RH -> R
*/













