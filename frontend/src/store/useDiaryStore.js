import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

export const useDiaryStore = create((set) => ({

    isSavingEntry: false,
    isShowingEntries: false,
    diaries: [],
  
    saveEntry: async (data) => {
      try {
        set({ isSavingEntry: true });
        await axiosInstance.post("/diary/entry", data);
        toast.success("Diary Saved Successfully");
        return true;
  
      } catch (error) {
        toast.error(error.response.data.message );
        return false;
  
      } finally {
        set({ isSavingEntry: false });
      }
    },

    showEntries: async()=>{
      try {
        set({isShowingEntries : true})
        const res = await axiosInstance.get("/diary/entries");
        set({diaries:res.data.diaries})
        return res.data.diaries;

      } catch (error) {
        toast.error(error.response.data.message );
      }
      finally{
        set({isShowingEntries : false})
      }
    },

    updateEntry: async(id, data) => {
      try {
        set({ isSavingEntry: true });
        await axiosInstance.put(`/diary/entries/${id}`, data);
        toast.success("Diary Saved Successfully");
        return true;
  
      } catch (error) {
        toast.error(error.response.data.message );
        return false;
  
      } finally {
        set({ isSavingEntry: false });
      }
    },

    deleteEntry: async(id) => {
      try {
        await axiosInstance.delete(`/diary/deleteEntry/${id}`);
        set((state) => ({
          diaries: state.diaries.filter((diary) => diary._id !== id)
        }));
        toast.success("Entry Deleted Successfully");
  
      } catch (error) {
        toast.error(error.response.data.message );
  
      } 
    }
  
  }));
  