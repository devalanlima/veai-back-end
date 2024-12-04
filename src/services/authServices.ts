import supabase from "../utils/supabaseClient";

export async function signUpNewUser(
  email: string, 
  password: string, 
  name: string
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
