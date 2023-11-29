export interface Government {
    uuid: string,
    name: string,
    description: string,
    imageUrl: string, 
}

export interface Party {
    uuid: string,
    name: string,
    description: string,
    imageUrl: string, 
}

export interface PartyMember {
    uuid: string,
    name: string,
    description: string,
    imageUrl: string, 
}

export interface PartyToGovernment {
    id: number,
    partyUUID: string,
    governmentUUID: string,
}

export interface PartyMemberToParty {
    id: number,
    partyMemberUUID: string,
    partyUUID: string,
}

export interface Article {
    uuid: string,
    url: string,
    date: string, 
    description: string,
    imageUrl: string, 
    rating: number,
}

export interface PartyAndGovernment {
    partyUUID: string,
    governmentUUID: string,
}

export interface PartyMemberAndParty {
    id: number,
    partyMemberUUID: string,
    partyUUID: string,
}