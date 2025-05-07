export interface Battle {
    id: string;
    title: string;
    models: string[];
    votes: Record<string, number>;
    type: string;
    date: string;
    user: { name: string; avatar: string };
}
