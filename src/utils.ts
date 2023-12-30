import { Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "./models";


export const getGovernmentParties = (govUUID: string, PartyAndGovernments: PartyAndGovernment[], allParties: Party[]):Party[] => {
    const partiesUUIDs: string[] = []

    PartyAndGovernments.forEach(PartyAndGovernmentI => {
        if(PartyAndGovernmentI.governmentUUID == govUUID){
            partiesUUIDs.push(PartyAndGovernmentI.partyUUID)
        }
    })

    const resParties: Party[] = partiesUUIDs.map(partyUUID => {
        return allParties.filter(partyI => partyI.entity_uuid == partyUUID)[0]
    })

    return resParties
}

export const getPartyMembers = (partyUUID: string, partyMembersAndParty: PartyMemberAndParty[], allPartyMembers: PartyMember[]):PartyMember[] => {
    
    if (!allPartyMembers){
        return []
    }

    const partyMemberUUIDs: string[] = []
    partyMembersAndParty.forEach(partyMemberAndPartyI => {
        if(partyMemberAndPartyI.partyUUID == partyUUID){
            partyMemberUUIDs.push(partyMemberAndPartyI.partyMemberUUID)
        }
    })

    const resPartyMembers = partyMemberUUIDs.map(partyMemberUUID => {
        return allPartyMembers.filter(partyMemberI => partyMemberI.entity_uuid == partyMemberUUID)[0]
    })

    return resPartyMembers
}