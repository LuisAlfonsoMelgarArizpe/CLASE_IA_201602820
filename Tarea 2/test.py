import time

def reflex_agent(location, state):
    if state=="SUCIO":
        return 'LIMPIO'
    if state =="LIMPIO" and location =="B":
        return "SUCIO"
    elif location=='A':
        return 'RIGHT'
    elif location=='B':
        return 'LEFT'   

def test(states):
    while True:
        location = states[0]
        state = (states[2], states[1])[states[0]=='A']
        action = reflex_agent(location, state)
        print ("Location: " + location + " | Action: "+ action)
        if action == "LIMPIO":
            if location == 'A':
                states[1]="LIMPIO"
            elif location == 'B':
                states[2]="LIMPIO"
        elif action =="SUCIO":
            if location == 'B':
                states[0] = 'A';
                states[1] = 'SUCIO'
        elif action == "RIGHT":
            states[0]='B'
        elif action == "LEFT":
            states[0]='A' 
        time.sleep(3)

test(['A','SUCIO','SUCIO'])

