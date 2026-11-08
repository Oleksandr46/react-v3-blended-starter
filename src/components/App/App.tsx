import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["posts", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSetSearchQuery = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const totalPages = data ? Math.ceil(data?.totalCount / 8) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSetSearchQuery} queryValue={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create post
        </button>
      </header>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>Hello</Modal>}
      {isSuccess && data.posts.length > 0 && <PostList posts={data.posts} />}
    </div>
  );
}
