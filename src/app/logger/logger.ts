/*
    The class is added to show the example of FP functions used to make the average salary funciton generic.
    The conditions passed in the averageSalary function is an array of predicate functions, the conditions are to be
    check against every employee of the company. A function 'and' is defined to check for each condition. The averageSalary function
    is not a PURE and composite function which calls other basic functions to get the functionality done. In FP it is important to note
    that we do not make the abstractions too generic otherwise it would be lots of functions and code would be difficult to understand.

*/

type Predicate = (e: Employee) => boolean;

// Generic Functions are extracted
function and(predicates: Predicate[]): Predicate {
    return (e) => predicates.every(p => p(e));
}

function average(nums: number[]): number {
    const total = nums.reduce((a, b) => a + b, 0);
    return (nums.length === 0) ? 0 : total / nums.length;
}

export class Employee {
    constructor(public name: string, public salary: number) { }

}

export class Department {
    constructor(public employees: Employee[]) { }

    works(employee: Employee): boolean {
        return this.employees.indexOf(employee) > -1;
    }
}

function employeeSalaries(employees: Employee[], conditions: Predicate[]): number[] {
    const filtered = employees.filter(and(conditions));
    return filtered.map(e => e.salary);
}

/*
    The function is used to calculate the average salary of the employees who meet the predicate conditions provided.
    @params:    1. Array with the number of employees,
                2. array of conditions that an employee needs to fulfill to be added into the average calculation
    @returns:   The average salary of the employees in the company
*/
export function averageSalary(employees: Employee[], conditions: Predicate[]): number {

    return average(employeeSalaries(employees, conditions));

}
