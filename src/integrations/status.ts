const checkSupabaseGlobalStatus = async (): Promise<boolean> => {
  try {
    const res = await fetch("https://status.supabase.com/api/v2/status.json");
    const data = await res.json();
    return data.status.indicator === "none"; // "none" = all good
  } catch (err) {
    console.error("Error checking Supabase status page:", err);
    return false;
  }
};

export default checkSupabaseGlobalStatus;
