// import { createClient } from "@supabase/supabase-js";

// // SupabaseのURLとAPIキーを入力してください
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default async function Notes() {
//   // "notes"テーブルからデータを取得
//   const { data: notes, error } = await supabase.from("posts").select();

//   // 取得直後にログを出力して確認
//   console.log("取得したデータ:", notes);

//   // エラーが発生した場合の処理
//   if (error) {
//     console.error("ノートの取得中にエラーが発生しました:", error);
//     return <div>ノートの読み込み中に問題が発生しました。</div>;
//   }

//   // JSON形式でデータを表示
//   return <pre>{JSON.stringify(notes, null, 2)}</pre>;
// }
