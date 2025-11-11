export type DonationOwner = {
    id: string;
    name: string;
    role: string;
    location: string;
    bio: string;
    avatar?: string;
    focus?: string;
    contact?: string;
};

export type Donation = {
    id: string;
    name: string;
    description: string;
    tags: string[];
    image?: string;
    goal?: string;
    impact?: string;
    owner: DonationOwner;
};
