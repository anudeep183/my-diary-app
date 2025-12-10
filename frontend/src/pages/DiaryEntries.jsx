import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDiaryStore } from '../store/useDiaryStore';
import { CalendarFold, MoveUp, Search, X } from 'lucide-react';

export default function DiaryEntries() {

  const [searchParams] = useSearchParams();
  const preselectedDate = searchParams.get("date") || "";

  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState(preselectedDate);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const { diaries, showEntries, deleteEntry, isShowingEntries } = useDiaryStore();

  useEffect(() => {
    showEntries();
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    diaries?.forEach((diary) => {
      diary.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [diaries]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const filteredDiaries =
    diaries?.filter((diary) => {
      const matchesSearch = diary.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => diary.tags?.includes(tag));
      const matchesDate =
        searchDate === '' ||
        new Date(diary.savedDate).toISOString().split('T')[0] === searchDate;
      return matchesSearch && matchesTag && matchesDate;
    }) || [];

  const sortedDiaries = [...filteredDiaries].sort((a, b) => {
    const dateA = new Date(a.savedDate);
    const dateB = new Date(b.savedDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="container px-4 mt-5 mx-auto max-w-7xl">
      {/* Search + Filters */}
      <div className="mt-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Title */}
          <div className="relative flex items-center flex-1 sm:flex-none">
            <span className="absolute">
              <Search className="w-5 h-5 mx-3 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search By Title"
              className="block w-full sm:w-64 lg:w-80 py-2 pr-5 bg-[#0d0d0d] border border-gray-700 rounded-lg placeholder-white pl-11 text-gray-300  transition-all"
            />
          </div>

          {/* Date Picker */}
          <div className="relative flex items-center justify-evenly sm:flex-none">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="block  w-full  sm:w-64 lg:w-80 py-2  bg-[#0d0d0d] border border-gray-700 rounded-lg placeholder-gray-500 px-8 text-gray-300  [color-scheme:dark]"
            />
            {searchDate && (
              <button
                onClick={() => setSearchDate('')}
                className="absolute right-3 text-gray-400 hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags Dropdown */}
        <div className="relative w-full lg:w-64">
          <button
            onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
            className="flex items-center justify-between w-full py-2 px-4 bg-[#0d0d0d] border border-gray-700 rounded-lg text-gray-300 "
          >
            <span className="text-sm">
              {selectedTags.length === 0
                ? 'Select Tags'
                : `${selectedTags.length} tag(s) selected`}
            </span>
            <MoveUp className={`w-4 h-4 transition-transform ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isTagDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {allTags.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No tags available
                </div>
              ) : (
                allTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center px-4 py-2 hover:bg-[#0d0d0d] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="w-4 h-4 text-blue-500 bg-[#0d0d0d] border-gray-600 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-300">{tag}</span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Tags Display */}
      <div className="mt-4 min-h-[2.5rem]">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-blue-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1 text-sm text-gray-400 hover:text-gray-200"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="flex flex-col ">
        <div className="overflow-hidden border border-gray-700 rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="py-3 sm:py-3.5 px-4 text-xs sm:text-sm font-normal text-left text-gray-400 w-2/5">
                    Title
                  </th>
                  <th className="hidden md:table-cell px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-normal text-left text-gray-400 w-1/3">
                    <button
                      onClick={toggleSortOrder}
                      className="flex items-center gap-x-2 hover:text-gray-200"
                    >
                      <span>Saved Date</span>
                      <MoveUp className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                    </button>
                  </th>
                  <th className="px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-normal text-left text-gray-400 w-1/4">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="h-[calc(100vh-28rem)] sm:h-[calc(100vh-26rem)] overflow-y-auto overflow-x-auto">
            <table className="min-w-full">
              <tbody className="bg-[#0d0d0d] ">
                {sortedDiaries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-24 text-center  text-gray-500">
                      No Entries Found
                    </td>
                  </tr>
                ) : (
                  sortedDiaries.map((diary) => (
                    <tr
                      key={diary._id}
                      className="transition-colors "
                    >
                      <td className="px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-200 w-2/5">
                        <div className="line-clamp-2 sm:line-clamp-1">
                          {diary.title}
                        </div>
                        <div className="md:hidden text-xs text-gray-400 mt-1 w-1/4">
                          {formatDate(diary.savedDate)}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-300 whitespace-nowrap ">
                        {formatDate(diary.savedDate)}
                      </td>
                      <td className="px-4 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap w-1/4">
                        <div className="flex items-center gap-x-2">
                          <Link
                            to={`/entry/${diary._id}`}
                            className="px-2 sm:px-3 py-1 text-xs text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => deleteEntry(diary._id)}
                            className="px-2 sm:px-3 py-1 text-xs text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}