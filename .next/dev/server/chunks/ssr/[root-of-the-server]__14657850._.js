module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/src/pages/dashboard.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
function Dashboard() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("REGULAR");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const user = localStorage.getItem("user");
        if (!user) router.push("/login");
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetch("/api/items").then((r)=>r.json()).then(setItems);
    }, []);
    // ADD TO CART
    const addToCart = (item)=>{
        setCart((prev)=>{
            const existing = prev.find((i)=>i.id === item.id);
            if (existing) return prev.map((i)=>i.id === item.id ? {
                    ...i,
                    qty: i.qty + 1
                } : i);
            return [
                ...prev,
                {
                    ...item,
                    qty: 1
                }
            ];
        });
    };
    const increaseQty = (id)=>setCart((prev)=>prev.map((i)=>i.id === id ? {
                    ...i,
                    qty: i.qty + 1
                } : i));
    const decreaseQty = (id)=>setCart((prev)=>prev.map((i)=>i.id === id ? {
                    ...i,
                    qty: i.qty - 1
                } : i).filter((i)=>i.qty > 0));
    const total = cart.reduce((sum, i)=>sum + i.price * i.qty, 0);
    const categories = [
        ...new Set(items.map((i)=>i.category))
    ];
    const filtered = items.filter((i)=>i.category === category && i.isActive);
    // RECEIPT 🧾
    const printReceipt = (mode)=>{
        const now = new Date();
        const date = now.toLocaleString();
        const txn = "TXN" + Date.now();
        const win = window.open("", "PRINT", "width=300,height=650");
        win.document.write(`
      <html>
      <body style="font-family:monospace;padding:10px">
        <center>
          <h3>ICE SPOT</h3>
          Kurishumood, Changanacherry<br/>
          GSTIN: 32XXXXXXXXXXXX
        </center>
        <hr/>
        Date: ${date}<br/>
        Bill No: ${txn}<br/>
        Payment: ${mode}
        <hr/>

        ${cart.map((i)=>`
          <div style="display:flex;justify-content:space-between">
            <span>${i.name} x${i.qty}</span>
            <span>₹${i.price * i.qty}</span>
          </div>
        `).join("")}

        <hr/>
        <h3>Total: ₹${total}</h3>
        <hr/>
        <center>Thank You ❤️<br/>Visit Again</center>
      </body>
      </html>
    `);
        win.document.close();
        win.print();
    };
    // 💰 PAYMENT (FINAL FIX ADDED)
    const pay = async (mode)=>{
        if (cart.length === 0) return alert("Cart empty");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        await fetch("/api/create-sale", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: cart,
                total,
                userId: user.id,
                paymentMode: mode // ⭐ IMPORTANT FIX
            })
        });
        printReceipt(mode);
        setCart([]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    padding: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "Menu 🍦"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/report"),
                        style: {
                            marginBottom: 10,
                            padding: 8
                        },
                        children: "📊 View Today Report"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setCategory(cat),
                            style: {
                                marginRight: 10,
                                padding: "8px 14px",
                                background: cat === category ? "#333" : "#eee",
                                color: cat === category ? "#fff" : "#000",
                                borderRadius: 20,
                                border: "none"
                            },
                            children: cat
                        }, cat, false, {
                            fileName: "[project]/src/pages/dashboard.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(4,1fr)",
                            gap: 10,
                            marginTop: 20
                        },
                        children: filtered.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>addToCart(item),
                                style: {
                                    padding: 15,
                                    background: "#f3f3f3",
                                    borderRadius: 10
                                },
                                children: [
                                    item.name,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/pages/dashboard.tsx",
                                        lineNumber: 140,
                                        columnNumber: 26
                                    }, this),
                                    "₹",
                                    item.price
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/pages/dashboard.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/dashboard.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    width: 330,
                    padding: 20,
                    borderLeft: "1px solid #ddd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "Cart 🧾"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    cart.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 8
                            },
                            children: [
                                i.name,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>decreaseQty(i.id),
                                            children: "-"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/dashboard.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                            children: [
                                                " ",
                                                i.qty,
                                                " "
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/dashboard.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>increaseQty(i.id),
                                            children: "+"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/dashboard.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        "= ₹",
                                        i.price * i.qty
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/dashboard.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i.id, true, {
                            fileName: "[project]/src/pages/dashboard.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {}, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: [
                            "Total: ₹",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>pay("CASH"),
                        style: {
                            width: "100%",
                            padding: 12,
                            background: "green",
                            color: "#fff",
                            marginTop: 10
                        },
                        children: "PAY CASH 💵"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>pay("UPI"),
                        style: {
                            width: "100%",
                            padding: 12,
                            background: "purple",
                            color: "#fff",
                            marginTop: 10
                        },
                        children: "PAY UPI 📱"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/dashboard.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/dashboard.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/dashboard.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__14657850._.js.map