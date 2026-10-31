"use client";

import { useEffect, useState } from "react";
import { supabase, type Note } from "@/lib/supabase";

// Bulut Supabase adresleri *.supabase.co ile biter
const isCloud = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes(".supabase.co");

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("id, content, created_at")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    const text = content.trim();
    if (!text) return;

    setSaving(true);
    const { error } = await supabase.from("notes").insert({ content: text });
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }
    setContent("");
    setError(null);
    loadNotes();
  }

  return (
    <main>
      <header>
        <h1>Notlar</h1>
        {isCloud ? (
          <p className="badge cloud">☁️ Supabase Cloud · Frankfurt</p>
        ) : (
          <p className="badge">🇹🇷 Veriler Türkiye&apos;deki sunucuda</p>
        )}
      </header>

      <form onSubmit={addNote}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bir not yaz..."
          maxLength={280}
        />
        <button type="submit" disabled={saving || !content.trim()}>
          {saving ? "Ekleniyor..." : "Ekle"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.content}</span>
            <time>{new Date(note.created_at).toLocaleString("tr-TR")}</time>
          </li>
        ))}
      </ul>

      {notes.length === 0 && !error && <p className="empty">Henüz not yok.</p>}
    </main>
  );
}
