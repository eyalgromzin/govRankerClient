import React from 'react';
import GridBoxesComponent from "./GovernmentAssembly";
import KnessetChairs from "./GovernmentAssembly";
import BoxesLayout from "./GovernmentAssembly";
import Knesset from "./Knesset";
import KnessetComp from "./Knesset";

// @ts-ignore
const ParliamentComp = ({ onPartyMemberSelect }) => {
    // הפעולה הפנימית שמפעילה את הפונקציה המועברת
    const handleMemberSelect = () => {
        // כאן אתה יכול ליצור אובייקט PARTY_MEMBER או להשתמש במתודה להבאת המידע ממקור חיצוני
        const partyMember = {
            id: 1,
            name: 'Bibi Natanihu',
            description: 'The current prime minister',
            url:'../img/bibin.jpg'
            // נתונים נוספים של החבר במסיבה
        };

        // קריאה למתודה המועברת והעברת החבר הנבחר כארגומנט
        onPartyMemberSelect(partyMember);
    };

    return (
        <div>
      <KnessetComp data={ParliamentComp}/>
        </div>
    );
};

export default ParliamentComp;
