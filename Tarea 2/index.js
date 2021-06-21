var  bandera= false;
var states = ["B","DIRTY","DIRTY"];

function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGTH";
    else if (location=="B") return "LEFT";
}

function test(states){
       var location = states[0];		
       var state = states[0] == "A" ? states[1] : states[2];
       var action_result = reflex_agent(location, state);
       document.getElementById("out").innerHTML+="<br> State: ".concat(states[1]).concat("/").concat(states[2]).concat("<br> En: ").concat(location).concat(" -> ").concat(action_result);	
       if(states[1]=="CLEAN" && states[2]=="CLEAN"){
        if(bandera){
            states = ["A","DIRTY","DIRTY"];
            bandera=false;
        }else{ 
            bandera=true;
            states[1] = "DIRTY";
            states[2] = "DIRTY";           
        }
    }else if(action_result == "CLEAN"){
         if (location == "A") states[1] = "CLEAN";
          else if (location == "B") states[2] = "CLEAN";
       }
       else if (action_result == "RIGTH") states[0] = "B";
       else if (action_result == "LEFT") states[0] = "A";	
 setTimeout(
    function(){
        test(states);
    }, 1000);
}

test(states);