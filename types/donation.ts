// types/donation.ts
export interface Donation {
    id: string;
    name: string;
    description: string;
    image?: string;
    tags: string[];
    goal?: string;
    impact?: string;
    owner?: {
        id: string;
        name: string;
    };
    urgency?: string;
}