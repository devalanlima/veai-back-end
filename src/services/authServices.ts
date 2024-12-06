import supabase from '../utils/supabaseClient';

export async function signUpNewUser(
  email: string,
  password: string,
  name: string,
) {
  const data = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  return data;
}

export async function signInUser(email: string, password: string) {
  const data = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
}

export async function resetPassword(email: string) {
  const data = await supabase.auth.resetPasswordForEmail(email);

  return data;
}
