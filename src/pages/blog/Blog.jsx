const posts = [
  {
    title: "How to choose running shoes for daily training",
    date: "Sep 12, 2026",
    excerpt: "A quick guide to fit, cushioning, and support before you buy.",
  },
  {
    title: "Three ways to style white sneakers",
    date: "Aug 28, 2026",
    excerpt: "Simple outfits that keep classic sneakers looking sharp.",
  },
  {
    title: "When should you replace your shoes?",
    date: "Aug 10, 2026",
    excerpt: "Look for sole wear, reduced comfort, and uneven support.",
  },
];

export default function Blog() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2563EB]">
          Blog
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-[#111827]">
          Shoe care and style notes
        </h1>
        <p className="mt-3 leading-7 text-[#4B5563]">
          Practical reads for choosing, wearing, and looking after your shoes.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-lg border border-[#E5E7EB] bg-white p-6"
          >
            <p className="text-sm font-semibold text-[#2563EB]">{post.date}</p>
            <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-[#111827]">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              {post.excerpt}
            </p>
            <button
              type="button"
              className="mt-5 text-sm font-bold text-[#2563EB]"
            >
              Read more
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
