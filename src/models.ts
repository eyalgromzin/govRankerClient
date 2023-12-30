export interface Government {
    entity_uuid: string,
    name: string,
    description: string,
    imageUrl: string, 
}

export interface Party {
    entity_uuid: string,
    name: string,
    description: string,
    imageUrl: string, 
}

export interface PartyMember {
    entity_uuid: string,
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
    entity_uuid: string,
    title: string,
    url: string,
    date: string, 
    description: string,
    imageUrl: string, 
    rating: number,
    creationDate: string,
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

export interface PartyMemberAndGovernment {
    id: number,
    partyMemberUUID: string,
    governmentUUID: string,
}

export interface EntityAndArticle {
    id: number,
    entityUUID: string,
    articleUUID: string,
}

export enum EntityType {
    government = 1,
    party,
    partyMember,
}

export interface APIResult {
    data: any | undefined, 
    error: string | undefined
}