/* My Functions: */
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(data){
    return data.map((array) => {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

function hoursWorkedOnDate(date){
    let start = this.timeInEvents.find(foo => {
        return foo.date === date;
    });
    let end = this.timeOutEvents.find(foo => {
        return foo.date === date;
    });
    return (end.hour - start.hour) / 100;
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(firstName => firstName);
    
}

function calculatePayroll(arrayOfEmployees){
    return arrayOfEmployees.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}

