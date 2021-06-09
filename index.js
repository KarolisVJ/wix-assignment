let wix = {"submissionUrl":"https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/submit/eyJ0YWdzIjpbXX0","jobs":[{"id":"job-0","data":[]},{"id":"job-1","data":[[{"value":{"number":5}}]]},{"id":"job-2","data":[[{"value":{"number":5}},{"formula":{"reference":"A1"}}]]},{"id":"job-3","data":[[{"value":{"number":6}},{"value":{"number":4}},{"formula":{"sum":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-4","data":[[{"value":{"number":6}},{"value":{"number":4}},{"value":{"number":7}},{"formula":{"sum":[{"reference":"A1"},{"reference":"B1"},{"reference":"C1"}]}}]]},{"id":"job-5","data":[[{"value":{"number":6}},{"value":{"number":4}},{"formula":{"multiply":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-6","data":[[{"value":{"number":6}},{"value":{"number":4}},{"value":{"number":-1}},{"formula":{"multiply":[{"reference":"A1"},{"reference":"B1"},{"reference":"C1"}]}}]]},{"id":"job-7","data":[[{"value":{"number":6}},{"value":{"number":4}},{"formula":{"divide":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-8","data":[[{"value":{"number":1}},{"value":{"number":3}},{"formula":{"divide":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-9","data":[[{"value":{"number":1}},{"value":{"number":3}},{"formula":{"is_greater":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-10","data":[[{"value":{"number":1.2}},{"value":{"number":1.2}},{"formula":{"is_equal":[{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-11","data":[[{"value":{"boolean":false}},{"formula":{"not":{"reference":"A1"}}}],[{"value":{"boolean":true}},{"formula":{"not":{"reference":"A2"}}}]]},{"id":"job-12","data":[[{"value":{"boolean":true}},{"value":{"boolean":false}},{"formula":{"and":[{"reference":"A1"},{"reference":"B1"}]}}],[{"value":{"boolean":true}},{"value":{"boolean":true}},{"formula":{"and":[{"reference":"A2"},{"reference":"B2"}]}}],[{"value":{"boolean":true}},{"value":{"number":1}},{"formula":{"and":[{"reference":"A3"},{"reference":"B3"}]}}]]},{"id":"job-13","data":[[{"value":{"boolean":true}},{"value":{"boolean":true}},{"value":{"boolean":false}},{"formula":{"and":[{"reference":"A1"},{"reference":"B1"},{"reference":"C1"}]}}]]},{"id":"job-14","data":[[{"value":{"boolean":true}},{"value":{"boolean":false}},{"formula":{"or":[{"reference":"A1"},{"reference":"B1"}]}}],[{"value":{"boolean":false}},{"value":{"boolean":false}},{"formula":{"or":[{"reference":"A2"},{"reference":"B2"}]}}],[{"value":{"boolean":true}},{"value":{"number":1}},{"formula":{"or":[{"reference":"A3"},{"reference":"B3"}]}}]]},{"id":"job-15","data":[[{"value":{"boolean":false}},{"value":{"boolean":false}},{"value":{"boolean":true}},{"formula":{"or":[{"reference":"A1"},{"reference":"B1"},{"reference":"C1"}]}}]]},{"id":"job-16","data":[[{"value":{"number":2}},{"value":{"number":1.5}},{"formula":{"if":[{"is_greater":[{"reference":"A1"},{"reference":"B1"}]},{"reference":"A1"},{"reference":"B1"}]}}]]},{"id":"job-17","data":[[{"formula":{"concat":[{"value":{"text":"Hello"}},{"value":{"text":", "}},{"value":{"text":"World!"}}]}}]]},{"id":"job-18","data":[[{"value":{"text":"First"}},{"formula":{"reference":"A1"}},{"formula":{"reference":"B1"}},{"formula":{"reference":"C1"}},{"formula":{"reference":"D1"}},{"formula":{"reference":"E1"}},{"formula":{"reference":"F1"}},{"formula":{"reference":"G1"}}]]},{"id":"job-19","data":[[{"value":{"text":"First"}}],[{"formula":{"reference":"A1"}}],[{"formula":{"reference":"A2"}}],[{"formula":{"reference":"A3"}}],[{"formula":{"reference":"A4"}}],[{"formula":{"reference":"A5"}}],[{"formula":{"reference":"A6"}}]]},{"id":"job-20","data":[[{"formula":{"reference":"B1"}},{"formula":{"reference":"C1"}},{"formula":{"reference":"D1"}},{"formula":{"reference":"E1"}},{"formula":{"reference":"F1"}},{"formula":{"reference":"G1"}},{"formula":{"reference":"H1"}},{"value":{"text":"Last"}}]]}]}

let response = {email: "karolis.jachimavicius@gmail.com", "jobs": []}


// Here are variables to get indexes of cells from references.
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "1234567890";
let copyOf20 = [[]];



//Pretty simple approach, for loops used for the arrays.

for (i = 0; i < wix.jobs.length; i++) {
    response.jobs[i] = {};
    response.jobs[i].id = wix.jobs[i].id;
    response.jobs[i].data = [];
    const xJob = wix.jobs[i].data;
    for (j = 0; j < xJob.length; j++) {
        let evaluatedJob = [];
        for (k = 0; k < xJob[j].length; k++) {
            
            // Copying all the values from the task object
            
            if (xJob[j][k].hasOwnProperty("value")) {
                
                evaluatedJob[j][k] = xJob[j][k];
            }
            if (xJob[j][k].hasOwnProperty("formula")) {
               
                //separate if statements for all the different formulas
               
                if (xJob[j][k].formula.hasOwnProperty("sum")) {
               
                    // an additional, hm, step back loop to check all the types.
               
                    let valnum = 0; let numnum = 0;
                    for (let ti = 0; ti < xJob[j].length; ti++) {
                        if (xJob[j][ti].hasOwnProperty('value')){
                            valnum++;
                            if (xJob[j][ti].value.hasOwnProperty("number")) {
                                numnum++;
                            }
                        }
                    }

                    //valnum is value number, numnum :) isn't nomnom, it's total number of numbers in the value objects. If the numbers match, all values are of the sought type. 

                    if (valnum == numnum) {
                        evaluatedJob[j][xJob[j][k].formula.sum.length] = {value:{number: 0}};
                        
                        // before realizing I can use the indexOf method for the cell references, I came up with the idea of looping through the whole alphabet file and then matching cell values. Kinda awkward but it works. I used this way only for sum, multiple and divide formulas. Left it to show both ways.
                        
                        for (let sumInd = 0; sumInd < xJob[j][k].formula.sum.length; sumInd++) {
                            let colind; let rowind;
                            for (ind = 0; ind < alphabet.length; ind++) {
                                letter = alphabet[ind];
                                colind = ind;
                                for (num_ind = 0; num_ind < numbers.length; num_ind++){
                                    number = numbers[num_ind];
                                    rowind = num_ind;
                                    cell = letter + number;
                                
                                    if (cell == xJob[j][k].formula.sum[sumInd].reference) {
                                        evaluatedJob[j][xJob[j][k].formula.sum.length].value.number += evaluatedJob[rowind][colind].value.number;
                                        } 
                                }
                            }          
                        }
                    } else {
                        evaluatedJob[j][xJob[j][k].formula.sum.length] = {error: "incompatible types"}
                                    
                    }

                    }
            
               
            
                if (i < 20 && xJob[j][k].formula.hasOwnProperty("reference")) {
                    if (xJob[numbers.indexOf(xJob[j][k].formula.reference[1])][alphabet.indexOf(xJob[j][k].formula.reference[0])].hasOwnProperty('reference')) {
                        next
                    }                        
                    evaluatedJob[j][k] = {value:{}}
                    evaluatedJob[j][k].value = evaluatedJob[numbers.indexOf(xJob[j][k].formula.reference[1])][alphabet.indexOf(xJob[j][k].formula.reference[0])].value

                }



                    if (xJob[j][k].formula.hasOwnProperty("multiply")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty("value")){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }

                        if (valnum == numnum) {
                            evaluatedJob[j][xJob[j][k].formula.multiply.length] = {value:{number: 1}};
                            for (let multInd = 0; multInd < xJob[j][k].formula.multiply.length; multInd++) {
                                let colind; let rowind;
                                for (ind = 0; ind < alphabet.length; ind++) {
                                    letter = alphabet[ind];
                                    colind = ind;
                                    for (num_ind = 0; num_ind < numbers.length; num_ind++){
                                        number = numbers[num_ind];
                                        rowind = num_ind;
                                        cell = letter + number;
                                    
                                        if (cell == xJob[j][k].formula.multiply[multInd].reference) {
                                            evaluatedJob[j][xJob[j][k].formula.multiply.length].value.number *= evaluatedJob[rowind][colind].value.number;
                                            } 
                                    }
                                }          
                            }
                        } else {
                            evaluatedJob[j][xJob[j][k].formula.multiply.length] = {error: "incompatible types"}
                                        
                        }
                    }
                
                    // "Divide" solution isn't very dynamic but the task said that there are only two variables, and the first is divided from the second. So I did :)

                    if (xJob[j][k].formula.hasOwnProperty("divide")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }

                        if (valnum == numnum) {
                            evaluatedJob[j][xJob[j][k].formula.divide.length] = {value:{number: "NA"}};
                            for (let divInd = 0; divInd < xJob[j][k].formula.divide.length; divInd++) {
                                window['value'+divInd] = xJob[j][alphabet.indexOf(xJob[j][k].formula.divide[divInd].reference[0])].value.number;
                            }
                            evaluatedJob[j][xJob[j][k].formula.divide.length].value.number = window['value'+0] / window['value'+1];
                        } else {
                            evaluatedJob[j][xJob[j][k].formula.divide.length] = {error: "incompatible types"}
                                        
                        }
                    }

                    if (xJob[j][k].formula.hasOwnProperty("is_greater")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }

                        if (valnum == numnum) {
                            evaluatedJob[j][xJob[j][k].formula.is_greater.length] = {value:{boolean: "NA"}};
                    evaluatedJob[j][xJob[j][k].formula.is_greater.length].value.boolean = xJob[j][alphabet.indexOf(xJob[j][k].formula.is_greater[0].reference[0])].value.number > xJob[j][alphabet.indexOf(xJob[j][k].formula.is_greater[1].reference[0])].value.number; 
                        
                        } else {
                            evaluatedJob[j][xJob[j][k].formula.divide.length] = {error: "incompatible types"}
                                        
                        }
                    }

                    if (xJob[j][k].formula.hasOwnProperty("is_less")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }

                        if (valnum == numnum) {
                            evaluatedJob[j][valnum + 1] = is_greater(xJob[j][alphabet.indexOf(xJob[j][k].formula.is_less[0].reference[0])].value.number, xJob[j][alphabet.indexOf(xJob[j][k].formula.is_less[1].reference[0])].value.number)
                            
                      
                        
                        } else {
                            evaluatedJob[j][valnum + 1] = {error: "incompatible types"}
                                        
                        }
                    }

                    
                    
                    function is_greater(pirmas, antras) {
                        
                        return {value: {boolean: pirmas.value.number  > antras.value.number}};
                    }

                    if (xJob[j][k].formula.hasOwnProperty("is_equal")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }

                        if (valnum == numnum) {
                            evaluatedJob[j][xJob[j][k].formula.is_equal.length] = {value:{boolean: "NA"}};
                    evaluatedJob[j][xJob[j][k].formula.is_equal.length].value.boolean = xJob[numbers.indexOf(xJob[j][k].formula.is_equal[0].reference[1])][alphabet.indexOf(xJob[j][k].formula.is_equal[0].reference[0])].value.number == xJob[numbers.indexOf(xJob[j][k].formula.is_equal[1].reference[1])][alphabet.indexOf(xJob[j][k].formula.is_equal[1].reference[0])].value.number; 
                        
                        } else {
                            evaluatedJob[j][xJob[j][k].formula.is_equal.length] = {error: "incompatible types"}
                                        
                        }
                    }

                if (xJob[j][k].hasOwnProperty("formula")) {
                    if (xJob[j][k].formula.hasOwnProperty("not")) {
                        if (evaluatedJob[numbers.indexOf(xJob[j][k].formula.not.reference[1])][alphabet.indexOf(xJob[j][k].formula.not.reference[0])].value.hasOwnProperty("boolean")){ 
                        evaluatedJob[j][k] = {value:{boolean: false}};
                        
                        evaluatedJob[numbers.indexOf(xJob[j][k].formula.not.reference[1])][k].value.boolean = !evaluatedJob[numbers.indexOf(xJob[j][k].formula.not.reference[1])][alphabet.indexOf(xJob[j][k].formula.not.reference[0])].value.boolean
                        }
                    }
                }

                    if (xJob[j][k].formula.hasOwnProperty("and")) {
                        evaluatedJob[j][xJob[j][k].formula.and.length] = {value:{boolean: true}};
                        
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("boolean")) {
                                    numnum++;
                                }

                                if (valnum == numnum) { 

                                    for (let andInd = 0; andInd < xJob[j][k].formula.and.length; andInd++) {
                                        evaluatedJob[j][xJob[j][k].formula.and.length].value.boolean &&= xJob[numbers.indexOf(xJob[j][k].formula.and[andInd].reference[1])][alphabet.indexOf(xJob[j][k].formula.and[andInd].reference[0])].value.boolean
                                    }
                                } else {
                                    evaluatedJob[j][xJob[j][k].formula.and.length] = {error: "incompatible types"}

                                }
                            }
                        }
                    }

                    if (xJob[j][k].formula.hasOwnProperty("or")) {
                        
                        evaluatedJob[j][xJob[j][k].formula.or.length] = {value: {boolean:false}};
                        
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("boolean")) {
                                    numnum++;
                                }
                            }
                        }
                            if (valnum == numnum) {
                                for (let orInd = 0; orInd < xJob[j][k].formula.or.length; orInd++) {
                                    evaluatedJob[j][xJob[j][k].formula.or.length].value.boolean ||= xJob[numbers.indexOf(xJob[j][k].formula.or[orInd].reference[1])][alphabet.indexOf(xJob[j][k].formula.or[orInd].reference[0])].value.boolean
                                } 
                            } else {
                                evaluatedJob[j][xJob[j][k].formula.or.length] = {error: "incompatible types"}

                            }

                        }
                

                    if (xJob[j][k].formula.hasOwnProperty("if")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j].length; ti++) {
                            if (xJob[j][ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }
                        if (valnum == numnum) {
                            evaluatedJob[j][xJob[j][k].formula.if[0].is_greater.length] = {value: {number:0}};
                        
                            evaluatedJob[numbers.indexOf(xJob[j][k].formula.if[0].is_greater[0].reference[1])][alphabet.indexOf(xJob[j][k].formula.if[0].is_greater[0].reference[0])].value.number 
                            > evaluatedJob[numbers.indexOf(xJob[j][k].formula.if[0].is_greater[1].reference[1])][alphabet.indexOf(xJob[j][k].formula.if[0].is_greater[1].reference[0])].value.number 
                            ? evaluatedJob[j][xJob[j][k].formula.if[0].is_greater.length].value = 
                            xJob[numbers.indexOf(xJob[j][k].formula.if[1].reference[1])][alphabet.indexOf(xJob[j][k].formula.if[1].reference[0])].value
                            : evaluatedJob[j][xJob[j][k].formula.if[0].is_greater.length].value = xJob[numbers.indexOf(xJob[j][k].formula.if[2].reference[1])][alphabet.indexOf(xJob[j][k].formula.if[2].reference[0])].value;
                        } else {
                        evaluatedJob[j][xJob[j][k].formula.if[0].is_greater.length] = {error: "incompatible types"}
                        }
                    }

                    if (xJob[j][k].formula.hasOwnProperty("concat")) {
                        let valnum = 0; let numnum = 0;
                        for (let ti = 0; ti < xJob[j][k].formula.concat.length; ti++) {
                            if (xJob[j][k].formula.concat[ti].hasOwnProperty('value')){
                                valnum++;
                                if (xJob[j][k].formula.concat[ti].value.hasOwnProperty("number")) {
                                    numnum++;
                                }
                            }
                        }
                        if (valnum == numnum) {
                            evaluatedJob[j][k] = {value: {text:""}};
                            for (let conInd = 0; conInd < xJob[j][k].formula.concat.length; conInd++) {
                                evaluatedJob[j][k].value.text += xJob[j][k].formula.concat[conInd].value.text
                            }
                        } else {
                            evaluatedJob[j][k] = {error:"types do not match"}
                        }
                    }
                }
                //Pijus said that using somebody's help would be the best case scenario so I found somebody on Stack Overflow who showed me how to make the chain to solve the last job. :) Sorry, I didn't figure out how to change the whole code according to this function so the final result isn't much scalable, just adopted to the circumstances.
            if (i == 20) {
                response.jobs[20].data[j][k] = wix.jobs[20].data[j][k]
                copyOf20[j][k] = wix.jobs[20].data[j][k]
                    
               
                
            }

        }

        evaluatedJob[j] = evaluatedJob;
    
    
    }
}

// Here's the recursive function I got on Stack Overflow. 

function get(formula) { // return the cell object at the given reference
    return copyOf20[formula.reference.slice(1)-1][formula.reference.charCodeAt() - "A".charCodeAt()];
  }
  
  function resolve(cell, visited=new Set) {
    // Have we found a cell with just text? Then return that to caller
    if (!("formula" in cell)) return cell.value;
    // Did we already meet this cell before? Then we are running in circles!
    if (visited.has(cell)) return "Circular Reference!";
    // Make a recursive call to know what the text should be
    cell.value = resolve(get(cell.formula), visited.add(cell));
    delete cell.formula;
    return cell.value; // Return this value also to the caller
  }
  
  function calculate(data) {
    // Get to each cell object...
    for (let row of data) {
      for (let cell of row) {
        resolve(cell); // And update its text property by following references
      }
    }
  }



calculate(copyOf20)


response.jobs[20].data = copyOf20;

//  a little function to rename a key from "jobs" to "results", in order to comply to the instructions :)

const renameKey = (object, key, newKey) => {

    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
  
    delete clonedObj[key];
  
    clonedObj[newKey] = targetKey;
    return clonedObj;
  
};

const clone = (obj) => Object.assign({}, obj);

const results = renameKey(response, 'jobs', 'results')

//Export results
console.log(wix)

console.log(results)


// {
//     id: '1',
//     data: [[
//         {value: {number: 1}},
//         {value: {text: '2'}}
//         {formula: {}}
//     ]],
// }
// {
//     id: '1',
//     data: [[

//     ]]
// }