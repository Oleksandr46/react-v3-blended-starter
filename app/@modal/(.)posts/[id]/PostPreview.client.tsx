'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    refetchOnMount: false,
  });


  useEffect(() => {
    if (!data) return;

    const fn = async () => {
    const userId = data?.userId;
      const user = await fetchUserById(userId);
      setUser(user);
    };
    fn();
  }, [data]);

  const handleClose = () => {router.back()};

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{ data?.title}</h2>
          </div>

          <p className={css.content}>{ data?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
