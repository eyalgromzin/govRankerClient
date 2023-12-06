import React from 'react';
import KnessetComp from "./Knesset";
import '../components/Parlament.css'
interface MyObject {
    id: number;
    name: string;
    description:string;
    url:string;

}

// @ts-ignore
const ParliamentComp = ({ onPartyMemberSelect }) => {
    const myMembers: MyObject[] = [
        {id:1, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:2, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:3, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:4, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:5, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:6, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:7, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:8, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' },
        {id:9, name:'Bibi', description: 'Bla Bla Bla',url:'/src/assets/images/b.jpg' }
    ];
    // הפעולה הפנימית שמפעילה את הפונקציה המועברת
    const handleMemberSelect = () => {


        // קריאה למתודה המועברת והעברת החבר הנבחר כארגומנט
        onPartyMemberSelect(myMembers);
    };

    return (
        <div>
            <div className="cool-header">
                <h1 className="cool-text">
                    <span className="blue-text">ראשי</span>
                    <span className="gray-text">מפלגות</span>
                </h1>
            </div>
      <KnessetComp dataArray={myMembers}/>
        </div>
    );
};

export default ParliamentComp;
