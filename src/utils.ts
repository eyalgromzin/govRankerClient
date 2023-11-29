import { Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "./models";


export const getGovernmentParties = (govUUID: string, PartyAndGovernments: PartyAndGovernment[],
        allParties: Party[]):Party[] => {
    const partiesUUIDs: string[] = []
    const parties: Party[] = []

    PartyAndGovernments.forEach(PartyAndGovernmentI => {
        if(PartyAndGovernmentI.governmentUUID == govUUID){
            partiesUUIDs.push(PartyAndGovernmentI.partyUUID)
        }
    })

    partiesUUIDs.map(partyUUID => {
        return parties.filter(partyI => partyI.uuid == partyUUID)
    })

    return parties
}

export const getPartyMembers = (partyUUID: string, partyMembersAndParty: PartyMemberAndParty[],
    allPartyMembers: PartyMember[]):PartyMember[] => {
    
    const partyMemberUUIDs: string[] = []
    partyMembersAndParty.forEach(partyMemberAndPartyI => {
        if(partyMemberAndPartyI.partyUUID == partyUUID){
            partyMemberUUIDs.push(partyMemberAndPartyI.partyMemberUUID)
        }
    })

    const resPartyMembers = partyMemberUUIDs.map(partyMemberUUID => {
        return allPartyMembers.filter(partyMemberI => partyMemberI.uuid == partyMemberUUID)[0]
    })

    return resPartyMembers
}