import { supabase } from "@/integrations/supabase/client";

export type AppRole = "farmer" | "dealer";

export async function signUp(email: string, password: string, fullName: string, role: AppRole) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
      data: { full_name: fullName },
    },
  });
  if (error) throw error;

  // Insert role after signup
  if (data.user) {
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({ user_id: data.user.id, role });
    if (roleError) console.error("Role insert error:", roleError);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUserRole(userId: string): Promise<AppRole | null> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return data.role as AppRole;
}
