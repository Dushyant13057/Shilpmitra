# ShilpMitra — Supabase Setup Instructions

Follow these 3 simple steps to connect your ShilpMitra frontend to your real Supabase project:

---

### Step 1: Configure Environment Variables

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) -> Select your project -> **Project Settings** -> **API**.
2. Copy your **Project URL** and **anon public key**.
3. Open or create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Restart your development server:
```bash
npm run dev
```

---

### Step 2: Run the SQL Schema & RLS Migration

1. In your Supabase Dashboard, click on **SQL Editor** from the left navigation.
2. Click **New Query**.
3. Copy and paste the entire contents of [`supabase/schema.sql`](./schema.sql).
4. Click **Run** (or press Ctrl + Enter).

This creates:
- The `public.profiles` table with foreign key to `auth.users(id)`
- Auto-updated `updated_at` trigger
- The `handle_new_user` trigger that automatically provisions a profile row upon signup
- Row Level Security (RLS) policies ensuring users can only read and update their own profile data

---

### Step 3: Configure Auth Email Confirmation (Optional)

In your Supabase Dashboard -> **Authentication** -> **Providers** -> **Email**:
- For immediate local development testing, you can disable **"Confirm email"** to allow artisans to login immediately upon registration without verifying an email link.
- If **"Confirm email"** is enabled, artisans will receive an email verification link before logging in.
