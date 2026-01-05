
interface Post {
    id: string;
    title: string;
    description: string;
    location: string;
    images?: string[];
    created_at: string;
    updated_at: string;
    parent_post_id?: string;
    created_by?: {
        id: string;
        first_name: string;
        last_name: string;
        avatar?: string;
    };
    post_type: string;
    price: string | Number | null; 
    time?: string;
    comments?: Post[];
    contact?: string;
}

interface EventsState {
    events: Post[];
    ads: Post[];
    loading: boolean;
    error?: string;
    selectedEvent: Post | null;
    fetchEvents: () => Promise<void>;
    fetchEventDetails: (id: string) => Promise<void>;
    addEvent: (newEvent: Partial<Post>) => Promise<void>;
    fetchAds: () => Promise<void>;
}

