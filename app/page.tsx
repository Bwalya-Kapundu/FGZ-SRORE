'use client'

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// NOTE: This single-file React component is designed to be used in a Create React App / Vite project.
// TailwindCSS is assumed to be configured in the host project.

export default function FashionStoreApp() {
    const [products] = useState([
        { id: 1, name: "Zambezi Hoodie", price: 350, image: "/images/outfit1.jpg", category: "lounge", tags: ["vibrant"] },
        { id: 2, name: "Lusaka Sneaks", price: 500, image: "/images/outfit2.jpg", category: "street", tags: ["bold"] },
        { id: 3, name: "Night Out Dress", price: 420, image: "/images/outfit3.jpg", category: "night", tags: ["print"] },
        { id: 4, name: "Class Blazer", price: 780, image: "/images/class.jpg", category: "class", tags: ["minimal"] },
    ]);

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
            const matchFilter = filter === "all" ? true : p.category === filter;
            return matchQuery && matchFilter;
        });
    }, [products, query, filter]);

    function addToCart(product) {
        setCart((c) => {
            const found = c.find((x) => x.id === product.id);
            if (found) return c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
            return [...c, { ...product, qty: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart((c) => c.filter((x) => x.id !== id));
    }

    function changeQty(id, qty) {
        setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));
    }

    function total() {
        return cart.reduce((s, p) => s + p.price * p.qty, 0);
    }

    function fakeLogin(name) {
        setUser({ name });
        setShowLogin(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur py-4 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">FGZ STORES</h1>
                        <p className="text-xs text-gray-600">Slay the day with Zambia's hottest styles!</p>
                    </div>

                    <nav className="flex items-center gap-4 bg-black">
                        <div className="hidden sm:flex gap-3 ">
                            <button onClick={() => setFilter("all")} className="text-sm font-medium">All</button>
                            <button onClick={() => setFilter("class")} className="text-sm">Class</button>
                            <button onClick={() => setFilter("night")} className="text-sm">Night Out</button>
                            <button onClick={() => setFilter("lounge")} className="text-sm">Lounge</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search styles" className="px-3 py-1 rounded-md border" />
                            <button onClick={() => setShowCart(true)} className="relative px-3 py-2 rounded-md bg-orange-500 text-white font-semibold">
                                Cart
                                <span className="ml-2 bg-white text-orange-600 rounded-full px-2 text-xs font-bold">{cart.length}</span>
                            </button>
                            {user ? (
                                <div className="text-sm">Hi, <span className="font-semibold">{user.name}</span></div>
                            ) : (
                                <button onClick={() => setShowLogin(true)} className="px-3 py-2 rounded-md border">Login</button>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <main className="max-w-6xl mx-auto px-4 py-10">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                        <h2 className="text-4xl font-bold">Bold. Fresh. Unapologetic.</h2>
                        <p className="mt-4 text-gray-600">Curated looks for class, nights out and everyday lounging — proudly for the modern Zambian.</p>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => setFilter("night")} className="px-5 py-3 rounded-full bg-orange-500 text-white font-semibold shadow">Shop Night Out</button>
                            <button onClick={() => setFilter("lounge")} className="px-5 py-3 rounded-full border font-semibold">Lounge</button>
                        </div>
                    </motion.div>

                    {/* Simple image slider */}
                    <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                        <div className="relative rounded-xl overflow-hidden shadow-lg">
                            <div className="h-64 sm:h-80 bg-cover bg-center" style={{ backgroundImage: `url('https://mensflair.com/wp-content/uploads/2023/03/streetwear-comfort-900x1125.jpg')` }} />
                        </div>
                    </motion.div>
                </section>

                {/* Featured */}
                <section className="mt-12">
                    <h3 className="text-2xl font-bold">Featured Styles</h3>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <motion.article key={p.id} whileHover={{ scale: 1.02 }} className="rounded-lg border p-3 bg-white">
                                <div className="h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                                    <img src={p.image} alt={p.name} className="object-cover h-full w-full" />
                                </div>
                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold">{p.name}</h4>
                                        <p className="text-sm text-gray-600">K{p.price}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => addToCart(p)} className="px-3 py-1 rounded-md bg-orange-500 text-white text-sm">Add</button>
                                        <button className="text-xs">Details</button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>

                {/* Collections preview */}
                <section className="mt-12">
                    <h3 className="text-2xl font-bold">Collections</h3>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img src="/images/class.jpg" alt="Class" className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Class Fits</h4>
                                <p className="text-sm text-gray-600">Smart, minimal and ready for campus or work.</p>
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img src="/images/nightout.jpg" alt="Night Out" className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Night Out</h4>
                                <p className="text-sm text-gray-600">Statement pieces to shine after sunset.</p>
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img src="/images/lounge.jpg" alt="Lounge" className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h4 className="font-semibold">Loungewear</h4>
                                <p className="text-sm text-gray-600">Comfort-first fits with style.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Shop grid with filters */}
                <section className="mt-12">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold">Shop</h3>
                        <div className="flex gap-3">
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-md">
                                <option value="all">All</option>
                                <option value="class">Class</option>
                                <option value="night">Night Out</option>
                                <option value="lounge">Lounge</option>
                                <option value="street">Street</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filtered.map((p) => (
                            <div key={p.id} className="rounded-lg border p-3 bg-white shadow-sm">
                                <img src={p.image} alt={p.name} className="h-56 w-full object-cover rounded-md" />
                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold">{p.name}</h4>
                                        <p className="text-sm text-gray-600">K{p.price}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => addToCart(p)} className="px-4 py-2 rounded-md bg-orange-500 text-white">Add to Cart</button>
                                        <button className="text-xs">Reviews</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About & Contact */}
                <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold">About Us</h3>
                        <p className="mt-3 text-gray-600">FGZ STORES brings stylish, modern, and culturally inspired fashion to young Zambians. We celebrate identity, confidence, and bold expression through every piece.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Contact</h3>
                        <form className="mt-3 flex flex-col gap-3 max-w-lg">
                            <input placeholder="Your name" className="px-3 py-2 border rounded" />
                            <input placeholder="Email" className="px-3 py-2 border rounded" />
                            <textarea placeholder="Message" className="px-3 py-2 border rounded" rows={4} />
                            <button className="px-4 py-2 rounded bg-orange-500 text-white w-max">Send</button>
                        </form>
                        <p className="mt-4 text-sm text-gray-600">Follow us: Instagram • Facebook • TikTok</p>
                    </div>
                </section>

                <footer className="mt-16 py-8 text-center text-sm text-gray-500">&copy; 2025 FGZ STORES. All rights reserved.</footer>
            </main>

            {/* CART DRAWER */}
            <AnimatePresence>
                {showCart && (
                    <motion.aside initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50">
                        <div className="p-4 flex justify-between items-center border-b">
                            <h4 className="font-bold">Your Cart</h4>
                            <button onClick={() => setShowCart(false)} className="text-sm">Close</button>
                        </div>
                        <div className="p-4 space-y-4">
                            {cart.length === 0 && <p className="text-gray-600">Your cart is empty.</p>}
                            {cart.map((c) => (
                                <div key={c.id} className="flex items-center gap-3">
                                    <img src={c.image} className="h-16 w-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="font-semibold">{c.name}</div>
                                                <div className="text-sm text-gray-600">K{c.price}</div>
                                            </div>
                                            <div>
                                                <input type="number" min={1} value={c.qty} onChange={(e) => changeQty(c.id, Number(e.target.value))} className="w-16 px-2 py-1 border rounded" />
                                                <button onClick={() => removeFromCart(c.id)} className="block text-xs mt-2 text-red-500">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t">
                            <div className="flex justify-between mb-3">
                                <div className="text-sm text-gray-600">Subtotal</div>
                                <div className="font-semibold">K{total()}</div>
                            </div>
                            <button className="w-full py-3 rounded bg-orange-500 text-white font-bold">Checkout</button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* LOGIN MODAL (FAKE) */}
            <AnimatePresence>
                {showLogin && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h4 className="font-bold text-lg">Sign In</h4>
                            <p className="text-sm text-gray-600 mt-2">This demo uses a simple name-based sign-in (no backend).</p>
                            <div className="mt-4 flex flex-col gap-3">
                                <input id="name" placeholder="Your name" className="px-3 py-2 border rounded" />
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => setShowLogin(false)} className="px-3 py-2 border rounded">Cancel</button>
                                    <button onClick={() => fakeLogin((document.getElementById('name') as HTMLInputElement)?.value || 'Guest')} className="px-3 py-2 bg-orange-500 text-white rounded">Sign In</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
