 // for (let ti = 0; ti < wix.jobs[i].data[ti].length; ti++) {
                                    //     if (wix.jobs[i].data[j][ti].hasOwnProperty("value")) {
                                    //     }
                                    // }
                                    
                                    
                                    // response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.sum.length].value.number += 
               
                       
                        // for (let typeInd = 0; typeInd < wix.jobs[i].data[j][k].formula.sum.length; typeInd++){
                        //     if (wix.jobs[i].data[j][k].hasOwnProperty("value")) {
                        //     if (!wix.jobs[i].data[j][k].value.hasOwnProperty("number")) {
                        //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.sum.length] = {error:"incompatible types"};
                        //         break
                                
                        //     } else if (typeInd = wix.jobs[i].data[j][k].formula.sum.length - 1) {
                        //                     }
                        //                 }   
                        //             }
                                
//  ALPHABET LOOP
                         // let colind; let rowind;
                            // for (ind = 0; ind < alphabet.length; ind++) {
                            //     letter = alphabet[ind];
                            //     colind = ind;
                            //     for (num_ind = 0; num_ind < numbers.length; num_ind++){
                            //         number = numbers[num_ind];
                            //         rowind = num_ind;
                            //         cell = letter + number;
                                
                            //         if (cell == wix.jobs[i].data[j][k].formula.divide[divInd].reference) {
                            //             response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.divide.length].value.number *= response.jobs[i].data[j][colind].value.number;
                            //             } 
                            //     }
                            // }           
                            
// TRUE AND 1

                    // response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.boolean = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[0])].value.boolean

                    // if (wix.jobs[i].data[j][0].value.hasOwnProperty("boolean") && wix.jobs[i].data[j][1].value.hasOwnProperty("number")) {
                    //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length] = {value:{number:0}}
                    //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.number = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[0])].value.number
                    //     } else if (wix.jobs[i].data[j][0].value.hasOwnProperty("number") && wix.jobs[i].data[j][1].value.hasOwnProperty("boolean")){
                    //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length] = {value:{boolean:0}}
                    //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.number = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[0])].value.number && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[0])].value.boolean
                    //     }
                    // if (wix.jobs[i].data[j][k].formula.and.length == 3) {
                    //     response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length] = {value:{boolean: 0}};
                    //     response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.boolean = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[0].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[1].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[2].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[2].reference[0])].value.boolean 

   function calculate(data) {
   function get(reference) { // return the cell object at the given reference
      return data[reference.slice(1)-1][reference.charCodeAt() - "A".charCodeAt()];
   }
   
   function resolve(cell, visited=new Set) {
      if (!("reference" in cell)) return cell.text;
      if (visited.has(cell)) return "Circular Reference!";
      return cell.text = resolve(get(cell.reference), visited.add(cell)); 
   }
   
   // Get to each cell object...
   for (let row of data) {
      for (let cell of row) {
         // And update its text property by following references
         cell.text = resolve(cell);
      }
   }
   }
   
   let data = [
   [
      { reference: "B1" }, 
      { reference: "C1" }, 
      { reference: "D1" }, 
      { reference: "E1" }, 
      { reference: "F1" }, 
      { reference: "G1" }, 
      { reference: "H1" }, 
      { text: "Last" }, 
   ]
   ];


   function get(reference) { // return the cell object at the given reference
      return data[reference.slice(1)-1][reference.charCodeAt() - "A".charCodeAt()];
    }
    
    function resolve(cell, visited=new Set) {
      // Have we found a cell with just text? Then return that to caller
      if (!("reference" in cell)) return cell.text;
      // Did we already meet this cell before? Then we are running in circles!
      if (visited.has(cell)) return "Circular Reference!";
      // Make a recursive call to know what the text should be
      cell.text = resolve(get(cell.reference), visited.add(cell));
      delete cell.reference;
      return cell.text; // Return this value also to the caller
    }
    
    function calculate(data) {
      // Get to each cell object...
      for (let row of data) {
        for (let cell of row) {
          resolve(cell); // And update its text property by following references
        }
      }
    }
    
    let data = [
      [
        {reference: "B1"}, {reference: "C1"}, {reference: "D1"}, {reference: "E1"}, 
        {reference: "F1"}, {reference: "G1"}, {reference: "H1"}, {text: "Last"}, 
      ]
    ];
    
    calculate(data);
    console.log(data);
   

      // if (wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[0])].value.hasOwnProperty("number") && andInd > 0) {
                                        
                                        //     response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length] = {value:{number: 0}};
                                            
                                        //     response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.number = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd - 1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd - 1].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[0])].value.number;
                                            
                                        //     } else if (wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[0])].value.hasOwnProperty("number") && andInd == 0) {
                                            
                                        //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length] = {value:{boolean: 0}};

                                        //         response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.and.length].value.boolean = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd].reference[0])].value.number && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.and[andInd - 1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.and[andInd - 1].reference[0])].value.boolean

                                        //     }


                                        // if (wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.or[orInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.or[orInd].reference[0])].value.hasOwnProperty("number") && orInd == 0) {

                                        //   response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.or.length] = {value:{number: 0}};
  
                                        //   response.jobs[i].data[j][wix.jobs[i].data[j][k].formula.or.length].value.number = wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.or[orInd - 1].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.or[orInd - 1].reference[0])].value.boolean && wix.jobs[i].data[numbers.indexOf(wix.jobs[i].data[j][k].formula.or[orInd].reference[1])][alphabet.indexOf(wix.jobs[i].data[j][k].formula.or[orInd].reference[0])].value.number;
  