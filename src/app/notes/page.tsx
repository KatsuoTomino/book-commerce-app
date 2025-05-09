"use client"; // クライアントコンポーネントとして動作

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Notes() {
  const [notes, setNotes] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase.from("posts").select();

      if (error) {
        console.error("ノートの取得中にエラーが発生しました:", error);
        setError("ノートの読み込み中に問題が発生しました。");
      } else {
        setNotes(data);
      }
    }

    fetchNotes();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!notes) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
