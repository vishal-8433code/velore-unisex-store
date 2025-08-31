import { useState } from "react"

export default function ProductCardPage() {
  return (
    <main className="wrapper" role="main" aria-label="Product Card Demo">
      <section className="gallery" aria-label="Product list">
        {[1, 2, 3, 4].map((i) => (
          <ProductCard key={i} />
        ))}
      </section>

      <style jsx global>{`
        /* Define a minimal color system (4 colors) in CSS variables */
        :root {
          --pc-black: #0a0a0a;
          --pc-white: #ffffff;
          --pc-gray: #e5e7eb; /* neutral-200 */
          --pc-yellow: #facc15; /* amber-400 */
        }

        html,
        body {
          padding: 0;
          margin: 0;
          background: var(--pc-black);
          color: var(--pc-white);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell,
            Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
          line-height: 1.5;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx>{`
        .wrapper {
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 24px;
        }

        /* new grid to show 4 cards on large screens */
        .gallery {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }

        @media (min-width: 640px) {
          .gallery {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .gallery {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .card {
          width: 100%;
          /* make each card narrower so 4 fit side-by-side */
          max-width: 280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          border: 1px solid rgba(250, 204, 21, 0.2);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(250, 204, 21, 0.05) inset,
            0 10px 30px rgba(0, 0, 0, 0.6);
        }

        /* keep a single-column card layout at all sizes */
        @media (min-width: 940px) {
          .card {
            grid-template-columns: 1fr;
          }
        }

        .media {
          position: relative;
          background: #111;
          overflow: hidden;
        }

        .media img {
          display: block;
          width: 100%;
          /* ensure proper intrinsic aspect ratio in small cards */
          height: auto;
          object-fit: cover;
          transform: scale(1);
          transition: transform 360ms ease, filter 360ms ease;
          filter: saturate(0.95) contrast(1.05);
        }

        .media:hover img {
          transform: scale(1.04);
          filter: saturate(1) contrast(1.08);
        }

        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 10px;
          font-size: 12px;
          letter-spacing: 0.02em;
          background: rgba(250, 204, 21, 0.12);
          color: var(--pc-yellow);
          border: 1px solid rgba(250, 204, 21, 0.35);
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .content {
          display: grid;
          gap: 18px;
          padding: 20px;
        }

        @media (min-width: 480px) {
          .content {
            padding: 22px;
            gap: 18px;
          }
        }

        .brand {
          font-size: 12px;
          color: #cbd5e1;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .title {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--pc-white);
        }

        @media (min-width: 480px) {
          .title {
            font-size: 22px;
          }
        }

        .priceRow {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .price {
          font-weight: 700;
          font-size: 20px;
          color: var(--pc-yellow);
        }

        .compare {
          color: #9ca3af;
          text-decoration: line-through;
          font-size: 13px;
        }

        .desc {
          margin: 0;
          color: #d1d5db;
          font-size: 13px;
        }

        .sizesLabel {
          font-size: 11px;
          color: #cbd5e1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .sizes {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sizeBtn {
          appearance: none;
          border: 1px solid rgba(229, 231, 235, 0.25);
          color: var(--pc-white);
          background: rgba(255, 255, 255, 0.02);
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 13px;
          transition: border-color 200ms ease, background 200ms ease, transform 120ms ease, box-shadow 200ms ease;
          cursor: pointer;
        }

        .sizeBtn:hover {
          border-color: rgba(250, 204, 21, 0.6);
          background: rgba(250, 204, 21, 0.06);
        }

        .sizeBtn:active {
          transform: translateY(1px) scale(0.99);
        }

        .sizeBtn[aria-pressed="true"] {
          border-color: var(--pc-yellow);
          background: rgba(250, 204, 21, 0.1);
          box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.1);
        }

        .cta {
          display: grid;
          gap: 10px;
        }

        .addToCart {
          appearance: none;
          width: 100%;
          border: 1px solid rgba(250, 204, 21, 0.6);
          background: var(--pc-yellow);
          color: #1f2937;
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 700;
          letter-spacing: 0.01em;
          transition: transform 140ms ease, box-shadow 240ms ease, filter 200ms ease;
          cursor: pointer;
        }

        .addToCart:hover {
          transform: translateY(-1px);
          box-shadow:
            0 10px 24px rgba(250, 204, 21, 0.2),
            0 2px 0 rgba(0, 0, 0, 0.4) inset;
          filter: saturate(1.05);
        }

        .addToCart:active {
          transform: translateY(0);
          box-shadow: 0 6px 14px rgba(250, 204, 21, 0.16);
        }

        .stockRow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #a3a3a3;
          font-size: 12px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
        }
      `}</style>
    </main>
  )
}

function ProductCard() {
  const [selected, setSelected] = useState(null)

  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"]

  function handleAddToCart() {
    const message = selected ? `Added size ${selected} to cart.` : "Please select a size."
    alert(message)
  }

  return (
    <article className="card" aria-label="Sneaker Product">
      <div className="media">
        <img src="/premium-sneaker-on-dark-background.png" alt="Premium black-and-gold sneaker product photography" />
        <span className="badge" aria-hidden="true">
          New Release
        </span>
      </div>

      <div className="content">
        <div>
          <div className="brand">Apex Athletics</div>
          <h1 className="title text-balance">Apex Phantom Runner</h1>
        </div>

        <div className="priceRow" aria-label="Pricing">
          <div className="price">₹169</div>
          <div className="compare" aria-label="Compare at price">
            ₹199
          </div>
        </div>

        <p className="desc">
          Ultra-light performance runner with responsive cushioning and a breathable knit upper. Designed for speed,
          tuned for comfort.
        </p>

        <div>
          <div className="sizesLabel" id="sizes-label">
            Select Size
          </div>
          <div className="sizes" role="group" aria-labelledby="sizes-label">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className="sizeBtn"
                aria-pressed={selected === size}
                onClick={() => setSelected(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="cta">
          <button type="button" className="addToCart" aria-label="Add to Cart" onClick={handleAddToCart}>
            {selected ? `Add ${selected} to Cart` : "Add to Cart"}
          </button>
          <div className="stockRow" aria-live="polite">
            <span className="dot" aria-hidden="true" />
            {selected ? `Size ${selected} is in stock` : "Select a size to check availability"}
          </div>
        </div>
      </div>
    </article>
  )
}
