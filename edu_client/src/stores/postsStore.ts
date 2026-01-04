import { create } from "zustand"
import axiosInstance from "@/lib/api-client"
import { createPostEndpoint, getAllEventsPostsEndpoint, getPostDetailsEndpoint } from "@/lib/endpoints"


export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  loading: false,
  error: undefined,
  selectedEvent: null,

  // ✅ Fetch events (auto-refresh support)
  fetchEvents: async () => {
    try {
      const res = await axiosInstance.get(getAllEventsPostsEndpoint)
      set({ events: res.data })
    } catch (err: any) {
      set({ error: err.message })
    } finally {
    }
  },
  fetchEventDetails: async (id) => {
    try {
      const res = await axiosInstance.get(getPostDetailsEndpoint + id)
      set({selectedEvent: res.data})
    } catch (err: any) {
      set({ error: err.message })
    }
  },

  addEvent: async (newEvent) => {
    try {
      await axiosInstance.post(createPostEndpoint, newEvent)
      if (newEvent.conversation_id && get().selectedEvent){
        await get().fetchEventDetails(get().selectedEvent.id)
      } else {
        await get().fetchEvents()
      }
    } catch (err: any) {
      set({ error: err.message })
    }
  },

}))
