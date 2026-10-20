import { create } from "zustand";
import { Announcement } from "@/types";

interface AnnouncementDataStore {
  announcement: Announcement | null;
  selectedAnnouncementId: string | null;
  setAnnouncement: (announcement: Announcement) => void;
  setSelectedAnnouncementId: (id: string) => void;
}

export const useAnnouncementDataStore = create<AnnouncementDataStore>((set) => ({
  announcement: null,
  selectedAnnouncementId: null,
  setAnnouncement: (announcement) => set({ announcement }),
  setSelectedAnnouncementId: (id) => set({ selectedAnnouncementId: id }),
}));