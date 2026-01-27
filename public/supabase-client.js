// supabase-client.js — безопасная версия

const SUPABASE_URL = "https://goopawxoqziytbxdnriy.supabase.co";
const SUPABASE_KEY = "sb_publishable_8bngfypOUpPs66wzRywfNw_Q7-Soz64";

function initSupabase() {
    try {
        if (!window.supabase || typeof window.supabase.createClient !== 'function') {
            console.error('❌ Supabase SDK не загружен');
            createMockClient();
            return;
        }

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: { persistSession: false }
        });

        window.supabaseClient = client;

        console.log('✅ Supabase клиент создан');

        // НЕ делаем сетевых запросов при старте
        // Просто сигнализируем, что клиент готов
        signalReady();

    } catch (err) {
        console.error('❌ Ошибка инициализации Supabase:', err);
        createMockClient();
        signalReady();
    }
}

function signalReady() {
    window.supabaseReady = true;
    window.dispatchEvent(new Event('supabaseReady'));
}

function createMockClient() {
    console.warn('⚠️ Используется mock Supabase');

    window.supabaseClient = {
        from: () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: () => Promise.resolve({ data: [], error: null }),
            update: () => Promise.resolve({ data: [], error: null }),
            delete: () => Promise.resolve({ data: [], error: null }),
            eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) })
        }),
        auth: {}
    };
}

// Инициализация строго после DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}