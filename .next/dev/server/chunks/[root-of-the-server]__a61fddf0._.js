module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$29$__ = __turbopack_context__.i("[externals]/@prisma/adapter-pg [external] (@prisma/adapter-pg, esm_import, [project]/node_modules/@prisma/adapter-pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL
});
const adapter = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$29$__["PrismaPg"](pool);
const prisma = global.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    adapter
});
if ("TURBOPACK compile-time truthy", 1) {
    global.prisma = prisma;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/pages/api/sales-today.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function handler(req, res) {
    console.log("📊 DASHBOARD ANALYTICS API HIT");
    try {
        const now = new Date();
        // Today range
        const startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        const endToday = new Date();
        endToday.setHours(23, 59, 59, 999);
        // Week range
        const startWeek = new Date();
        startWeek.setDate(now.getDate() - 7);
        // Month range
        const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        // Fetch all sales once
        const sales = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["prisma"].sale.findMany({
            include: {
                items: {
                    include: {
                        item: true
                    } // ⭐ join item table
                }
            }
        });
        // ---- TODAY ----
        const todaySales = sales.filter((s)=>new Date(s.createdAt) >= startToday && new Date(s.createdAt) <= endToday);
        const todayTotal = todaySales.reduce((s, x)=>s + x.totalAmount, 0);
        const todayBills = todaySales.length;
        const cashTotal = todaySales.filter((s)=>s.paymentMode === "CASH").reduce((s, x)=>s + x.totalAmount, 0);
        const upiTotal = todaySales.filter((s)=>s.paymentMode === "UPI").reduce((s, x)=>s + x.totalAmount, 0);
        // ---- WEEK ----
        const weekSales = sales.filter((s)=>new Date(s.createdAt) >= startWeek);
        const weekTotal = weekSales.reduce((s, x)=>s + x.totalAmount, 0);
        // ---- MONTH ----
        const monthSales = sales.filter((s)=>new Date(s.createdAt) >= startMonth);
        const monthTotal = monthSales.reduce((s, x)=>s + x.totalAmount, 0);
        // ---- TOP ITEMS ----
        const itemCount = {};
        sales.forEach((sale)=>{
            sale.items.forEach((i)=>{
                const name = i.item.name;
                itemCount[name] = (itemCount[name] || 0) + i.qty;
            });
        });
        const topItems = Object.entries(itemCount).sort((a, b)=>b[1] - a[1]).slice(0, 5);
        // HOURLY SALES
        const hourly = {};
        todaySales.forEach((sale)=>{
            const hour = new Date(sale.createdAt).getHours();
            hourly[hour] = (hourly[hour] || 0) + sale.totalAmount;
        });
        const hourlySales = Object.entries(hourly).map(([hour, total])=>({
                hour: hour + ":00",
                total
            }));
        res.status(200).json({
            todayTotal,
            todayBills,
            cashTotal,
            upiTotal,
            weekTotal,
            monthTotal,
            topItems
        });
    } catch (err) {
        console.log("❌ ANALYTICS ERROR:", err);
        res.status(500).json({
            error: "Analytics failed"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a61fddf0._.js.map