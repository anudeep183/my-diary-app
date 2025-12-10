import React, { useEffect, useState } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { useDiaryStore } from "../store/useDiaryStore";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';

export default function DiaryEntry() {
  const { saveEntry, isSavingEntry, updateEntry, diaries } = useDiaryStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [tagInput, setTagInput] = useState('');
  const [diaryData, setDiaryData] = useState({
    title: "",
    body: "",
    savedDate: new Date().toISOString().split('T')[0],
    tags: []
  });

  useEffect(() => {
    if (id) {
      const deets = diaries.find(d => d._id === id);
      if (deets) {
        setDiaryData({
          ...deets,
          savedDate: deets.savedDate.split("T")[0],
          tags: Array.isArray(deets.tags)
            ? deets.tags
            : deets.tags
              ? deets.tags.split(",").map(t => t.trim())
              : []
        });
      }
    }
  }, [id, diaries]);

  const today = new Date().toISOString().split('T')[0];

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (diaryData.tags.includes(tagInput.trim())) {
      toast.error("Tag already added");
      return;
    }
    setDiaryData({ ...diaryData, tags: [...diaryData.tags, tagInput.trim()] });
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    setDiaryData({ ...diaryData, tags: diaryData.tags.filter(t => t !== tag) });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!diaryData.title.trim()) return toast.error("Title is required");
    if (!diaryData.savedDate) return toast.error("Please select a date");
    if (!diaryData.body.trim()) return toast.error("Entry cannot be empty");

    let ok = id ? await updateEntry(id, diaryData) : await saveEntry(diaryData);
    if (ok) navigate('/entries');
  };

  return (
    <div className="p-4 md:fixed md:inset-x-5 md:inset-y-20 md:overflow-hidden md:p-6 flex justify-center min-h-screen md:min-h-0">
      <div className="max-w-7xl w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

        {/* Left Panel */}
        <form onSubmit={handleSave} className="md:col-span-1 flex flex-col justify-evenly gap-3 md:gap-5 p-4 md:p-5 rounded-xl border border-gray-700 h-full overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Diary Entry</h1>

          {/* Title */}
          <div>
            <label className="text-sm text-slate-300 mb-1 block">Title</label>
            <input
              type="text"
              value={diaryData.title}
              onChange={(e) => setDiaryData({ ...diaryData, title: e.target.value })}
              placeholder="Enter title..."
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d] border border-gray-700 rounded-lg text-white text-sm md:text-base"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-slate-300 mb-1 block">Date</label>
            <input
              type="date"
              value={diaryData.savedDate}
              max={today}
              onChange={(e) => setDiaryData({ ...diaryData, savedDate: e.target.value })}
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d] border border-gray-700 rounded-lg placeholder-gray-500 text-gray-300 [color-scheme:dark]"
            />

          </div>

          {/* Tags */}
          <div>
            <label className="text-sm text-slate-300 mb-1 block">Tags</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag..."
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d] border border-gray-700 rounded-lg text-white text-sm md:text-base"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d] border border-gray-700 text-white rounded-lg hover:bg-white hover:text-black"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {diaryData.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-[#0D0D0D] border border-slate-600 rounded-full text-sm text-slate-200 flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-400">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSavingEntry}
            className="w-full py-2 md:py-3 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Save size={18} />
            {isSavingEntry ? "Saving..." : "Save Entry"}
          </button>
        </form>

        {/* Right Panel - Body */}
        <div className="md:col-span-2 min-h-[60vh] md:h-full">
          <textarea
            value={diaryData.body}
            onChange={(e) => setDiaryData({ ...diaryData, body: e.target.value })}
            placeholder="Write your thoughts..."
            className="w-full h-full px-3 md:px-4 py-2 md:py-3 bg-[#0d0d0d] border border-gray-700 rounded-xl text-white text-sm md:text-base resize-none"
          />
        </div>
      </div>
    </div>
  );
}