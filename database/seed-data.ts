interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

interface SeedData {
    entries: SeedEntry[];
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            status: 'development',
            createdAt: Date.now()-1000*60*60*24*2
        },
        {
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
            status: 'testing',
            createdAt: Date.now()-2000*60*60*24*2
        }
    ]
}