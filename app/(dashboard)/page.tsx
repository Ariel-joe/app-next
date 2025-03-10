import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: notes } = await supabase.from("notes").select();

  return (
    <>
      <div>
        {notes?.map((note, i) => (
          <li key={i}>
            {note.id} {note.title}
          </li>
        ))}
      </div>
    </>
  );
}
