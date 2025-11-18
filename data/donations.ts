// data/donations.ts
import { Donation } from '@/types/donation';

export const DONATIONS: Donation[] = [
    {
        id: '1',
        name: 'Resgate Animal SP',
        description: 'Abrigo dedicado ao resgate e reabilitação de animais em situação de rua na capital paulista.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
        tags: ['resgate', 'reabilitação', 'São Paulo', 'urgente'],
        goal: 'R$ 15.000/mês',
        impact: '+120 animais resgatados este mês',
        owner: {
            id: '1',
            name: 'Resgate Animal SP'
        },
        urgency: 'Alta necessidade'
    },
    {
        id: '2',
        name: 'Projeto Focinhos',
        description: 'Projeto comunitário de castração e vacinação em áreas carentes do Rio de Janeiro.',
        tags: ['castração', 'vacinação', 'Rio de Janeiro', 'comunitário'],
        goal: 'R$ 8.000/mês',
        impact: '500 castrações realizadas',
        owner: {
            id: '2',
            name: 'Projeto Focinhos'
        }
    },
    {
        id: '3',
        name: 'Lar Temporário MG',
        description: 'Rede de lares temporários para animais aguardando adoção em Minas Gerais.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
        tags: ['lar temporário', 'adoção', 'Minas Gerais'],
        goal: 'R$ 12.000/mês',
        impact: '45 adoções este mês',
        owner: {
            id: '3',
            name: 'Lar Temporário MG'
        }
    }
];

export const ALL_TAGS = Array.from(
    new Set(DONATIONS.flatMap(d => d.tags))
).sort();