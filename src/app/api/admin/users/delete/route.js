import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client (Service Role)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // Needs to be in .env.local
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // 1. Delete from auth.users (This automatically cascades if set up correctly, but cleaner to verify)
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (authError) {
            console.error("Auth Delete Error:", authError);
            return NextResponse.json({ message: "Error deleting auth user: " + authError.message }, { status: 500 });
        }

        // 2. Delete from public.profiles (If no cascade)
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .delete()
            .eq('id', userId);

        if (profileError) {
            console.error("Profile Delete Error:", profileError);
            // Don't fail the request if auth was deleted, just warn
        }

        return NextResponse.json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Delete Handler Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
